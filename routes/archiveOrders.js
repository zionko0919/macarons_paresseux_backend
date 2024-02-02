/* eslint-disable no-console */
const { Router } = require('express');
const WebSocket = require('ws');

const authMiddleware = require('../middleware/authMiddleware');
const webSocketServer = require('../webSocketServer');
const archiveOrderData = require('../data/archiveOrdersData');

const sendArchiveOrders = () => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(archiveOrderData.getArchiveOrders()));
    }
  });
};

webSocketServer.on('connection', (ws) => {
  console.log('You are connected to WS ARCHIVE ORDERS');
  // ws.send(JSON.stringify(archiveOrderData.getArchiveOrders()));
  ws.send(JSON.stringify({ type: 'archiveOrders', data: archiveOrderData.getArchiveOrders() }));
});

const archiveOrderRoutes = Router();
archiveOrderRoutes.route('/')
  .post((req, res) => {
    const archiveOrder = req.body;
    const result = archiveOrderData.createArchiveOrder(archiveOrder);
    if (!result.success) {
      res.status(400).send(result);
    } else {
      res.status(201).send();
      sendArchiveOrders();
    }
  })
  .delete((req, res) => {
    archiveOrderData.deleteArchiveOrders();
    res.send('deleted all orders');
    sendArchiveOrders();
  })
  .get((req, res) => {
    res.json(archiveOrderData.getArchiveOrders());
  });

// Routes for a single model
archiveOrderRoutes.route('/:id')
  .get((req, res) => {
    const archiveOrder = archiveOrderData.getArchiveOrders().find(({ id }) => id === req.params.id);
    if (archiveOrder) {
      res.json(archiveOrder);
    } else {
      res.status(404).send('No archived order found');
    }
  })
  .put(authMiddleware, (req, res) => {
    if (!archiveOrderData.getArchiveOrders().some(({ id }) => id === req.params.id)) {
      res.status(404).send();
    } else {
      const editedArchiveOrder = req.body;
      const result = archiveOrderData.editArchiveOrder(req.params.id, editedArchiveOrder);
      if (!result.success) {
        res.status(400).send(result);
      } else {
        res.json(result.archiveOrder);
        sendArchiveOrders();
      }
    }
  })
  .delete(authMiddleware, (req, res) => {
    if (!archiveOrderData.getArchiveOrders().some(({ id }) => id === req.params.id)) {
      res.status(404).send();
    } else {
      archiveOrderData.deleteArchiveOrder(req.params.id);
      res.json({ message: `Successfully deleted archived coffee order ${req.params.id}` });
      sendArchiveOrders();
    }
  });

module.exports = archiveOrderRoutes;
