
return module.exports = config = {
    mongo: {
        uri: process.env.MONGO_URL ||
            'mongodb://127.0.0.1/database/clube_de_robotica_db',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            user: "ClubeRobotica",
            pass: "-CWUK58zZsCJ%nGU"
        },

    },
    NODEJS_PORT: process.env.port ||
        process.env.NODE_ENV === 'production' ? '8443' : '8080',
    DB_HOST: 'redis',
    DB_PORT: 6379,
    DOMAIN:   process.env.NODE_ENV === 'production' ? 'https://clrobotica.deec.uc.pt': 'http://localhost',
};