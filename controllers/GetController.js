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

    async Perfil(req, res){
        try{
            var tokenn = req.headers.cookie.replace("werk.auth=", "")
            console.log(tokenn)
            token = {
                token: tokenn
            }
            var {data} = await axios.post("http://localhost:3000/perfil" ,token)
            console.log(data)
            res.render('../Perfil.handlebars', data)
        }
        catch{
            res.json({erros: "erro!"})
        }
    },

    async EditPerfil(req, res){
        try{
            var tokenn = req.headers.cookie.replace("werk.auth=", "")
            token = {
                token: tokenn
            }
            var {data} = await axios.post("http://localhost:3000/perfil" ,token)
            res.render('../Editar-perfil.handlebars', data)
        }
        catch{
            res.json({erros: "erro!"})
        }
    }
}