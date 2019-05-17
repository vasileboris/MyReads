const padValueZero = (value, length = 2) => {
    let paddedValue = `${value}`;
    let diff = length - paddedValue.length;
    if(diff > 0) {
        paddedValue = '0'.repeat(diff) + paddedValue;
    }
    return paddedValue;
};

export const getISODate = date => {
    return `${date.getFullYear()}-${padValueZero(date.getMonth())}-${padValueZero(date.getDate())}`;
};

export const addDays = (date, days) => {
    const result = new Date();
    result.setTime(Date.parse(date) + days * 24*60*60*1000);
    return getISODate(result);
};

export const periodDays = (laterDate, earlierDate) => {
    return (Date.parse(laterDate) - Date.parse(earlierDate)) / (24*60*60*1000) + 1;
};
