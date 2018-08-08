const transactions = require('./transactions/transactions.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(transactions);
};
