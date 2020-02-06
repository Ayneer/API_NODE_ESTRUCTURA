const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const obtenerCredenciales = () => {
    const {
        MONGO_HOST,
        MONGO_PORT,
        MONGO_DATABASE,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_REPLICASET,
        MONGO_SSL,
        MONGO_AUTH_SOURCE
    } = process.env;

    let replicas = MONGO_HOST.split(',')
        .map(url => `${url}:${MONGO_PORT}`)
        .join(',');

    const MONGO_URL = `mongodb://${replicas}/${MONGO_DATABASE}`;

    return {
        MONGO_URL,
        MONGO_USER,
        MONGO_PASSWORD,
        MONGO_REPLICASET,
        MONGO_SSL,
        MONGO_AUTH_SOURCE
    };
}

const conectar = async () => {
    const credenciales = obtenerCredenciales();
    console.log(`Intentando conectar hacia ${credenciales.MONGO_URL}`);
    try {
        await mongoose.connect(credenciales.MONGO_URL, {
            user: credenciales.MONGO_USER,
            pass: credenciales.MONGO_PASSWORD,
            replicaSet: credenciales.MONGO_REPLICASET,
            ssl: credenciales.MONGO_SSL == '1' ? true : false,
            authSource: credenciales.MONGO_AUTH_SOURCE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`Conectado con éxito hacia ${credenciales.MONGO_URL}`);

        const connection = mongoose.connection;
        /* istanbul ignore next */
        connection.on('connecting', () => console.info('Conectando a mongodb'));
        /* istanbul ignore next */
        connection.on('disconnecting', () => console.info('Desconectando de mongodb'));
        /* istanbul ignore next */
        connection.on('disconnected', () => console.info('Desconectado de mongodb'));
        /* istanbul ignore next */
        connection.on('close', () => console.info('Conección a Mongodb cerrada'));
        /* istanbul ignore next */
        connection.on('error', err => console.info('Error al conectar a mongodb', err.message));
        /* istanbul ignore next */
        connection.on('reconnected', () => console.info('recinexión a Mongodb con éxito!'));

        return true;
    } catch (error) {
        console.info('Error al conectar con Mongodb', error);
        return false;
    }
}

const estaConectado = () => {
    return mongoose.connection.readyState === 1 ? true : false;
};

const helper = {
    obtenerCredenciales,
    conectar,
    estaConectado
};

module.exports = helper;