const { Router } = require('express');

const optionalItemsRoutes = Router();

optionalItemsRoutes.get('/', (req, res) => {
  setTimeout(
    () => res.json([
      {
        category: 'giftoption',
        itemId: 'giftwrap',
        title: 'Gift Wrap Option',
        price: 2.00,
      },
    ]),
    // Adds a fake server side delay
    300,
  );
});

module.exports = optionalItemsRoutes;
