
# Couchbase Capella Product Demo 🛒

A full-stack Node.js web application demonstrating a product listing and search interface powered by **Couchbase Capella** as the backend NoSQL database. Originally developed and hosted on **Glitch**, the project was later migrated to **Render** for more scalable deployment.

This app showcases dynamic product data fetching, querying using Couchbase's SQL-like **N1QL** language, and rendering product information with server-side templating via **Handlebars**.

## 🌐 Live Demo

🔗 [View Deployed App on Render](https://couchbase-capella-product-demo.onrender.com/)

---

## 🧰 Tech Stack & Tools Used

| Tool | Description |
|------|-------------|
| **Node.js** | JavaScript runtime used for writing backend APIs and server logic. |
| **Fastify** | Lightweight and performant Node.js web framework used to build the API layer. |
| **Handlebars (hbs)** | Server-side templating engine to render dynamic HTML views. |
| **Couchbase Capella** | Managed NoSQL cloud database. Used to store and query product data using **N1QL** (SQL for JSON). |
| **Render** | Cloud hosting platform used for deploying and serving the application. |
| **Glitch** (initially) | Previously used for prototyping and development in-browser before Render migration. _(Glitch hosting deprecated July 8, 2024)_ |
| **GitHub** | Used for version control and project collaboration. SSH setup enabled for seamless code pushing. |

---

## 📂 Project Structure

```bash
.
├── public/                 # Static assets (CSS, JS, images)
├── src/
│   ├── pages/              # Handlebars (.hbs) templates
│   ├── colors.json         # Sample color metadata (legacy demo content)
│   └── seo.json            # SEO configuration for the website
├── server.js               # Main backend server (Fastify app with routes)
├── package.json            # Dependencies and project metadata
├── README.md               # You’re reading it!
```

---

## 🔑 Features Implemented

- Product catalog and dynamic rendering using server-side templates
- Integration with Couchbase Capella to fetch and filter product data
- Querying via N1QL (SQL for JSON) for real-time product filtering
- Responsive deployment on Render with managed environment variables

---

## 📌 Setup & Deployment Instructions

### 🚀 Local Setup

1. Clone the repository  
   `git clone git@github.com:aniket-shaha/couchbase-capella-product-demo.git`

2. Navigate to the project  
   `cd couchbase-capella-product-demo`

3. Install dependencies  
   `npm install`

4. Add a `.env` file with Couchbase credentials:
   ```
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   DB_ENDPOINT=your-endpoint
   DB_BUCKET=your-bucket
   ```

5. Start the app locally  
   `node server.js`

### 🌍 Deploy to Render

- Connect the repo on [dashboard.render.com](https://dashboard.render.com/)
- Configure environment variables in Render dashboard
- Deploy and enjoy the hosted version

---

## 🧠 What I Learned

- Building full-stack apps using Node.js and Fastify
- Working with Couchbase Capella and querying JSON using N1QL
- Deploying scalable apps via Render and managing secure environment variables
- Migrating from Glitch to Render due to hosting deprecation

---

## 📎 References

- [Couchbase Capella Docs](https://docs.couchbase.com/cloud/)
- [Fastify Framework](https://www.fastify.io/)
- [Render Deployment Guide](https://render.com/docs/deploy-node-express-app)
- [Handlebars.js](https://handlebarsjs.com/)

---

## 👋 About

This project was created by **Aniket Shaha** as part of a learning initiative to explore modern NoSQL cloud databases and hands-on cloud deployments.
