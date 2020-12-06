const { query, param, check } = require('express-validator');
const isNumber = require('../helpers/isNumber');
const { PAYMENT_TYPES, DELIVERY_TYPES } = require('../helpers/constants');

const isRequiredParameter = (isRequired, paramName) => {
    return isRequired ? check(paramName).exists().withMessage('Is required').bail() : check(paramName).optional();
}

module.exports = {
    param_Product_Id: () => {
      return param('productId').exists().withMessage('Is required').bail()
        .custom(value => isNumber(value) ? true : false).withMessage('ID Should be an integer value').bail();
    },
    param_Category_Id: () => {
        return param('categoryId').exists().withMessage('Is required').bail()
          .custom(value => isNumber(value) ? true : false).withMessage('ID Should be an integer value').bail();
    },
    body_Category_Id: (isRequired) => {
      return isRequiredParameter(isRequired, 'categoryId').notEmpty().withMessage('Should not be empty').bail()
        .custom(value => isNumber(value) ? true : false).withMessage('Should be an integer value').bail();
    },
    body_Product_Name: (isRequired) => {
      return isRequiredParameter(isRequired, 'name').notEmpty().withMessage('Should not be empty').bail()
        .isString().withMessage('Should be string')
        .isLength({ max: 255 }).withMessage('Max length is 255 symbols');
    },
    body_Product_Id: (isRequired) => {
        return isRequiredParameter(isRequired, 'productId').notEmpty().withMessage('Should not be empty').bail()
            .isInt().withMessage('Should be an integer value').bail();
    },
    body_Product_Amount: (isRequired) => {
        return isRequiredParameter(isRequired, 'amount').notEmpty().withMessage('Should not be empty').bail()
            .isInt().withMessage('Should be an integer value').bail();
    },


    body_Transaction_PaymentType: (isRequired) => {
        return isRequiredParameter(isRequired, 'paymentType').notEmpty().withMessage('Should not be empty').bail()
            .isIn(PAYMENT_TYPES).withMessage(`Should be one of values: ${PAYMENT_TYPES}`).bail();
    },
    body_Delivery_DeliveryType: (isRequired) => {
        return isRequiredParameter(isRequired, 'deliveryType').notEmpty().withMessage('Should not be empty').bail()
            .isIn(DELIVERY_TYPES).withMessage(`Should be one of values: ${DELIVERY_TYPES}`).bail();
    },
    body_Delivery_City: (isRequired) => {
        return isRequiredParameter(isRequired, 'city').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 50 }).withMessage('Max length is 255 symbols');
    },
    body_Delivery_Street: (isRequired) => {
        return isRequiredParameter(isRequired, 'street').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 30 }).withMessage('Max length is 255 symbols');
    },
    body_Delivery_HouseNumber: (isRequired) => {
        return isRequiredParameter(isRequired, 'houseNumber').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 10 }).withMessage('Max length is 10 symbols');
    },
    body_Delivery_AppartmentNumber: (isRequired) => {
        return isRequiredParameter(isRequired, 'appartmentNumber').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 10 }).withMessage('Max length is 10 symbols');
    },
    body_Delivery_ShippingPrice: (isRequired) => {
        return isRequiredParameter(isRequired, 'shippingPrice').notEmpty().withMessage('Should not be empty').bail()
            .isDecimal().withMessage('Should be an float value').bail();
    },
    body_Order_Promo: (isRequired) => {
        return isRequiredParameter(isRequired, 'promo').notEmpty().withMessage('Should not be empty').bail()
            .isDecimal().withMessage('Should be an float value').bail();
    },
    body_Order_Name: (isRequired) => {
        return isRequiredParameter(isRequired, 'name').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 20 }).withMessage('Max length is 255 symbols');
    },
    body_Order_Lastname: (isRequired) => {
        return isRequiredParameter(isRequired, 'lastname').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 30 }).withMessage('Max length is 255 symbols');
    },
    body_Order_Fullname: (isRequired) => {
        return isRequiredParameter(isRequired, 'fullname').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 50 }).withMessage('Max length is 255 symbols');
    },
    body_Order_Mobile: (isRequired) => {
        return isRequiredParameter(isRequired, 'mobile').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 10 }).withMessage('Max length is 255 symbols');
    },
    body_Order_ReceiverName: (isRequired) => {
        return isRequiredParameter(isRequired, 'receiverName').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 20 }).withMessage('Max length is 255 symbols');
    },
    body_Order_ReceiverLastname: (isRequired) => {
        return isRequiredParameter(isRequired, 'receiverLastname').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 30 }).withMessage('Max length is 255 symbols');
    },
    body_Order_ReceiverFullname: (isRequired) => {
        return isRequiredParameter(isRequired, 'receiverFullname').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 50 }).withMessage('Max length is 255 symbols');
    },
    body_Order_ReceiverMobile: (isRequired) => {
        return isRequiredParameter(isRequired, 'receiverMobile').notEmpty().withMessage('Should not be empty').bail()
          .isString().withMessage('Should be string')
          .isLength({ max: 10 }).withMessage('Max length is 255 symbols');
    },
}