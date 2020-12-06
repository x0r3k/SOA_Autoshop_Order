const axios = require('axios');
require('dotenv').config();
// const createError = require('http-errors');
// const {formErrorObject, MAIN_ERROR_CODES} = require('../services/errorHandling');


async function getProduct(productId) {
    let product = await axios.get(`http://localhost:${process.env.PRODUCT_HTTP_PORT}/api/product/getProductById/${productId}`);
    return product.data.product;
};

module.exports = {
    getProduct
}