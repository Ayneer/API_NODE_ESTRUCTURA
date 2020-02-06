const repositorio = require('../../repositories/usuario');

const handler = async (req, res, next) => {
    
    const { ERROR_INTERNO, EXITO_OPERACION, PAGINA_NO_ENCONTRADA, FALLA_OPERACION } = process.env;

    try {
        const { nombres, apellidos, edad, telefono, identificacion, id_identificacion, correo } = req.body;
        const usuario = { nombres, apellidos, edad, telefono, identificacion, id_identificacion, correo };
        const respuesta = await repositorio.crearUsuario(usuario);
        let status = null;
        
        switch (respuesta.status) {

            case ERROR_INTERNO:
                status = 500;
                break;

            case EXITO_OPERACION:
                status = 400;
                break;

            case PAGINA_NO_ENCONTRADA:
                status = 404;
                break;

            case FALLA_OPERACION:
                status = 402;
                break;

            default:
                500;
        }
        res.status(status).send(respuesta);

    } catch (error) {
        next(error);
    }

};

module.exports = handler;