import I18n from 'react-native-i18n';

import en from '../locales/en';
import fr from '../locales/fr';
import de from '../locales/de';
import es from '../locales/es';
import pt from '../locales/pt';

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
  de,
  es,
  pt,
};

export default I18n;
