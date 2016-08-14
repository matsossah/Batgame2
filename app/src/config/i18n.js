import I18n from 'react-native-i18n';

import en from '../locales/en';
import fr from '../locales/fr';
import de from '../locales/de';

I18n.fallbacks = true;

I18n.translations = {
  en: en,
  fr: fr,
  de: de,
};

export default I18n;
