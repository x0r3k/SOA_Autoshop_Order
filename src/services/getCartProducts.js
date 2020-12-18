const axios = require('axios');
require('dotenv').config();
// const createError = require('http-errors');
// const {formErrorObject, MAIN_ERROR_CODES} = require('../services/errorHandling');


async function getCartProducts(cart) {
    
    const result = await Promise.all(cart.map(item =>  axios.get(`http://localhost:${process.env.PRODUCT_HTTP_PORT}/api/product/getProductById/${item.fkProductId}`)));
    // console.log("THEN", result);
    return result.map(item => item.data.product);
};

module.exports = {
    getCartProducts
}