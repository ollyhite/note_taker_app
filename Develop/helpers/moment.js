const moment = require("moment");

const CurrentDate = () =>{
    const currentDate = moment().format('MM/DD/YYYY');
    return currentDate;
}

module.exports = { CurrentDate };