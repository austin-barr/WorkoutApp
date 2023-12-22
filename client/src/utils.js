

const toLocalDate = (dateString) => {
    const userTimeZone = new Date().toLocaleTimeString([], { timeZoneName: 'short' }).split(' ')[2];
    return new Date(dateString + " " + userTimeZone).toDateString()
}

module.exports = {
    toLocalDate,
}