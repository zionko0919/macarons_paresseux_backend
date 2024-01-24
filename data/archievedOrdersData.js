/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const jsonData = require('./ordersSampleData');

let archievedOrders = [];
let archievedOrderId = 1;

archievedOrders = jsonData;

const validateOrder = (archievedOrder) => {
  if (!archievedOrder) {
    return { error: 'Missing body', valid: false };
  }
  if (typeof archievedOrder.name !== 'string' || !archievedOrder.name.trim()) {
    return { error: 'Invalid Name', valid: false };
  }
  if (!archievedOrder.zipCode || !/^[0-9]{5}$/i.test(archievedOrder.zipCode)) {
    return { error: 'Invalid Zip Code', valid: false };
  }
  if (archievedOrder.zipCode > '999950' || archievedOrder.zipCode < '00501') {
    return { error: `${archievedOrder.zipCode} is not found`, valid: false };
  }
  if (!Array.isArray(archievedOrder.items) || archievedOrder.items.length === 0) {
    return { error: 'You must order at least one item.', valid: false };
  }
  return { valid: true };
};

const createOrder = (archievedOrder) => {
  const result = validateOrder(archievedOrder);
  if (!result.valid) {
    return { success: false, ...result };
  }

  const id = `${archievedOrderId}`;
  archievedOrderId += 1;
  const newOrder = {
    id,
    invoiceNumber: archievedOrder.invoiceNumber,
    name: archievedOrder.name,
    phone: archievedOrder.phone,
    zipCode: archievedOrder.zipCode,
    items: archievedOrder.items,
    total: archievedOrder.total,
    orderTimeLog: archievedOrder.orderTimeLog,
    pickUpDateString: archievedOrder.pickUpDateString,
    pickUpTime: archievedOrder.pickUpTime,
    subTotal: archievedOrder.subTotal,
    discountedSubTotal: archievedOrder.discountedSubTotal,
    taxAmount: archievedOrder.taxAmount,
    taxRate: archievedOrder.taxRate,
    couponDiscountPercentage: archievedOrder.couponDiscountPercentage,
    couponDiscountPrice: archievedOrder.couponDiscountPrice,
    pickUpDateTime: archievedOrder.pickUpDateTime,
  };
  archievedOrders.push(newOrder);

  return { success: true };
};

const deleteOrders = () => {
  archievedOrders = [];
};

const deleteOrder = (id) => {
  archievedOrders = archievedOrders.filter((archievedOrder) => archievedOrder.id !== id);
};

const editOrder = (id, editedArchievedOrder) => {
  const result = validateOrder(editedArchievedOrder);
  if (!result.valid) {
    return { success: false, ...result };
  }

  archievedOrders = archievedOrders.map((archievedOrder) => (archievedOrder.id === id ? {
    ...archievedOrder,
    items: editedArchievedOrder.items,
    name: editedArchievedOrder.name,
    phone: editedArchievedOrder.phone,
    zipCode: editedArchievedOrder.zipCode,
    total: archievedOrder.total,
    orderTimeLog: archievedOrder.orderTimeLog,
    pickUpDateString: archievedOrder.pickUpDateString,
    pickUpTime: archievedOrder.pickUpTime,
    subTotal: archievedOrder.subTotal,
    discountedSubTotal: archievedOrder.discountedSubTotal,
    taxAmount: archievedOrder.taxAmount,
    taxRate: archievedOrder.taxRate,
    couponDiscountPercentage: archievedOrder.couponDiscountPercentage,
    couponDiscountPrice: archievedOrder.couponDiscountPrice,
    pickUpDateTime: archievedOrder.pickUpDateTime,
  } : archievedOrder),
  console.log(archievedOrders));

  return {
    success: true,
    order: archievedOrders.find(
      (archievedOrder) => archievedOrder.id === id,
    ),
  };
};

const getOrders = () => archievedOrders;

module.exports = {
  createOrder,
  deleteOrders,
  deleteOrder,
  editOrder,
  getOrders,
  validateOrder,
};
