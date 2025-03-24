import Handlebars from 'handlebars';

export const registerHandlebarsHelpers = () => {
  Handlebars.registerHelper('multiply', (a, b) => a * b);

  Handlebars.registerHelper('cartTotal', (products) => {
    return products.reduce((total, item) => total + (item.quantity * item.product.price), 0);
  });
};
