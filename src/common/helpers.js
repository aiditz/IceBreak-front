export default {
  capitalizeFirstLetter(s) {
    return s.charAt(0).toLocaleUpperCase() + s.substr(1);
  },

  getNextId: (function () {
    let nextId = 1;

    return function() {
      return nextId++;
    };
  }()),

  formatMoney(value) {
    return new Intl.NumberFormat('ru', {currency: 'USD'}).format(value);
  },
};
