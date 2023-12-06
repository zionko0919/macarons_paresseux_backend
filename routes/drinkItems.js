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
        description: 'Sip joy, embrace warmth. Our coffee, your daily escape into deliciousness.',
        size: 16,
        calories: 4,
      },
      {
        category: 'drink',
        itemId: 'icedcoffee',
        imageId: 'icedcoffee',
        title: 'Iced Coffee',
        price: 3.50,
        description: 'Icy cool, bold delight. Dive into our iced coffee—your refreshing escape to flavor-packed bliss.',
        size: 16,
        calories: 10,
      },
      {
        category: 'drink',
        itemId: 'latte',
        imageId: 'latte',
        title: 'Caffé Latte',
        price: 4.00,
        description: 'Creamy espresso bliss—experience pure indulgence with our Caffè Latte.',
        size: 16,
        calories: 240,
      },
      {
        category: 'drink',
        itemId: 'tea',
        imageId: 'tea',
        title: 'Black Tea',
        price: 3.50,
        description: 'Pure steeped perfection—embrace the simplicity of our black tea.',
        size: 16,
        calories: 4,
      },
      {
        category: 'drink',
        itemId: 'milk',
        imageId: 'milk',
        title: 'Fresh Milk',
        price: 3.00,
        description: 'Experience the best in every pour with our Whole Milk—pure perfection for unparalleled creaminess.',
        size: 16,
        calories: 300,
      },
    ]),
    // Adds a fake server side delay
    300,
  );
});

module.exports = drinkItemRoutes;
