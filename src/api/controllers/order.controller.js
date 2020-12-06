const createError = require('http-errors');
const { shopping_carts, orders, order_carts, deliveries, transactions, sequelize, Sequelize } = require('../../sequelize/models');
const { validationResult } = require('express-validator');
const {formErrorObject, MAIN_ERROR_CODES} = require('../../services/errorHandling');
const Op = Sequelize.Op;
const { getProduct } = require('../../services/getProduct');
const { changeProductAmount } = require('../../services/changeProductAmount');
const { getCartProducts } = require('../../services/getCartProducts');

module.exports = {
    addToCart: async (req, res, next) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
        }
        const user = req.user;
        const { productId, amount } = req.body;
        let product;

        try {
            product = await getProduct(productId);
        } catch (error) {
            if(error.response && error.response.data && error.response.data.code && error.response.data.message) {
                return next(createError(formErrorObject({ERROR_CODE: error.response.data.code, HTTP_CODE: error.response.status, MESSAGE: error.response.data.message })));
            }
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }

        if(product.amount < amount) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_ALREADY_DONE, 'No such amount of product')));
        
        const foundedProduct = await shopping_carts.findOne({
            where: {
                fkUserId: user.userId,
                fkProductId: product.id
            }
        });
        if(foundedProduct) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_ALREADY_DONE, 'Element already in shopping cart')));

        await shopping_carts.create({
            amount,
            fkUserId: user.userId,
            fkProductId: product.id
        });

        return res.status(200).json({ message: 'Product added to shopping cart' });
      } catch (error) {
        console.log(error);
        return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
      }
    },

    removeFromCart: async (req, res, next) => {
        try {
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
          }
          const user = req.user;
          const { productId } = req.body;
          let product;
  
          try {
              product = await getProduct(productId);
          } catch (error) {
              if(error.response && error.response.data && error.response.data.code && error.response.data.message) {
                  return next(createError(formErrorObject({ERROR_CODE: error.response.data.code, HTTP_CODE: error.response.status, MESSAGE: error.response.data.message })));
              }
              return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
          }
  
          const foundedProduct = await shopping_carts.findOne({
              where: {
                  fkUserId: user.userId,
                  fkProductId: product.id
              }
          });
          if(!foundedProduct) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Product not found in shopping cart')));
  
          await foundedProduct.destroy();
  
          return res.status(200).json({ message: 'Product deleted from shopping cart' });
        } catch (error) {
          console.log(error);
          return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    changeProductCartAmount: async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const user = req.user;
            const { productId, amount } = req.body;
            let product;
    
            try {
                product = await getProduct(productId);
            } catch (error) {
                if(error.response && error.response.data && error.response.data.code && error.response.data.message) {
                    return next(createError(formErrorObject({ERROR_CODE: error.response.data.code, HTTP_CODE: error.response.status, MESSAGE: error.response.data.message })));
                }
                return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
            }
    
            if(product.amount < amount) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_ALREADY_DONE, 'No such amount of product')));
            
            const foundedProduct = await shopping_carts.findOne({
                where: {
                    fkUserId: user.userId,
                    fkProductId: product.id
                }
            });
            if(!foundedProduct) return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Product not found in shopping cart')));

            foundedProduct.amount = amount;
            await foundedProduct.save()

            return res.status(200).json({ message: 'Product amount changed' });
        } catch (error) {
          console.log(error);
          return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
        }
    },

    createOrder: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return next(createError(formErrorObject(MAIN_ERROR_CODES.VALIDATION_BODY, 'Invalid request params', errors.errors)));
            }
            const user = req.user;
            const { 
                paymentType, deliveryType, city, street, houseNumber, appartmentNumber, shippingPrice, 
                promo, name, lastname, mobile, receiverName, receiverLastname, receiverMobile, 
            } = req.body;
    
            const cartProducts = await shopping_carts.findAll({ where: { fkUserId: user.userId } });

            if(!cartProducts) {
                await transaction.rollback();
                return next(createError(formErrorObject(MAIN_ERROR_CODES.ELEMENT_NOT_FOUND, 'Shopping cart is empty')));
            }
            const data = cartProducts.map(item => {
                return {productId: item.fkProductId, amount: item.amount}
            });

            await changeProductAmount(data, 'decrement');

            try {
                
                let productsList = await getCartProducts(cartProducts);
                const cartInfo = { product_total: 0, discount_total: 0 };
                productsList.forEach(item => {
                    cartInfo.product_total += item.price;
                    cartInfo.discount_total += (item.price - (item.price * item.discount));
                });
                // console.log(shippingPrice);
                // return res.status(200).end();

                const createdOrder = await orders.create({
                    status: 'New',
                    promo,
                    product_total: cartInfo.product_total,
                    discount_total: cartInfo.discount_total.toFixed(2),
                    grand_total: cartInfo.discount_total.toFixed(2) + shippingPrice,
                    name,
                    lastname,
                    fullname: `${name} ${lastname || ''}`.trim(),
                    mobile,
                    receiver_name: receiverName,
                    receiver_lastname: receiverLastname,
                    receiver_fullname: `${receiverName} ${receiverLastname || ''}`.trim(),
                    receiver_mobile: receiverMobile,
                    fkUserId: user.userId
                }, {transaction});

                // console.log(createdOrder.id);

                await transactions.create({
                    type: paymentType,
                    status: 'New',
                    fkOrderId: createdOrder.id
                }, {transaction});

                await deliveries.create({
                    type: deliveryType,
                    city,
                    street,
                    house_number: houseNumber,
                    appartment_number: appartmentNumber,
                    shipping_price: shippingPrice,
                    fkOrderId: createdOrder.id
                }, {transaction});
                
                const orderCart = productsList.map(product => {
                    let response = {};
                    response.price = product.price;
                    response.discount = product.discount;
                    response.fkProductId = product.id;
                    response.fkOrderId = createdOrder.id;
                    cartProducts.forEach(cart => {
                        if(cart.fkProductId == product.id) {
                            response.amount = cart.amount;
                        }
                    })
                    return response;
                });
                await order_carts.bulkCreate(orderCart, {transaction});

                await transaction.commit();
                res.status(200).json({message: 'Order successfully created'});
            } catch (error) {
                console.log(error);
                await transaction.rollback();
                await changeProductAmount(data, 'increment');
                if(error.response && error.response.code && error.response.message) {
                    return next(createError(formErrorObject(
                    {
                        ERROR_CODE: error.response.code, 
                        HTTP_CODE: error.status || 400, 
                        MESSAGE: error.response.message 
                    }, null, error.response.details || null)));
                }
                return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again')));
            }

        } catch (error) {
            if(error.response && error.response.code && error.response.message) {
                return next(createError(formErrorObject(
                {
                    ERROR_CODE: error.response.code, 
                    HTTP_CODE: error.status || 400, 
                    MESSAGE: error.response.message 
                }, null, error.response.details || null)));
            }
            return next(createError(formErrorObject(MAIN_ERROR_CODES.SYSTEM_ERROR, 'Something went wrong, please try again1')));
        }
    },
}