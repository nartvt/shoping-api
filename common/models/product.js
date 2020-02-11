'use strict';

module.exports = function (Product) {
  Product.afterRemote("findById", async ctx => {
    const result = ctx.result;
    const category = await result.category.get();
    category && (ctx.result.categoryName = category.__data.name);
    
  })
  
  // Product.afterRemote("create", async ctx => {
  //   const result = ctx.result;
  //   const category = await result.category.get();
  //   category && (ctx.result.categoryName = category.__data.name);
  // })


};
