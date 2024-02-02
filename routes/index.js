const { Router } = require('express');

const authRoutes = require('./auth');
const macaronPackRoutes = require('./macaronPacks');
const macaronItemRoutes = require('./macaronItems');
const optionalItemsRoutes = require('./optionalItems');
const drinkItemRoutes = require('./drinkItems');
const orderRoutes = require('./orders');
const archiveOrderRoutes = require('./archiveOrders');
const employeeRoutes = require('./employees');
const couponCodeRoutes = require('./couponCodes');

const routes = Router();

routes.use('/api/auth', authRoutes);
routes.use('/api/macaronPacks', macaronPackRoutes);
routes.use('/api/macaronItems', macaronItemRoutes);
routes.use('/api/drinkItems', drinkItemRoutes);
routes.use('/api/optionalItems', optionalItemsRoutes);
routes.use('/api/orders', orderRoutes);
routes.use('/api/archiveOrders', archiveOrderRoutes);
routes.use('/api/employees', employeeRoutes);
routes.use('/api/couponCodes', couponCodeRoutes);

module.exports = routes;
