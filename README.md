TimeSpender Application
============================

<img src="https://img.shields.io/badge/Made%20by-Achraf%20Khabar-blue" alt="made by Achraf khabar"> <img src="https://img.shields.io/badge/Made%20by-Kaouthar%20bouslim-blue" alt="made by Kawtar Bouslim"> <img src="https://img.shields.io/badge/Made%20by-Nahid%20Chaoui-blue" alt="made by Nahid Chaoui"> <img src="https://img.shields.io/badge/Made%20by-Abir%20el%20bouzayani-blue" alt="made by Abir el bouzayani"> 
<img src="https://img.shields.io/badge/Made%20by-Khouloud%20Cherrat-blue" alt="made by Khouloud Cherrat"> 
<img src="https://img.shields.io/badge/Framed%20by-Mr.%20Hassan%20Badir-white" alt="Framed by Mr. Hassan Badir">

<p align="center">
  <a href="https://expressjs.com"> <img src="https://cdn.worldvectorlogo.com/logos/express-1.svg" alt="Express.js" height="70"></a>
  <a href="https://reactjs.org"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React.js" height="70"></a>
  <a href="https://www.Mongodb.com"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png" alt="MongoDb" height="70"></a>
 </p>

Introduction
------------

Smart Spender is a web application designed to help users manage and organize their money in order to avoid financial issues. In addition to its budget tracking features, Smart Spender also includes a blog to provide financial management tips and tricks.

Smart Spender is built using Node.js, React.js, Express.js, Monggose, and Mongodb Atlas. These technologies provide a robust and scalable foundation for the app, allowing for efficient data processing and storage. The app is designed to be user-friendly, with a clean and intuitive interface that makes it easy for users to track their spending and achieve their financial goals.

Caractéristiques
--------

-   User registration and login: Users can create accounts and securely log in to access the app's features.
-   Budget tracking: Users can track their income and expenses, set budgets, and receive alerts when they exceed their budget.
-   Expense categorization: Users can categorize their expenses to get a clear picture of their spending habits.
-   Goal setting: Users can set financial goals, such as saving for a vacation or paying off debt, and track their progress towards those goals.
-   Spending analysis: Provides users with detailed insights and analysis of their spending habits, including charts and graphs that make it easy to understand their financial situation.
-   Financial management blog: Users can read articles on a variety of topics related to personal finance and money management, including budgeting tips, saving strategies, debt reduction techniques, investing advice, retirement planning, credit score improvement, frugal living ideas, and mindset shifts for better financial health.


Exigences
------------

- Node.js
- React.js
- Express.js
- Mongo DB Atlas
- Mongoose

Installation
------------

1.  Clonez le référentiel sur votre machine locale.
2.  Naviguez vers le répertoire `server` en utilisant votre terminal/interface de commande.
3.  Installez les dépendances requises en exécutant `npm install`.
4.  Démarrez le serveur Node.js en exécutant `npm start`.
5.  Naviguez jusqu'au répertoire `client` en utilisant votre terminal/interface de commande.
6.  Installez les dépendances requises en exécutant `npm install`.
7.  Démarrez le serveur de développement React en exécutant `npm start`.

Usage
-----

1.  Démarrez le serveur Node.js en exécutant `npm start` dans le répertoire `server`, le fichier `index.js` : 
  ```js 
    import express from "express";
    import dotenv from "dotenv";
    import cookieParser from "cookie-parser";
    import cors from "cors";
    import db from "./config/Database.js";
    import router from "./routes/index.js";
    import * as bodyParser from "express";
    dotenv.config();
    const app = express();

    app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.json());
    app.use(router);

    app.listen(5000, ()=> console.log('Server running at port 5000'));
  ``` 
2.  Changer les prametres de la base de donnée pour les migration : 
    * `cd server/config/Database.js`
    * Database.js :
    
      ```js 
        import mongoose from 'mongoose';

        mongoose.connect('mongodb+srv://ashraf:1453@cluster0.ujzqpy7.mongodb.net/?retryWrites=true&w=majority', {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
          console.log('Connected to MongoDB!');
        });

        export default db;
      ```
3.  Démarrez le serveur de développement React en exécutant `npm start` dans le répertoire `client`.
4.  Ouvrez votre navigateur et naviguez sur [http://localhost:3000](http://localhost:3000/)
5.  Les entreprises peuvent créer un compte et ajouter des offres de stage, et les étudiants peuvent postuler à des postes.

Contribution
------------

Feel free to fork this repository and make contributions.

License
-------

This project is licensed under the MIT License.
