const path = require('path')
const config = require(__dirname + '/config')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(cookieParser())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

require('./routes')(app);

app.listen(config.port, () => {
  console.log(`Servidor rodando em http://localhost:${config.port}`);
});