const router = require('express').Router();
const { addToCart, removeFromCart, changeProductCartAmount, createOrder } = require('../controllers/order.controller');
const { authUser, authRole } = require('../../middlewares/auth.middleware');
const {
    body_Product_Id,
    body_Product_Amount,

    body_Transaction_PaymentType,
    body_Delivery_DeliveryType,
    body_Delivery_City,
    body_Delivery_Street,
    body_Delivery_HouseNumber,
    body_Delivery_AppartmentNumber,
    body_Delivery_ShippingPrice,
    body_Order_Promo,
    body_Order_Name,
    body_Order_Lastname,
    body_Order_Fullname,
    body_Order_Mobile,
    body_Order_ReceiverName,
    body_Order_ReceiverLastname,
    body_Order_ReceiverFullname,
    body_Order_ReceiverMobile
} = require('../../services/apiValidations');


router.post(
    '/addToCart',
    authUser,
    authRole([3]),
    [
        body_Product_Id(true),
        body_Product_Amount(true),
    ],
    addToCart
);

router.delete(
    '/removeFromCart',
    authUser,
    authRole([3]),
    [
        body_Product_Id(true),
    ],
    removeFromCart
);

router.put(
    '/changeProductCartAmount',
    authUser,
    authRole([3]),
    [
        body_Product_Id(true),
        body_Product_Amount(true),
    ],
    changeProductCartAmount
);

router.post(
    '/createOrder',
    authUser,
    authRole([3]),
    [
        body_Transaction_PaymentType(true),
        body_Delivery_DeliveryType(true),
        body_Delivery_City(true),
        body_Delivery_Street(true),
        body_Delivery_HouseNumber(true),
        body_Delivery_AppartmentNumber(false),
        body_Delivery_ShippingPrice(true),
        body_Order_Promo(false),
        body_Order_Name(true),
        body_Order_Lastname(false),
        body_Order_Mobile(true),
        body_Order_ReceiverName(true),
        body_Order_ReceiverLastname(false),
        body_Order_ReceiverMobile(true)
    ],
    createOrder
);

// router.put(
//     '/changeTransactionStatus',
//     changeTransactionStatus
// );

// router.put(
//     '/changeOrderStatus',
//     changeOrderStatus
// );

// router.put(
//     '/changeDeliveryStatus',
//     changeDeliveryStatus
// );

module.exports = router;
