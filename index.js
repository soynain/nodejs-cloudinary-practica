const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path')
require(path.resolve('models/database')) //importas la base mongo y la inicializas en automatico
const port = process.env.PORT || 3000;
//configuraciones
app.set('appName', 'galeriaMulter');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/templates')) //para que en los templates, solo pongas su carpeta sin poner public al inicio
//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); //para los htmls

//rutas
app.use('/home', require('./rutas/rutasimgget')); //para el index, subir la imagen
app.use('/img', require('./rutas/rutasimgpost').router); //los post

//servidor
app.listen(port, () => {
    console.log(`la aplicacion ${app.get('appName')} está corriendo y la raiz es: ${__dirname}`);
});


