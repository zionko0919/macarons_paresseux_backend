const { Router } = require('express');

const drinkItemRoutes = Router();

drinkItemRoutes.get('/', (req, res) => {
  setTimeout(
    () => res.json([
      {
        category: 'drink',
        itemId: 'coffee',
        imageId: 'coffee',
        title: 'Coffee',
        price: 3.00,
      },
      {
        category: 'drink',
        itemId: 'icedcoffee',
        imageId: 'icedcoffee',
        title: 'Iced Coffee',
        price: 3.50,
      },
      {
        category: 'drink',
        itemId: 'latte',
        imageId: 'latte',
        title: 'Caffé Latte',
        price: 4.00,
      },
      {
        category: 'drink',
        itemId: 'tea',
        imageId: 'tea',
        title: 'Black Tea',
        price: 3.50,
      },
      {
        category: 'drink',
        itemId: 'milk',
        imageId: 'milk',
        title: 'Fresh Milk',
        price: 3.00,
      },
    ]),
    // Adds a fake server side delay
    300,
  );
});

module.exports = drinkItemRoutes;
