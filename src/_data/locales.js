const fs = require("fs");

module.exports = function () {
  const declaredLocales = Object.keys(require("./site.json").locales);
  const availableLocales = declaredLocales.filter(locale => fs.existsSync(`./src/${locale}`));

  return availableLocales;
}