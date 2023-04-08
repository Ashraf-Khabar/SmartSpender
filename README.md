TimeSpender Application
============================

<img src="https://img.shields.io/badge/Made%20by-Achraf%20Khabar-blue" alt="made by Achraf khabar"> <img src="https://img.shields.io/badge/Made%20by-Kaouthar%20bouslim-blue" alt="made by Kawtar Bouslim"> <img src="https://img.shields.io/badge/Made%20by-Nahid%20Chaoui-blue" alt="made by Nahid Chaoui"> <img src="https://img.shields.io/badge/Made%20by-Abir%20el%20bouzayani-blue" alt="made by Abir el bouzayani"> 
<img src="https://img.shields.io/badge/Made%20by-Khouloud%20Cherrat-blue" alt="made by Khouloud Cherrat"> 
<img src="https://img.shields.io/badge/Framed%20by-Mr.%20Hassan%20Badir-white" alt="Framed by Mr. Hassan Badir">

<p align="center">
  <a href="https://nodejs.org/en/"> <img src="https://cdn.freebiesupply.com/logos/thumbs/2x/nodejs-1-logo.png" alt="Node.js" height="70"></a>
  <a href="https://expressjs.com"> <img src="https://cdn.worldvectorlogo.com/logos/express-1.svg" alt="Express.js" height="70"></a>
  <a href="https://reactjs.org"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React.js" height="70"></a>
  <a href="https://www.Mongodb.com"> <img src="https://www.strongdm.com/hubfs/21126185/Technology%20Images/603c5eb831820c3ce6a8f057_603a1586fa052d17fc2a6929_MongoDBAtlas.png" alt="MongoDb" height="70"></a>
  <a href="https://https://mongoosejs.com"><img src="https://tsed.io/mongoose.png" alt="Mongoose ORM" height="70"></a> 
 </p>

Introduction
------------

Cette application web met en relation les étudiants de l'ENSAT (Ecole Nationale des Sciences Appliquées à Tanger) avec des entreprises pour des stages. Les entreprises peuvent créer un compte et ajouter des offres de stage, permettant aux étudiants de l'ENSAT de postuler pour les postes. L'application est construite en utilisant Node.js, React.js, Express.js, Sequelize, et MySQL.

Caractéristiques
--------

- Met en relation les étudiants de l'ENSAT avec des entreprises pour des stages.
- Les entreprises peuvent créer des comptes et ajouter des offres de stage
- Construit avec Node.js, React.js, Express.js, Sequelize et MySQL.


Exigences
------------

- Node.js
- React.js
- Express.js
- Sequelize
- MySQL

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
        import { Sequelize } from "sequelize";

        const db = new Sequelize('crud_project', 'root', '', {
            host: "localhost",
            dialect: "mysql"
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
