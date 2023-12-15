const { Router } = require('express');

const optionalItemsRoutes = Router();

optionalItemsRoutes.get('/', (req, res) => {
  setTimeout(
    () => res.json([
      {
        category: 'couponcode',
        itemId: 'twenty_percentoff',
        promoCode: 'EVERYTHINGOFF20',
        promoType: 'percentageOff',
        percentage: 0.20,
        minPurchase: null,
        discount: 0,
      },
      {
        category: 'couponcode',
        itemId: 'five_dolloroff',
        promoCode: 'SPECIAL5',
        promoType: 'amountOff',
        percentage: 0,
        minPurchase: 15.00,
        discount: 5,
      },
      {
        category: 'couponcode',
        itemId: 'fourty_percentoff',
        promoCode: 'BIGBIG40',
        promoType: 'percentageOff',
        percentage: 0.40,
        minPurchase: 30,
        discount: 0,
      },
    ]),
    // Adds a fake server side delay
    300,
  );
});

module.exports = optionalItemsRoutes;
