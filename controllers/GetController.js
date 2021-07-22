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
    },
    async chat(req,res){
        try{
            var tokenn = req.headers.cookie.replace("werk.auth=", "")
            console.log(tokenn)
            token = {
                token: tokenn
            }
            var {data} = await axios.post("http://localhost:3000/chat", token)
            console.log(data)
            res.render('../chat.handlebars', data)
        }
        catch (error){
            console.log('error',error);
            res.json("ball")
        }
        finally{
            //console.log('Email enviado!')
        }
    }
}