module.exports = {
  translations: data => {
    // Retrieve all translation links
    const tr = {};
    const d = data.collections.all;
    for (const item of d) {
      if (item.data.idI18n !== undefined) {
        if (tr[item.data.idI18n] === undefined) {
          tr[item.data.idI18n] = [];
        }
        tr[item.data.idI18n].push({"locale": item.data.locale, "url": item.url});
      }
    }

    // Return the translation links for the current item
    return tr[data.idI18n]?.filter(item => item.locale !== data.locale);
  }
}