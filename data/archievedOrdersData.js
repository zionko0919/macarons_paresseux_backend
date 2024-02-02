/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// const jsonData = require('./ordersSampleData');

let archievedOrders = [];
let archievedOrderId = 1;

// archievedOrders = jsonData;

const createOrder = (archievedOrder) => {
  // const result = validateOrder(archievedOrder);
  // if (!result.valid) {
  //   return { success: false, ...result };
  // }

  const id = `${archievedOrderId}`;
  archievedOrderId += 1;
  const newArchievedOrder = {
    id,
    // archievedOrder: archievedOrder.order,
    invoiceNumber: archievedOrder.order.invoiceNumber,
    name: archievedOrder.order.name,
    phone: archievedOrder.order.phone,
    zipCode: archievedOrder.order.zipCode,
    orderTimeLog: archievedOrder.order.orderTimeLog,
    pickUpDateString: archievedOrder.order.pickUpDateString,
    pickUpTime: archievedOrder.order.pickUpTime,
    pickUpDateTime: archievedOrder.order.pickUpDateTime,
    items: archievedOrder.order.items,
    subTotal: archievedOrder.order.subTotal,
    couponCodeName: archievedOrder.order.couponCodeName,
    couponDiscountPercentage: archievedOrder.order.couponDiscountPercentage,
    discountedSubTotal: archievedOrder.order.discountedSubTotal,
    couponDiscountPrice: archievedOrder.order.couponDiscountPrice,
    taxRate: archievedOrder.order.taxRate,
    taxAmount: archievedOrder.order.taxAmount,
    total: archievedOrder.order.total,
    readyOnTime: archievedOrder.order.readyOnTime,
  };
  archievedOrders.push(newArchievedOrder);

  return { success: true };
};

const deleteOrders = () => {
  archievedOrders = [];
};

const deleteOrder = (id) => {
  archievedOrders = archievedOrders.filter((archievedOrder) => archievedOrder.id !== id);
};

const editOrder = (id, editedArchievedOrder) => {
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
  // validateOrder,
};
