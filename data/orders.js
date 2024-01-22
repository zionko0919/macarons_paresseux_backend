let orders = [];
let orderId = 1;
// const invoiceNumber = Date.now();

const validateOrder = (order) => {
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
  return { valid: true };
};

const createOrder = (order) => {
  const result = validateOrder(order);
  if (!result.valid) {
    return { success: false, ...result };
  }

  const id = `${orderId}`;
  orderId += 1;
  const newOrder = {
    id,
    invoiceNumber: order.invoiceNumber,
    name: order.name,
    phone: order.phone,
    zipCode: order.zipCode,
    items: order.items,
    total: order.total,
    orderTimeLog: order.orderTimeLog,
    pickUpDateString: order.pickUpDateString,
    pickUpTime: order.pickUpTime,
    subTotal: order.subTotal,
    discountedSubTotal: order.discountedSubTotal,
    taxAmount: order.taxAmount,
    taxRate: order.taxRate,
    couponDiscountPercentage: order.couponDiscountPercentage,
    couponDiscountPrice: order.couponDiscountPrice,
    pickUpDateTime: order.pickUpDateTime,
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

  orders = orders.map((order) => (order.id === id ? {
    ...order,
    items: editedOrder.items,
    name: editedOrder.name,
    phone: editedOrder.phone,
    zipCode: editedOrder.zipCode,
    total: order.total,
    orderTimeLog: order.orderTimeLog,
    pickUpDateString: order.pickUpDateString,
    pickUpTime: order.pickUpTime,
    subTotal: order.subTotal,
    discountedSubTotal: order.discountedSubTotal,
    taxAmount: order.taxAmount,
    taxRate: order.taxRate,
    couponDiscountPercentage: order.couponDiscountPercentage,
    couponDiscountPrice: order.couponDiscountPrice,
    pickUpDateTime: order.pickUpDateTime,
  } : order),
  console.log(orders));

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
