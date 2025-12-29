import { createI18n } from 'vue-i18n';
import en from './locales/en';
import fr from './locales/fr';
import ja from './locales/ja';
import de from './locales/de';
import zh_TW from './locales/zh-TW';
import zh_CN from './locales/zh-CN';
import ko from './locales/ko';
const messages = {
    en,
    fr,
    ja,
    de,
    zh_TW,
    zh_CN,
    ko
};
export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    availableLocales: ['en', 'fr', 'ja', 'de', 'zh_TW', 'zh_CN', 'ko']
});
