const axios = require('axios');
require('dotenv').config();
const { getProduct } = require('./getProduct');
// const createError = require('http-errors');
// const {formErrorObject, MAIN_ERROR_CODES} = require('../services/errorHandling');


async function getCartProducts(cart) {
    let products = [];
    return await Promise.all(cart.map(async item => {
        let product = await getProduct(item.fkProductId);
        products.push(product);
    }))
    .then(() => {
        return products;
    })
    .catch(error => {
        throw error;
    });
};

module.exports = {
    getCartProducts
}