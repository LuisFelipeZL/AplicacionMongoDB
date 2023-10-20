// Importa la biblioteca 'http-errors' para crear errores HTTP.
let createError = require('http-errors');
// Importa la biblioteca 'express' para crear una aplicación Express.
let express = require('express');
// Importa la biblioteca 'path' para manejar rutas de archivos y directorios.
let path = require('path');
// Importa la biblioteca 'cookie-parser' para manejar cookies en las solicitudes.
let cookieParser = require('cookie-parser');
// Importa la biblioteca 'morgan' para la generación de registros (logs) de la aplicación.
let logger = require('morgan');

// Importa el enrutador definido en './routes/index.js'.
let indexRouter = require('./routes/index');

// Importa el enrutador definido en './routes/api.js'.
const apiRouter = require('./routes/api');

// Crea una instancia de la aplicación Express.
let app = express();

// Configura las vistas y el motor de plantillas 'pug'.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Agrega middleware para registrar solicitudes en formato 'dev'.
app.use(logger('dev'));
// Habilita el análisis de solicitudes JSON.
app.use(express.json());
// Habilita el análisis de solicitudes codificadas en URL con opciones extendidas desactivadas.
app.use(express.urlencoded({ extended: false }));
// Habilita el uso de 'cookie-parser' para manejar cookies en las solicitudes.
app.use(cookieParser());
// Sirve archivos estáticos desde el directorio 'public'.
app.use(express.static(path.join(__dirname, 'public')));

// Define las rutas para el enrutador principal ('indexRouter') en la raíz del sitio.
app.use('/', indexRouter);
// Define las rutas para el enrutador de la API en '/api'.
app.use('/api', apiRouter);


// Middleware para manejar solicitudes no encontradas (genera un error 404).
app.use(function (req, res, next) {
  next(createError(404));
});

// Middleware para manejar errores en la aplicación.
app.use(function (err, req, res, next) {
  // Configura variables locales para mensajes de error y detalles en la vista.
  res.locals.message = err.message;
  res.locals.message = err.message;
  // Establece el estado de respuesta en el estado del error o 500 por defecto.
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza la vista de error.
  res.status(err.status || 500);
  res.render('error');
});
// Exporta la aplicación Express configurada para ser utilizada en otros archivos.
module.exports = app;
