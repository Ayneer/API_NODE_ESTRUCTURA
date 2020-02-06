const app = require('./app');
const path = require('path');
const mongo = require('./helpers/Mongo');

//Se define el .env que se usará cuando este en prodección
require('dotenv').config({ path: `${path.dirname(__dirname)}/.env` });
const {NODE_ENV = 'desarrollo', PORT = 3600} = process.env;

//Realizar conexión con la base de datos
if(!mongo.estaConectado()){
    mongo.conectar();
}

app.listen(PORT, () => {
    console.log(`Escuchando en localhost:${PORT}/ y corriendo en entorno de ${NODE_ENV}`);
});