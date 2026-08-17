import {useSyncExternalStore} from 'react';
import {translations, type TranslationKey} from './translations';

export type Locale = 'ru' | 'en';

const STORAGE_KEY = 'ws-locale';

const stored = localStorage.getItem(STORAGE_KEY);
let currentLocale: Locale = stored === 'en' ? 'en' : 'ru';

const subscribers = new Set<() => void>();

const applyLocale = (locale: Locale) => {
    document.documentElement.lang = locale;
};

// Применяем язык сразу при загрузке модуля
applyLocale(currentLocale);

export const getLocale = (): Locale => currentLocale;

export const setLocale = (locale: Locale) => {
    currentLocale = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    applyLocale(locale);
    subscribers.forEach(cb => cb());
};

const subscribe = (cb: () => void) => {
    subscribers.add(cb);
    return () => {
        subscribers.delete(cb);
    };
};

export type TranslateParams = Record<string, string | number>;

// Подстановка параметров вида {name} в строку перевода
const interpolate = (text: string, params?: TranslateParams): string =>
    params === undefined ? text
        : text.replace(/\{(\w+)\}/g, (match, name) =>
            params[name] !== undefined ? String(params[name]) : match);

// Перевод вне React-компонентов (валидация, обработчики) — читает текущую локаль в момент вызова
export const t = (key: TranslationKey, params?: TranslateParams): string =>
    interpolate(translations[currentLocale][key], params);

export const useTranslation = (): { t: typeof t, locale: Locale } => {
    const locale = useSyncExternalStore(subscribe, getLocale);
    return {t, locale};
};
