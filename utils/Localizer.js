import i18next from 'i18next';
import messages from "/translations/Messages";

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
    }

};

export default Localizer;
