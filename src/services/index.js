const transactions = require('./transactions/transactions.service.js');
const accounts = require('./accounts/accounts.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(transactions);
  app.configure(accounts);
};
