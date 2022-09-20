const mailer = require('./mailer');

mailRecover = (data) => {
  console.log(data);
console.log(data.id);
id = data.id;
tok = data.token;
mailer.sendMail(
  {
    from: 'v3ryfr@gmail.com',
    to: 'v3ryfr@gmail.com',
    subject: 'This is a test email',
    text: 'Hello world',
    html: `<p>Hello <em>world</em></p><a href="http://localhost:5000/api/mail/${data.id}/${data.token}">ResetPassword</a>`,
  },
  (err, info) => {
    if (err) console.error(err);
    else console.log(info);
  }
);

}
module.exports = {
    mailRecover
  };