const usuario_modelo = require('../../models/Usuario');

let respuesta = {
    error: null,
    data: null,
    codigoError: null,
    status: null,
    mensajeError: null,
    tipoError: null
};

const crearUsuario = async usuario_objeto => {

    const { ERROR_INTERNO, EXITO_OPERACION, FALLA_OPERACION, VALIDACION_REGISTRO_ERROR } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {

        const { identificacion, correo } = usuario_objeto;
        const buscarUsuario = await existeUsuario(identificacion, correo);

        //Si no existe un usuario con la identificación y el correo enviado, se procede a su almacenamiento
        if (!buscarUsuario.data) {

            let usuario = new usuario_modelo(usuario_objeto);
            const resultado = await usuario.save();

            respuesta.error = false;
            respuesta.data = resultado;
            respuesta.status = EXITO_OPERACION;

        } else {
            respuesta.error = true;
            respuesta.codigoError = "ValidacionUsuario";
            respuesta.status = FALLA_OPERACION;
            respuesta.mensajeError = "Ya existe un usuario con la identificación y/o correo enviado";
            respuesta.tipoError = VALIDACION_REGISTRO_ERROR;
        }

    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.name;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;
}

const existeUsuario = async (identificacion, correo) => {

    const { ERROR_INTERNO, EXITO_OPERACION } = process.env;

    respuesta = {
        error: null,
        data: null,
        codigoError: null,
        status: null,
        mensajeError: null,
        tipoError: null
    }

    try {
        const resultado = await usuario_modelo.findOne({ $or: [{ identificacion }, { correo }] });
        respuesta.error = false;
        respuesta.data = resultado;
        respuesta.status = EXITO_OPERACION;
    } catch (error) {
        respuesta.error = true;
        respuesta.codigoError = error.name;
        respuesta.status = ERROR_INTERNO;
        respuesta.mensajeError = error.message;
        respuesta.tipoError = error._message;
    }

    return respuesta;

}

module.exports = {
    crearUsuario,
    existeUsuario
}