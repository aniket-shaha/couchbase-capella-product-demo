const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  logger: false,
});

// --- Couchbase and CORS Setup ---
const couchbase = require("couchbase");
fastify.register(require("@fastify/cors"));

const clusterConnStr = "couchbases://cb.w12npjniiyudd-sg.cloud.couchbase.com"; 
const username = "appuser"; 
const password = "StrongPassword123!"; 
const bucketName = "catalog";

let cluster, bucket;
(async () => {
  try {
    cluster = await couchbase.connect(clusterConnStr, {
      username,
      password,
      configProfile: "wanDevelopment"
    });
    bucket = cluster.bucket(bucketName);
    console.log("✅ Connected to Couchbase Capella");
  } catch (err) {
    console.error("❌ Couchbase connection failed:", err);
  }
})();

// --- Static, Forms, and Views ---
fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/",
});
fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// SEO setup
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// --- Routes ---

// Homepage
fastify.get("/", function (request, reply) {
  let params = { seo: seo };

  if (request.query.randomize) {
    const colors = require("./src/colors.json");
    const allColors = Object.keys(colors);
    let currentColor = allColors[(allColors.length * Math.random()) << 0];
    params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo,
    };
  }

  return reply.view("/src/pages/index.hbs", params);
});

// Form submission
fastify.post("/", function (request, reply) {
  let params = { seo: seo };
  let color = request.body.color;

  if (color) {
    const colors = require("./src/colors.json");
    color = color.toLowerCase().replace(/\s/g, "");

    if (colors[color]) {
      params = {
        color: colors[color],
        colorError: null,
        seo: seo,
      };
    } else {
      params = {
        colorError: request.body.color,
        seo: seo,
      };
    }
  }

  return reply.view("/src/pages/index.hbs", params);
});

// Couchbase product search API
fastify.get("/search", async (request, reply) => {
  const search = request.query.q?.toLowerCase() || "";
  const query = `
    SELECT p.*
    FROM \`${bucketName}\`.inventory.products p
    WHERE LOWER(p.name) LIKE $search
    LIMIT 10;
  `;
  try {
    const result = await cluster.query(query, {
      parameters: { search: `%${search}%` },
    });
    reply.send(result.rows);
  } catch (err) {
    console.error(err);
    reply.status(500).send({ error: err.message });
  }
});

// Couchbase top 5 products API
fastify.get("/top-products", async (request, reply) => {
  try {
    const result = await cluster.query(`
      SELECT name, category, price, rating, stock, image_url 
      FROM \`catalog\`.\`inventory\`.\`products\` 
      ORDER BY rating DESC 
      LIMIT 5
    `);

    const products = result.rows;
    return reply.send(products);
  } catch (err) {
    console.error("Error fetching top products:", err);
    reply.status(500).send({ error: "Failed to fetch top products" });
  }
});


// Start server
fastify.listen({ port: process.env.PORT, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Your app is listening on ${address}`);
});
