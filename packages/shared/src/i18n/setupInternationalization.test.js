import setupInternationalization from './setupInternationalization';
import en from './locales/en.json';
import hu from './locales/hu.json';

describe('setupInternationalization', () => {
    test('should register everything for i18n', () => {
        const i18n = {
            use: initFunction => initFunction(),
            init: jest.fn()
        };
        const initReactI18next = jest.fn();
        const plugin = jest.fn();

        setupInternationalization(i18n, initReactI18next, plugin);

        expect(initReactI18next).toBeCalled();
        expect(plugin).toBeCalled();
        expect(i18n.init).toBeCalledWith({
            fallbackLng: 'en',
            whitelist: ['en', 'hu'],
            nonExplicitWhitelist: true,

            resources: {
                en,
                hu
            },

            debug: 'development' === process.env.NODE_ENV,

            interpolation: {
                escapeValue: false
            }
        })
    });
});
