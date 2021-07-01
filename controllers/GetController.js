var axios = require("axios")

module.exports = {
    async login(req,res){
        res.render("../Login.html")
    },
    async cadastro(req,res){
        res.render("../Cadastro.html")
    },
    async recuperarSenha(req,res){
        res.render("../Recuperar-senha.html")
    },
    async reset(req,res){
        try{
            var {data} = await axios.get("http://localhost:3000/reset?token="+req.query.token)
            console.log(data)
            if(data.auth)
                res.render("../Redefinir-senha.html")
            else
                res.redirect("/login")
        }
        catch (error){
            res.sendStatus(500);
            console.log('error',error);
            res.render('../Login.html')
        }
        finally{
            //console.log('Email enviado!')
        }
    }
}