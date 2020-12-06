const axios = require('axios');
require('dotenv').config();
// const createError = require('http-errors');
// const {formErrorObject, MAIN_ERROR_CODES} = require('../services/errorHandling');


async function changeProductAmount(data, type) {
    return new Promise(async (resolve, reject) => {
        try {
            await axios.put(`http://localhost:${process.env.PRODUCT_HTTP_PORT}/api/product/changeProductsAmount`,{
                data,
                type
            });
            resolve();
        } catch (error) {
            if(error.response && error.response.data) {
                reject({response: error.response.data, status: error.response.status});
            }
            reject({status: error.response.status});
        }
    });
};

module.exports = {
    changeProductAmount
}