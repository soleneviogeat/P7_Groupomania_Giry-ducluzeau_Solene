const express = require('express');
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const comRoutes = require("./routes/com");
const path = require('path');
const helmet = require('helmet');


//Lien de connexion vers la base de données MongoDB via Mongoose
const mongoose = require('mongoose');
const Role = require("./models/role");

mongoose.connect('mongodb+srv://Swizz26:Groupomania@cluster0.oec48gp.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à MongoDB réussie !'); 
    initial();
  })
  .catch(() => console.log('Connexion à MongoDB échouée !'));

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}



//Paramétrage du framework Express
const app = express();

app.use(express.json());
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});


//Lien pour former les routes "utilisateurs", "post" et "com"
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/coms", comRoutes);
app.use('/uploads', express.static('uploads'));


//Gestion des images en statique via le Path d'Express
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;