const hbs = require('hbs');

hbs.registerHelper('formatDate', function (datetime) {
  return datetime.toString().split(' GMT')[0];
});

hbs.registerHelper('add', function (a, b) {
  return a + b;
});
