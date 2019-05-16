export const getISODate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const addDays = (date, days) => {
    const result = new Date();
    result.setTime(Date.parse(date) + days * 24*60*60*1000);
    return getISODate(result);
};

export const periodDays = (laterDate, earlierDate) => {
    return (Date.parse(laterDate) - Date.parse(earlierDate)) / (24*60*60*1000) + 1;
};
