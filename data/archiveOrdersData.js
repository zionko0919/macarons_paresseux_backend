/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
const jsonData = require('./ordersSampleData');

let archiveOrders = [];
let archiveOrderId = 1;

// archiveOrders = jsonData;

const createArchiveOrder = (archiveOrder) => {
  const id = `${archiveOrderId}`;
  archiveOrderId += 1;
  const newArchiveOrder = {
    id,
    invoiceNumber: archiveOrder.order.invoiceNumber,
    name: archiveOrder.order.name,
    phone: archiveOrder.order.phone,
    zipCode: archiveOrder.order.zipCode,
    orderTimeLog: archiveOrder.order.orderTimeLog,
    pickUpDateString: archiveOrder.order.pickUpDateString,
    pickUpTime: archiveOrder.order.pickUpTime,
    pickUpDateTime: archiveOrder.order.pickUpDateTime,
    items: archiveOrder.order.items,
    subTotal: archiveOrder.order.subTotal,
    couponCodeName: archiveOrder.order.couponCodeName,
    couponDiscountPercentage: archiveOrder.order.couponDiscountPercentage,
    discountedSubTotal: archiveOrder.order.discountedSubTotal,
    couponDiscountPrice: archiveOrder.order.couponDiscountPrice,
    taxRate: archiveOrder.order.taxRate,
    taxAmount: archiveOrder.order.taxAmount,
    total: archiveOrder.order.total,
    readyOnTime: archiveOrder.order.readyOnTime,
    orderStatus: archiveOrder.order.orderStatus,
    delayedTimeAmount: archiveOrder.order.delayedTimeAmount,
    anyReturns: false,
    exchangeDate: archiveOrder.order.exchangeDate,
    reasonsForExchangeOrReturn: archiveOrder.order.reasonsForExchangeOrReturn,
  };
  archiveOrders.push(newArchiveOrder);

  return { success: true };
};

const deleteArchiveOrders = () => {
  archiveOrders = [];
};

const deleteArchiveOrder = (id) => {
  archiveOrders = archiveOrders.filter((archiveOrder) => archiveOrder.id !== id);
};

// let exchangeItemArr = [];

const editArchiveOrder = (id, editedArchiveOrder) => {
  // const convertExchangeItems = Object.entries(
  //   editedArchiveOrder.exchangeItems,
  // ).map(
  //   ([itemId, quantity]) => ({ itemId, quantity }),
  // );

  // exchangeItemArr = [...exchangeItemArr, ...convertExchangeItems];

  archiveOrders = archiveOrders.map(
    (archiveOrder) => (archiveOrder.id === id ? {
      ...archiveOrder,
      invoiceNumber: editedArchiveOrder.invoiceNumber,
      name: editedArchiveOrder.name,
      phone: editedArchiveOrder.phone,
      zipCode: editedArchiveOrder.zipCode,
      orderTimeLog: editedArchiveOrder.orderTimeLog,
      pickUpDateString: editedArchiveOrder.pickUpDateString,
      pickUpTime: editedArchiveOrder.pickUpTime,
      pickUpDateTime: editedArchiveOrder.pickUpDateTime,
      items: editedArchiveOrder.items,
      subTotal: editedArchiveOrder.subTotal,
      couponCodeName: editedArchiveOrder.couponCodeName,
      couponDiscountPercentage: editedArchiveOrder.couponDiscountPercentage,
      discountedSubTotal: editedArchiveOrder.discountedSubTotal,
      couponDiscountPrice: editedArchiveOrder.couponDiscountPrice,
      taxRate: editedArchiveOrder.taxRate,
      taxAmount: editedArchiveOrder.taxAmount,
      total: editedArchiveOrder.total,
      readyOnTime: editedArchiveOrder.readyOnTime,
      orderStatus: editedArchiveOrder.orderStatus,
      delayedTimeAmount: editedArchiveOrder.delayedTimeAmount,
      anyReturns: editedArchiveOrder.anyReturns,
      exchangeDate: editedArchiveOrder.formattedExchangeDate,
      reasonsForExchangeOrReturn: editedArchiveOrder.reasonsForExchangeOrReturn,

    } : archiveOrder),
    console.log(archiveOrders),
  );

  return {
    success: true,
    order: archiveOrders.find(
      (archiveOrder) => archiveOrder.id === id,
    ),
  };
};

const getArchiveOrders = () => archiveOrders;

module.exports = {
  createArchiveOrder,
  deleteArchiveOrders,
  deleteArchiveOrder,
  editArchiveOrder,
  getArchiveOrders,
  // validateOrder,
};
