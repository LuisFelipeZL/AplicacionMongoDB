// Importa la biblioteca 'express' para crear un enrutador de Express.
let express = require('express');
// Crea un enrutador de Express.
let router = express.Router();

// Usa el enrutador '/properties' y requiere las rutas definidas en './api/properties'.
router.use('/inmuebles', require('./api/properties'));
// Exporta el enrutador para que pueda ser utilizado en otros archivos.
module.exports = router;