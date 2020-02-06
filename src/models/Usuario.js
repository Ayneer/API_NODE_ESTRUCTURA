const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuarioSchema = new schema({
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    edad: {type: Number, required: true},
    telefono: {type: Number, required: true},
    identificacion: {type: Number, required: true},
    id_identificacion: {type: String, required: true},
    correo: {type: String, required: true}
}, {
    timestamps: true //Guarda la fecha de cración o modificación de la Schema.
});

const usuarios = mongoose.model('usuarios', usuarioSchema);

usuarios.watch().on('change', data => {
    console.log(`¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡ Cambio en la base de datos !!!!!!!!!!!!!!`)
    console.log(`Nombre de la base de datos: ${data.ns.db}`)
    console.log(`Nombre de la coleccion: ${data.ns.coll}`)
    console.log(data.fullDocument)
});

module.exports = usuarios;