const admin = require('firebase-admin');
const twilio = require('./twilio');

module.exports = function(req, res) {
  if(!req.body.phone) {
    return res.status(422).send({ error: "Phone number required"});
  }

  const phone = String(req.body.phone);

  admin.auth().getUserByPhoneNumber(phone)
    .then(userRecord => {
      const code = Math.floor((Math.random() * 8999 + 1000));

      twilio.messages.create({
        body: `Your code is ${code}`,
        to: phone,
        from: '<Your Private Twilio Number>'
      }, (err) => {
        if (err) { return res.status(422).send(err); }

        admin.database().ref('users/${phone}')
          .update({ code: code, codeValid: true }, () => {
            return res.send({ success: true });
          });
      })
    })
    .catch((err) => {
      return res.status(422).send({ error: err.response.data });
    });
}
