import i18next from 'i18next';
import messages from "../assets/translations/Messages";

const Localizer = {

    init: function(callback) {
        i18next.init({
            lng: "en",
            fallbackLng: "en",
            interpolation: {
                prefix: "{",
                suffix: "}"
            },
            resources: {
                en: {
                    translation: messages
                }
            },
            debug: true
        }, () => callback());
    },

    localize: function (key, ...args) {
        const values = args.reduce((values, value, idx) => ({
            ...values,
            [idx]: value
        }) , {});
        return i18next.t(key, values);
    },

    localizeWithCount: function (key, value) {
        return i18next.t(key, {count: value});
    },

    toLocaleDateString: function (date) {
        return date;
    }
};

export default Localizer;
