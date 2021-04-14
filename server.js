const express = require('express');
const requireDir = require('require-dir');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 4000;
const options = {
    definition :{
        openapi: "3.0.0",
        info :{
            title: "API consultaCep e Cotação Dolar",
            version: "1.0",
            description: "API de consulta a CEP e a cotação diaria do Dolar"
        },
        servers:[
            {
                url: "http://localhost:3000"
            }
        ],
    },
    apis: ["./src/controllers/*.js"],
};

const specs = swaggerJsDoc(options);

//iniciando o app
const app = express();

app.use('/doc', swaggerUI.serve, swaggerUI.setup(specs));

//aceite dados como json..
app.use(express.json());

//app.user é: interceptador de requisições
//app.use('/api', require('./src/routes'));
app.use( require('./src/routes'));

app.listen(3000);