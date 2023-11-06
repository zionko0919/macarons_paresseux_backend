const { Router } = require('express');

const authRoutes = require('./auth');
const macaronPackRoutes = require('./macaronPacks')
const macaronItemRoutes = require('./macaronItems');
const drinkItemRoutes = require('./drinkItems')
const orderRoutes = require('./orders');
const employeeRoutes = require('./employees');

const routes = Router();

routes.use('/api/auth', authRoutes);
routes.use('/api/macaronPacks', macaronPackRoutes);
routes.use('/api/macaronItems', macaronItemRoutes);
routes.use('/api/drinkItems', drinkItemRoutes);
routes.use('/api/orders', orderRoutes);
routes.use('/api/employees', employeeRoutes);

module.exports = routes;
