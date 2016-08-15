const locales = {
  fr: {
    YOUR_TURN: username => `À ton tour de jouer contre ${username} ! 💪`,
    YOU_WON: username => `Félicitations, tu as battu ${username} ! 🎉`,
    YOU_LOST: username => `Oups, il semblerait que ${username} t'aie battu(e)... 💩`,
    CHALLENGED: username => `${username} t'as défié ! C'est le moment de montrer qui est le meilleur ! 😉`,
  },
  en: {
    YOUR_TURN: username => `Your turn to play against ${username}! 💪`,
    YOU_WON: username => `Congratulations, you beat ${username}! 🎉`,
    YOU_LOST: username => `Oops, looks like ${username} beat you... 💩`,
    CHALLENGED: username => `${username} challenged you! Time to show who's the boss! 😉`,
  },
};

export default function i18n(locale, id, ...args) {
  const firstPart = locale.split('-');
  const loc = {}.hasOwnProperty.call(locales, firstPart)
    ? locales[firstPart] : locales.en;
  return loc[id](...args);
}
