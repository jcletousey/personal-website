import fs from "fs";

const data = fs.readFileSync('./src/_data/site.json');
const site = JSON.parse(data);

function getLocales () {
  const declaredLocales = Object.keys(site.locales);
  const availableLocales = declaredLocales.filter(locale => fs.existsSync(`./src/content/${locale}`));

  return availableLocales;
}

export default getLocales();