# Basic E-Commerce Site

This repository is a basic e-commerce'ish site made with [node.js](https://nodejs.dev/) , [express](http://expressjs.com/) , [mongodb](https://www.mongodb.com/) , [mongoose](https://mongoosejs.com/) , [ejs](https://ejs.co/) and some other libraries _**(check package.json for full list)**_. It follows the MVC controller pattren to serve template based pages to the front-end. This is an ongoing project where am I'm adding features continuously. As a beginner, this could be a practice boilerplate for anyone who's trying to get their hands dirty in making a full-fledged eCommerce platform!

## Features

- 05.08.2020
  - Separate Admin Dashboard
  - Admin can view/add/update/delete any Product/User
  - User specific Cart
  - User sessions are stored using express-session and Cookie

## To Install Locally :

- Create an `.env` file at the root folder and store MongoDB credentials. Database connection is initiated from `app.js` so necessary edit can be done there. If MongoDB Atlas is used, storing `DB_URI` in `.env` with the connection string would suffice i.e.

```bash
DB_URI=mongodb+srv://<username>:<password>@<clustername>/<dbname>
```

- Import the provided `admin.json` as a collection into your database as an Initial master access is required for admin.

- Run the following commands in the project directory.

```bash
npm install nodemon -g
npm install
npm start
```
