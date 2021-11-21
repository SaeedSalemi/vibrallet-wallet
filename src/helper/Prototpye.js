
Object.defineProperty(String.prototype, "isEmail", {
  value: function () {
    const email = this
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
})

Object.defineProperty(String.prototype, "isPhone", {
  value: function () {
    const text = String(this)
    if (isNaN(text)) {
      return false
    }
    if (text.length > 12) {
      return false
    }

    return true
  }
})



Object.defineProperty(Object.prototype, "isEmpty", {
  value: function () {
    return Object.keys(this).length === 0
  }
})


Object.defineProperty(Number.prototype, "moneyFormat", {
  value: function (n, x) {
    try {
      const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
      return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    } catch (e) {
      // exeption(e);
      return '';
    }
  }
})

