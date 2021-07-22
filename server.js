var express = require('express');
const handlebars = require('express-handlebars');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var axios = require("axios")

const GetController = require('./controllers/GetController')
const PostController = require('./controllers/PostController')

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('html', require('ejs').renderFile);

app.get('/login',GetController.login)
app.post('/login',PostController.login)

app.get('/cadastro',GetController.cadastro)
app.post('/cadastro',PostController.cadastro)

app.get('/recuperarsenha',GetController.recuperarSenha)
app.post('/recuperarsenha',PostController.recuperarSenha)

app.get('/reset', GetController.reset)
app.post('/reset', PostController.novaSenha)

//------------------------------
app.engine('handlebars', handlebars({
  defaultLayout: '../../main',
}))
app.get('/chat', GetController.chat)

app.get('/messages/:id', async(req, res) => {
  var {data} = await axios.get("http://localhost:3000/chat/"+req.params.id)
  res.send(data)
})

app.get('/chat/:id', (req, res) => {
  res.render('../index3.html')
})

app.post('/messages', async (req, res) => {
  try{
    var {data} = await axios.post("http://localhost:3000/chat/"+req.params.id, req.body)

    io.emit('message', req.body);
    res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }

})

io.on('connection', () =>{
  console.log('a user is connected')
})

var server = http.listen(3002, () => {
  console.log('server is running on port', server.address().port);
});