/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies, no-unused-vars
const Hapi = require('@hapi/hapi');
const routes = require('./routers');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan di server ${server.info.uri}`);
};

init();
