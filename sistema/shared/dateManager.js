module.exports = {
    adHoras: (date, hours) => {
        date.setHours(date.getHours() + hours);
        return date;
    }
}