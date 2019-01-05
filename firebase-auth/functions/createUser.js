const admin = require('firebase-admin');

module.exports = function(req, res) {
  //verify a phone was provided
  if (!req.body.phone) {
    res.status(422).send({ error: 'Phone Number is Required' });
  }
  //format phone to remove dashes and parens (regex matches all non digits)
  const phone = String(req.body.phone);
  //create a new user using the given number
  admin.auth().createUser({ phoneNumber: phone })
    .then(user => res.send(user))
    .catch(err => res.status(422).send({ error: err }));

}
