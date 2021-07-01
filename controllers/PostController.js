var axios = require("axios")

module.exports = {
    async login(req,res){
        try{
            var {data} = await axios.post("http://localhost:3000/login", req.body)
            if(data.auth){
                console.log("if")
                res.cookie("werk.auth", data.token, { maxAge: 900000 })
                res.json(data)
            }
            else{
                res.json(data)
            }
        }
        catch (error){
            res.sendStatus(500);
            return console.log('error',error);
        }
        finally{
            console.log('Login Posted')
        }
    },
    
    async cadastro(req,res){
        try{
            var {data} = await axios.post("http://localhost:3000/registrar", req.body)
            console.log(data)
            res.json(data)    
        }
        catch (error){
            res.sendStatus(500);
            return console.log('error',error);
        }
        finally{
            console.log('Cadastro Posted')
        }
    },

    async recuperarSenha(req,res){
        try{
            var {data} = await axios.post("http://localhost:3000/recuperarSenha", req.body)
            console.log(data)
            res.json(data)    
        }
        catch (error){
            res.sendStatus(500);
            return console.log('error',error);
        }
        finally{
            console.log('Email enviado!')
        }
    },

    async novaSenha(req,res){{
        try{
            console.log("http://localhost:3000/novasenha?token="+req.query.token)
            var {data} = await axios.post("http://localhost:3000/novasenha?token="+req.query.token, req.body)
            console.log(data)
            res.json(data)    
        }
        catch (error){
            res.sendStatus(500);
            return console.log('error',error);
        }
        finally{
            console.log('Senha redefinida!')
        }
    }}
}