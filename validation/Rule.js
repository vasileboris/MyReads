export function isRequired(value) {
    if(!value) {
        return 'validation-value-is-required';
    }
    if(Array.isArray(value) && !value.length) {
        return 'validation-value-is-required';
    }
    return '';
}

export function isPositiveNumber(value) {
    const digitsOnlyRegexp = /^\d+$/;
    if(value && (!digitsOnlyRegexp.test(value) || value <= 0)) {
        return 'validation-value-is-positive-number';
    }
    return '';
}

export function isDate(value) {
    const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;
    if(value && !dateRegexp.test(value)) {
        return 'validation-value-is-date';
    }
    return '';
}

export function isUrl(value) {
    const urlRegexp = /^http[s]?:\/\/.+$/;
    if(value && !urlRegexp.test(value)) {
        return 'validation-value-is-url';
    }
    return '';
}
