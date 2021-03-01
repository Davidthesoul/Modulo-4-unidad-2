//llamados de bibliotecas
"use strict"
const express = require('express');
const jwt = require('jsonwebtoken');
const unless = require('express-unless');
const bcrypt = require('bcrypt');
//const mysql = require("mysql");
//const util = require ("util");


const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(express.json());


const auth = (req, res, next) =>{
  try{
      //inicia reconocimiento
      let token = req.headers["authorization"]

      if(!token){
        throw new Error("No estas logueado");
      }
       token =token.replace("Bearer", "")
       jwt.verify(token, "Secret", (err,user) =>{
       if (err){
          throw new Error("Token inválido");}
        
        //finaliza recconocimiento
        
        });
        next();   
    }
    catch(e){
      console.error(e.message);
      res.status(413).send({message: e.message});
      }
}

//auth.unless=unless;
/*

  app.use(auth.unless({
    path: [
      {url: "/login", methods: ["POST"]},
      {url: "/registro", methods: ["POST"]}
          ]
  }));
*/
 // app.use(auth);



//pasos para crear el acceso a sesion
//Paso 1: Registro
app.post("/registro", async(req, res)=>
{
    try {
        //valido que me mande correctamente la información
       if (!req.body.usuario || !req.body.clave || !req.body.email  || !req.body.celu){
         throw new Error("No enviaste todos los datos necesarios");
        }
       //select * FROM usuario WHERE usuario = req.body.usuario;
        //Si el usuario existe mando error

        //si está todo bien, encripto la clave
       const ClaveEncriptada = await bcrypt.hash(req.body.clave, 10);

       //guadar el usuario con la clave 

       const usuario = {
          usuario: req.body.usuario,
          clave: ClaveEncriptada,
          email: req.body.email,
          celu: req.body.celu
        }

       res.send({message: "Se registro correctamente"});

      }
      catch(e){
        console.error(e.message);
        res.status(413).send({message: e.message});
        
      }

});

//Paso 2: Login
app.post("/login",(req, res)=>
{
    try {
        if (!req.body.usuario || !req.body.clave){
           throw new Error("No enviaste todos los datos necesarios");
        }
        //Paso 2-a Encuetro el usuario en la base de datos
        //select * FROM usuario WHERE usuario = req.body.usuario;
        //si no encuetro el usuario - error
        const claveEncriptada ="dasadad";
        //paso 2-b Verificar la clave

       // if(!bcrypt.compareSync(req.body.clave, ClaveEncriptada)){
       //     throw new Error("Fallo en login")
       // }
        //paso 2-c inicio sesion
        const tokenData = {
            nombre: "David",
            apellido: "Graterol",
            user_id: 1
        }
        const token = jwt.sign(tokenData, "Secret", {
            expiresIn: 60 * 60 * 24 //Expira en 24 horas
        })
        res.send({token});
       }    
      catch(e){
        console.error(e.message);
        res.status(413).send({message: e.message});
        
      }
});


app.get("/libros",(req, res)=>{
  try { 
   res.send({message: "Bienvenido!"});
  }
  catch(e){
   console.error(e.message);
   res.status(413).send({message: e.message});   
  }
});

//empleo el puerto 3000 para la comunicación con el server
app.listen(port, ()=> {
    console.log('Example app listening on port ', port);
    });


