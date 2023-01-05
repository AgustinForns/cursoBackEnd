import express from "express";

const authRouter = express.Router();

authRouter.get("/login",(req,res)=>{
    if(req.session.username){ //si ya esta logueado redirige al home
        return res.redirect("/home");
    } else {
         res.render("login")
    }
   
});

authRouter.post("/login",(req,res)=>{
    
    const {name} = req.body;
    //el req.session se crea cuando intengro la session en un midleware en el server app.use(session)
    req.session.username = name; //dentro del req.session creamos la propiedada username y le asignamos el nombre intorducido por el cliente
    // console.log(req.session)
    res.redirect("/home")
});

authRouter.get("/logout",(req,res)=>{
    //antes de eliminar la session obtenemos el valor del nombre del susuario
    const name = req.session.username;
    req.session.destroy(err=>{
        if(err) return res.redirect("/home");
        res.render("logout",{name:name})
    })
});

export {authRouter};