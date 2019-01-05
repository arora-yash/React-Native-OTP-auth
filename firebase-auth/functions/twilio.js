const twilio = require('twilio');

const accountSid = '<your account sid>';
const authToken = '<your auth Token>';

module.exports = new twilio.Twilio(accountSid, authToken);
