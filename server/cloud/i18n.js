const locales = {
  fr: {
    YOUR_TURN: username => `À ton tour de jouer contre ${username} ! 💪`,
    YOU_WON: username => `Félicitations, tu as battu ${username} ! 🎉`,
    YOU_LOST: username => `Oups, il semblerait que ${username} t'aie battu... 💩`,
  },
  en: {
    YOUR_TURN: username => `Your turn to play against ${username}! 💪`,
    YOU_WON: username => `Congratulations, you beat ${username}! 🎉`,
    YOU_LOST: username => `Oops, it looks like ${username} beat you... 💩`,
  },
};

export default function i18n(locale, id, ...args) {
  const firstPart = locale.split('-');
  const loc = {}.hasOwnProperty.call(locales, firstPart)
    ? locales[firstPart] : locales.en;
  return loc[id](...args);
}
