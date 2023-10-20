// Importa la biblioteca 'express' para crear un enrutador de Express.
let express = require('express');
// Crea un enrutador de Express.
let router = express.Router();

// Define una ruta GET que coincide con la raíz ('/') de la aplicación.
router.get('/', function(req, res, next) {
   // Renderiza la vista 'index' y pasa un objeto con el título 'Express' como dato.
  res.render('index', { title: 'Express' });
});
// Exporta el enrutador para que pueda ser utilizado en otros archivos.
module.exports = router;
