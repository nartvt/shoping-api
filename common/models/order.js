'use strict';
const _ = require('lodash');
const app = require('./../../server/server');
module.exports = function (Order) {
  // Order.observe("before save", async ctx => {

  // })
  Order.observe("after save", async ctx => {
    const OrderItem = app.models.OrderItem;
    const instance = ctx.instance;

    // const accountId = _.get(ctx, 'options.req.body.accountId');
    const products = _.get(ctx, 'options.req.body.products');

    await products.forEach(async prod => {
      await OrderItem.create({
        productId: prod.productId,
        orderId: instance.__data.id,
        quantity: prod.quantity

      })
    })
  })
  Order.afterRemote('findById', async ctx => {
    const OrderItem = app.models.OrderItem;
    const result = ctx.result;
    const account = await result.account.get();

    const orderItems = await OrderItem.find({
      where: {orderId: result.id}
    })
    const productList = [];
    for (let i = 0; i < orderItems.length; i++){
      const item = orderItems[i];
      const prod = await item.product;
      productList.push({
        ...prod.__data,
        quantity: item.__data.quantity
      })
    }
    console.log(productList)
    const totalPrice = productList.map(item => item.price * item.quantity).reduce((a, b) => (a + b), 0)
    result.__data.account = account.__data;
    result.__data.productList = productList;
    result.__data.totalPrice = totalPrice;
  })
};
