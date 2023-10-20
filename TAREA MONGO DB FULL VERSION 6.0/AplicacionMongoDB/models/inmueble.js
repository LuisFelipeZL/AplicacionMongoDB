// Importa la biblioteca mongoose para trabajar con MongoDB.
const mongoose = require('mongoose');
// Obtiene la clase Schema de mongoose.
const Schema = mongoose.Schema;
// Crea un nuevo esquema llamado propertySchema.
const propertySchema = new Schema({
   // Define un campo "floor" como un número, con restricciones de valor mínimo, máximo y requerido.
    floor: {
        type: Number,
        min: [0, 'Esta propiedad no puede ser negativa'],
        max: [30, 'No se puede superar el valor de 30'],
        required: [true, 'de debe ingresar en la propiedad']
    },
// Define un campo "letter" como una cadena de texto, con restricciones de longitud y requerido opcionalmente.
    letter:
    {
        type: String,
        maxlength: [1, 'debe ser solamente una letra'],
        required: false
    },
  // Define un campo "size" como un número, con restricciones de valor mínimo y requerido. 
    size: {
        type: Number,
        min: [30, 'el minimo es 30'],
        required: [true, 'se debe ingresar el tamaño correcto']
    },
   // Define un campo "num_rooms" como un número, con restricciones de valor mínimo y requerido.
    num_rooms: {
        type: Number,
        min: [1, 'no puede ser inferior a 1'],
        required: [true, 'se debe introducir el numero correcto de la propiedad']
    },
    
    // Define un campo "rented" como un valor booleano y lo requiere.
    rented: {
        type: Boolean,
        required: [true, 'debe indicar si la propiedad esta rentada']
    },
   // Define un campo "owner" como una cadena de texto, con restricciones de longitud y requerido.
    owner: {
        type: String,
        minlength: [3, 'el nombre debe tener al menos tres letras'],
        maxlength: [30, 'el nombre debe tener un maximo de 30 letras'],
        required: [true, 'debe insertar el nombre del dueño']
    },
    // Define un campo "contact_email" como una cadena de texto que debe cumplir con un patrón de dirección de correo electrónico y es requerido.
    contact_email:
    {
        type: String,
        match: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
        required: [true, 'Debe insertar el nombre del dueño']
    }
});
// Exporta el modelo mongoose llamado 'property' basado en el esquema propertySchema, con una colección de MongoDB llamada 'properties'.
module.exports = mongoose.model('property', propertySchema, 'inmuebles');