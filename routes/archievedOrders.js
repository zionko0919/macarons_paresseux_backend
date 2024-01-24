const { Router } = require('express');
const WebSocket = require('ws');

const authMiddleware = require('../middleware/authMiddleware');
const webSocketServer = require('../webSocketServer');
const archievedOrderData = require('../data/archievedOrdersData');

const sendOrders = () => {
  webSocketServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(archievedOrderData.getOrders()));
    }
  });
};

webSocketServer.on('connection', (ws) => {
  ws.send(JSON.stringify(archievedOrderData.getOrders()));
});

const archievedOrderRoutes = Router();
archievedOrderRoutes.route('/')
  .post((req, res) => {
    const archievedOrder = req.body;
    const result = archievedOrderData.createOrder(archievedOrder);
    if (!result.success) {
      res.status(400).send(result);
    } else {
      res.status(201).send();
      sendOrders();
    }
  })
  .delete((req, res) => {
    archievedOrderData.deleteOrders();
    res.send('deleted all orders');
    sendOrders();
  })
  .get((req, res) => {
    res.json(archievedOrderData.getOrders());
  });

// Routes for a single model
archievedOrderRoutes.route('/:id')
  .get((req, res) => {
    const archievedOrder = archievedOrderData.getOrders().find(({ id }) => id === req.params.id);
    if (archievedOrder) {
      res.json(archievedOrder);
    } else {
      res.status(404).send('No archieved order found');
    }
  })
  .put(authMiddleware, (req, res) => {
    if (!archievedOrderData.getOrders().some(({ id }) => id === req.params.id)) {
      res.status(404).send();
    } else {
      const editedArchievedOrder = req.body;
      const result = archievedOrderData.editOrder(req.params.id, editedArchievedOrder);
      if (!result.success) {
        res.status(400).send(result);
      } else {
        res.json(result.archievedOrder);
        sendOrders();
      }
    }
  })
  .delete(authMiddleware, (req, res) => {
    if (!archievedOrderData.getOrders().some(({ id }) => id === req.params.id)) {
      res.status(404).send();
    } else {
      archievedOrderData.deleteOrder(req.params.id);
      res.json({ message: `Successfully deleted archieved coffee order ${req.params.id}` });
      sendOrders();
    }
  });

module.exports = archievedOrderRoutes;
