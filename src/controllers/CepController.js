
const soap = require('soap');
const dateFormat = require("dateformat");

const url = 'https://apps.correios.com.br/SigepMasterJPA/AtendeClienteService/AtendeCliente?wsdl';

module.exports = {

/**
 * @swagger
 * components:
 *   schemas:
 *     saidaCEP:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: objeto com a msg
 *         bairro:
 *           type: string
 *           description: bairro
 *         cep:
 *           type: string
 *           description: cep da localidade
 *         cidade:
 *           type: string
 *           description: a cidade
 *         complemento2:
 *           type: string
 *           description: a cidade
 *         end:
 *           type: string
 *           description: endereço
 *         uf:
 *           type: string
 *           description: a UF da localidade
 *       example:
 *         data: 
 *          bairro: "string"
 *          cep: "string"
 *          cidade: "string"
 *          complemento2: "string"
 *          end: "string"
 *          uf: "string"  
 */

 /**
  * @swagger
  * tags:
  *   name: CEP
  *   description: Métodos de busca de dados da API CEP
  */

/**
 * @swagger
 * /buscaCEP/{cep}:
 *   get:
 *     summary: busca pelo CEP da localidade
 *     tags: [CEP]
 *     parameters:
 *       - in: path
 *         name: cep
 *         schema:
 *           type: string
 *         required: true
 *         description: O CEP a ser localizado.
 *     responses:
 * 
 *       200:
 *         description: Objeto CEP com bairro, cidade, complemento, endereço e UF
 *         content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/saidaCEP'
 *       404:
 *         description: O CEP informado não existe ou está incorreto.
 */

    async index(req, res){
        cep = req.params.cep;
        if(cep.length === 8){

            soap.createClient(url, function(err, client) {
                if(err) 
                    return res.status(400).json({'error': {'msg': err}});

                client.consultaCEP( {'cep':cep}, function(err, result) {
                    if(err) 
                        return res.status(400).json({'error': {'msg': err}});

                    return res.json({'data':   result.return});
                });
                
            }); 
         }else{
            return res.status(400).json({'error': {'msg': "CEP informado não existe ou está incorreto"}});
        }

    },

/**
 * @swagger
 * components:
 *   schemas:
 *     dataAtual:
 *       type: object
 *       required:
 *       properties:
 *       example:
 *             
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     saidaDataAtual:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: objeto com a data
 *         data_hora:
 *           type: string
 *           description: data e hora do sistema
 *       example:
 *         data: 
 *          data_hora: "string"       
 */
/**
 * @swagger
 * /dataAtual:
 *   get:
 *     summary: busca data e hora do sistema dos correios
 *     tags: [CEP]
 *     parameters:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dataAtual'
 *     responses:
 *       200:
 *         description: mostra a data e hora do sistema
 *         content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/saidaDataAtual'
 *       404:
 *         description: Sistema fora do ar.
 */    


    async dataAtual(req, res){
        soap.createClient(url, function(err, client) {
            if(err) 
                return res.status(400).json({'error': {'msg': err}})
            client.buscaDataAtual( {}, function(err, result) {
                if(err) 
                    return res.status(400).json({'error': {'msg': err}});

               dt = new Date(result.return);
               let formatted = dateFormat(dt,'d/mm/yyyy H:MM:ss');
                return res.json({'data': {'data_hora': formatted}});
            });
            
        });
    },

/**
 * @swagger
 * components:
 *   schemas:
 *     msgs:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: integer
 *           description: Número da msg a ser localizada
 *         
 *       example:
 *         id: 1
 *             
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     saidaMSG:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: objeto com a msg
 *         mensagem:
 *           type: string
 *           description: msg do sistema
 *         tipo:
 *           type: string
 *           description: Tipo
 *         titulo:
 *           type: string
 *           description: Aviso, importante, etc..
 *       example:
 *         data: 
 *          mensagem: "string"
 *          tipo: "string"
 *          titulo: "string"             
 */
/**
 * @swagger
 * /msg:
 *   post:
 *     summary: busca as MSG padrões do sistema dos correios
 *     tags: [CEP]

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/msgs'
 *     responses:
 *       200:
 *         description: mostra a msg padrão do codigo informado
 *         content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/saidaMSG'
 *       404:
 *         description: Sistema fora do ar.
 */    
    async msgParametrizada(req, res){
        const codMSG = req.body.id;
        soap.createClient(url, function(err, client) {
            if(err) 
                return res.status(400).json({'error': {'msg': err}});

            client.obterMensagemParametrizada({'id': codMSG}, function(err, result) {
                if(err) 
                    return res.status(400).json({'error': {'msg': err}});
               
                return res.json({'data':  result});
            });
            
        });
    },

}


