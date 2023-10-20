// Importa la biblioteca 'express' y crea un enrutador.
const router = require('express').Router();
// Importa el modelo 'Property' desde el archivo '../../models/property.model'.
const Property = require("../../models/inmueble");

// Importa funciones middleware 'checkFloor' y 'checkOwner' desde el archivo '../../helpers/middlewares'.
const { checkFloor, checkOwner } = require("../../helpers/middlewares")
// Definición de ruta GET para obtener todas las propiedades.
router.get('/', async (req, res) => {
    try {
        // Busca todas las propiedades en la base de datos.
        const properties = await Property.find();
        if (properties.length === 0)
            res.json({ Message: 'No se encuentra ninguna propiedad', properties })
        // Si no hay propiedades, responde con un mensaje y un objeto vacío.
        else
        // Responde con todas las propiedades encontradas.
            res.json(properties);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message, Message: 'No se encuentran propiedades disponibles' });
    }
});
// Definición de ruta GET para obtener una propiedad por su ID.
router.get('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    try {
        // Busca una propiedad por su ID en la base de datos.
        const property = await Property.findById(propertyId);
        // Responde con la propiedad encontrada.
        res.json(property);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message, Message: 'No existe la propiedad' });
    }
});
// Definición de ruta POST para crear una nueva propiedad.
router.post("/", async (req, res) => {
    try {
        const properties = await Property.create(req.body);
        // Responde con la propiedad encontrada.
        res.json(properties);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message });
    }
});
// Definición de ruta PUT para actualizar una propiedad por su ID.
router.put('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    try {
        // Actualiza una propiedad por su ID en la base de datos con los datos en el cuerpo de la solicitud.
        const property = await Property.findByIdAndUpdate(propertyId, req.body, { new: true });
        // Responde con la propiedad actualizada.
        res.json(property);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message, Message: 'No existe la propiedad' });
    }
});
// Definición de ruta DELETE para eliminar una propiedad por su ID.
router.delete('/:propertyId', async (req, res) => {
    const { propertyId } = req.params;
    try {
        // Elimina una propiedad por su ID en la base de datos.
        const property = await Property.findByIdAndDelete(propertyId);
        const properties = await Property.find();
        if (properties.length === 0)
        // Si no hay propiedades, responde con un mensaje y un objeto vacío.
            res.json({ Message: 'No existe la propiedad', properties })
        else
        // Responde con todas las propiedades restantes.
            res.json(properties);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message, Message: 'No existe la propiedad' });
    }
});
// Definición de ruta DELETE para eliminar todas las propiedades en un piso específico.
router.delete('/all/floor=:num', checkFloor, async (req, res) => {
    const { num } = req.params;
    try {
        // Elimina todas las propiedades en el piso especificado en la base de datos.
        const result = await Property.deleteMany({ floor: { $eq: num } });
        const properties = await Property.find();
         // Responde con todas las propiedades restantes.
        res.json(properties);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message });
    }
});
// Definición de ruta GET para buscar propiedades por el nombre del dueño.
router.get('/owner/:name', checkOwner, async (req, res) => {
    const { name } = req.params;
    try {
         // Realiza una consulta para buscar propiedades cuyo dueño coincida con el nombre proporcionado (insensible a mayúsculas/minúsculas).
        const result = await Property.aggregate([
            { $match: { owner: { $regex: name, $options: 'i' } } },
            { $sort: { size: -1 } },
            { $project: { _id: 0, letter: 0, __v: 0 } }
        ]);
         // Responde con el resultado de la consulta.
        res.json(result);
    } catch (error) {
        // En caso de error, responde con un mensaje de error.
        res.json({ Error: error.message });
    }
});
// Exporta el enrutador para que pueda ser utilizado en otros archivos.
module.exports = router;