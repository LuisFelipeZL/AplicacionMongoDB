const mongoose = require('mongoose');

//Se conecta a la base de datos Mongodb
mongoose.connect(process.env.MONGO_URL);