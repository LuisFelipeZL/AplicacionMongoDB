// Importa el modelo 'Property' desde el archivo '../models/property.model'.
const Property = require("../models/inmueble");
// Define una función middleware llamada 'checkFloor' para verificar la existencia de propiedades en un piso específico.
const checkFloor = async (req, res, next) => {
    // Obtiene el valor del número de piso desde los parámetros de la solicitud.
    const { num } = req.params;
    // Cuenta la cantidad de documentos (propiedades) en la base de datos que coinciden con el número de piso.
    const count = await Property.countDocuments(
        { floor: { $eq: num } }
    );
    // Si se encontraron propiedades en el piso, permite que la solicitud continúe.
    if (count > 0) {
        next();
    } else {
        // Si no se encontraron propiedades en el piso, responde con un mensaje de error 404.
        res.status(404).json({ Message: 'No hay propiedades disponibles en este piso' })
    }
};
// Define una función middleware llamada 'checkOwner' para verificar la existencia de propiedades con un propietario específico.
const checkOwner = async (req, res, next) => {
    // Obtiene el valor del nombre del propietario desde los parámetros de la solicitud.
    const { name } = req.params;
     // Cuenta la cantidad de documentos (propiedades) en la base de datos cuyo propietario coincide con el nombre proporcionado (insensible a mayúsculas/minúsculas).
    const count = await Property.countDocuments(
        { owner: { $regex: name, $options: 'i' } }
    );
    console.log(count);
    // Si se encontraron propiedades con el propietario especificado, permite que la solicitud continúe.
    if (count > 0) {
        next();
    } else {
        // Si no se encontraron propiedades con el propietario especificado, responde con un mensaje de error 404.
        res.status(404).json({ Message: 'No hay propiedades con ese nombre' })
    }
};
// Exporta las funciones middleware 'checkFloor' y 'checkOwner' para su uso en otros archivos.
module.exports = {
    checkFloor, checkOwner
}