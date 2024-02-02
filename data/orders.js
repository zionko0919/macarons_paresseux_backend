/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const drinkItemsData = require('./product_data/drinkItemData');
const macaronItemsData = require('./product_data/macaronItemData');
const macaronPackData = require('./product_data/macaronPackData');
const optionalItemsData = require('./product_data/optionalItemData');
const couponCodesData = require('./product_data/couponCodeData');

const jsonData = require('./ordersSampleData'); // test data 1
const jsonData2 = require('./ordersSampleArray2.json'); // test data 2

const calculateSubTotal = (order) => {
  const orderedItem = order.items.reduce((acc, item) => {
    let product = {};
    if (item.category === 'pack') {
      product = macaronPackData.find((i) => i.itemId === item.itemId);
    } else if (item.category === 'drink') {
      product = drinkItemsData.find((i) => i.itemId === item.itemId);
    }

    let productPrice = product.salePrice ?? product.price;
    if (item.giftOption && item.giftOption.isGiftOptionSelected) {
      productPrice += 2.0;
    }
    return (item.quantity * productPrice + acc);
  }, 0);

  return orderedItem;
};

const getCouponDiscountPercentage = (order) => {
  if (order.currentCoupon) {
    const discountRate = couponCodesData.find(
      (i) => i.promoCode === (order.currentCoupon).toUpperCase(),
    ).percentage;
    if (discountRate) {
      return discountRate;
    }
    const discountAmount = couponCodesData.find(
      (i) => i.promoCode === (order.currentCoupon).toUpperCase(),
    ).discount;
    const calculatedDiscountRate = discountAmount / calculateSubTotal(order);
    return calculatedDiscountRate;
  }
  return 0;
};

const texasStateTaxRate = 0.0625;
const countyTaxRate = 0.0;
const austinTaxRate = 0.01;
const texasAustinTaxRate = texasStateTaxRate + countyTaxRate + austinTaxRate;

let orders = [];
let orderId = 1;
// orders = jsonData;
// orders = jsonData2;

const validateOrder = (order, subTotal) => {
  if (!order) {
    return { error: 'Missing body', valid: false };
  }
  if (typeof order.name !== 'string' || !order.name.trim()) {
    return { error: 'Invalid Name', valid: false };
  }
  if (!order.zipCode || !/^[0-9]{5}$/i.test(order.zipCode)) {
    return { error: 'Invalid Zip Code', valid: false };
  }
  if (order.zipCode > '999950' || order.zipCode < '00501') {
    return { error: `${order.zipCode} is not found`, valid: false };
  }
  if (!Array.isArray(order.items) || order.items.length === 0) {
    return { error: 'You must order at least one item.', valid: false };
  }
  if (order.currentCoupon) {
    const minPurchase = couponCodesData.find((i) => i.promoCode
    === (order.currentCoupon).toUpperCase());
    if (subTotal < minPurchase) {
      return { error: `Invalid Coupon: Purchase of $${minPurchase} required to apply your code.`, valid: false };
    }
  }

  return { valid: true };
};

const createOrder = (order) => {
  const itemStatus = 'PAID';
  const subTotal = calculateSubTotal(order);

  const result = validateOrder(order, subTotal);
  if (!result.valid) {
    return { success: false, ...result };
  }

  const couponDiscountPercentage = getCouponDiscountPercentage(order);
  const couponDiscountPrice = (subTotal * couponDiscountPercentage);
  const discountedSubTotal = (subTotal - couponDiscountPrice);
  const taxAmount = (discountedSubTotal * texasAustinTaxRate);
  const total = ((discountedSubTotal) + (taxAmount));
  const id = `${orderId}`;

  const updatedItems = order.items.map(
    (item) => ({ ...item, itemStatus, date: order.orderTimeLog }),
  );

  orderId += 1;
  const newOrder = {
    id,
    invoiceNumber: order.invoiceNumber,
    name: order.name,
    phone: order.phone,
    zipCode: order.zipCode,
    orderTimeLog: order.orderTimeLog,
    pickUpDateString: order.pickUpDateString,
    pickUpTime: order.pickUpTime,
    pickUpDateTime: order.pickUpDateTime,
    items: updatedItems,
    subTotal,
    couponCodeName: order.currentCoupon,
    couponDiscountPercentage,
    couponDiscountPrice,
    discountedSubTotal,
    taxRate: texasAustinTaxRate,
    taxAmount,
    total,
  };
  orders.push(newOrder);

  return { success: true };
};

const deleteOrders = () => {
  orders = [];
};

const deleteOrder = (id) => {
  orders = orders.filter((order) => order.id !== id);
};

const editOrder = (id, editedOrder) => {
  const result = validateOrder(editedOrder);
  if (!result.valid) {
    return { success: false, ...result };
  }

  orders = orders.map(
    (order) => (order.id === id ? {
      ...order,
      items: editedOrder.items,
      name: editedOrder.name,
      phone: editedOrder.phone,
      zipCode: editedOrder.zipCode,
      total: editedOrder.total,
      orderTimeLog: editedOrder.orderTimeLog,
      pickUpDateString: editedOrder.pickUpDateString,
      pickUpTime: editedOrder.pickUpTime,
      subTotal: editedOrder.subTotal,
      discountedSubTotal: editedOrder.discountedSubTotal,
      taxAmount: editedOrder.taxAmount,
      taxRate: editedOrder.taxRate,
      couponDiscountPercentage: editedOrder.couponDiscountPercentage,
      couponDiscountPrice: editedOrder.couponDiscountPrice,
      pickUpDateTime: editedOrder.pickUpDateTime,
    } : order),
  );

  return { success: true, order: orders.find((order) => order.id === id) };
};

const getOrders = () => orders;

module.exports = {
  createOrder,
  deleteOrders,
  deleteOrder,
  editOrder,
  getOrders,
  validateOrder,
};
