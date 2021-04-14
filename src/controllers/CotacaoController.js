const request = require( 'request');
const parseJson = require('parse-json');
const {format} = require('date-fns');
const pt =  require('date-fns/locale/pt');

module.exports = {

/**
 * @swagger
 * components:
 *   schemas:
 *     saidaDolar:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           description: objeto com a msg
 *         cotacaoCompra:
 *           type: float
 *           description: cotação de compra do dólar
 *         cotacaoVenda:
 *           type: float
 *           description: cotação de venda do dólar
 *         dataHoraCotacao:
 *           type: date
 *           description: data e hora da cotação
 *       example:
 *         data: 
 *          cotacaoCompra: "float"
 *          cotacaoVenda: "float"
 *          dataHoraCotacao: "date" 
 */

 /**
  * @swagger
  * tags:
  *   name: DOLAR
  *   description: Métodos de busca cotação do dólar na API do Banco Central do Brasil
  */

/**
 * @swagger
 * /cotacaoDolar/{dia}:
 *   get:
 *     summary: Busca a cotação do dólar
 *     tags: [DOLAR]
 *     parameters:
 *       - in: path
 *         name: dia
 *         schema:
 *           type: string
 *         required: true
 *         description: A data a ser busca no formato Y-m-d.
 *     responses:
 *       200:
 *         description: Cotação do dolar do dia
 *         content:
 *            application/json:
 *             schema:
 *               $ref: '#/components/schemas/saidaDolar'
 *       404:
 *         description: Não foi encontrada a cotação para a data informada.
 */

    async index(req, res){

        let dt = new Date(req.params.dia+' 00:00:00'); //.toLocaleDateString("pt-BR") ;

        dataformatada = format(dt,'MM-dd-yyyy', {locale: pt});

        let urlDadosAbertos = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?%40dataCotacao='${dataformatada}'&%24format=json`;

        request.get(urlDadosAbertos, (err, resp, body)=>{

            const retorno = JSON.parse(body);
            return res.json({'data': retorno.value });
        });
        
       
    }
}