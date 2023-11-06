const { Router } = require('express');

const itemRoutes = Router();

itemRoutes.get('/', (req, res) => {
  setTimeout(
    () => res.json([
      {
        category: 'macaron',
        itemId: 'almond',
        imageId: 'almond',
        title: 'Almond',
        price: 2.50,
        calories: 90,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'blackberry',
        imageId: 'blackberry',
        title: 'Blackberry',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'lemon',
        imageId: 'lemon',
        title: 'Lemon',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'greentea',
        imageId: 'greentea',
        title: 'Green Tea',
        price: 2.50,
        calories: 90,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'caramel',
        imageId: 'caramel',
        title: 'Caramel',
        price: 2.50,
        calories: 120,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'cherry',
        imageId: 'cherry',
        title: 'Cherry',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'grape',
        imageId: 'grape',
        title: 'Grape',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'mint',
        imageId: 'mint',
        title: 'Mint',
        price: 2.50,
        calories: 90,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'raspberry',
        imageId: 'raspberry',
        title: 'Raspberry',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'orange',
        imageId: 'orange',
        title: 'Orange',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'chocolate',
        imageId: 'chocolate',
        title: 'Chocolate',
        price: 2.50,
        calories: 110,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
      {
        category: 'macaron',
        itemId: 'blueberry',
        imageId: 'blueberry',
        title: 'Blueberry',
        price: 2.50,
        calories: 100,
        description: "CONTAINS: EGG, CREAM, ALMOND"
      },
    ]),
    // Adds a fake server side delay
    300,
  );
});

module.exports = itemRoutes;
