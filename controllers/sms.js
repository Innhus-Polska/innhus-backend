require('dotenv').config();
const axios = require('axios');

axios.defaults.headers.common = {
    Authorization: `Bearer ${process.env.SMS_API_KEY}`
}

exports.send = (req, res) => {
    axios.post('https://api.smsapi.pl/mfa/codes', {
        phone_number: `${req.body.phone_number}`,
        from: 'NZOZ Widok',
        content: 'Twój kod do weryfikacji konta: [%code%]',
        fast: true
    }).then((response) => {
      res.status(200).send({
        valid_code: response.data.code
      });
    }).catch((err) => {
        console.error(err.response.data);
    });
};

exports.verify = async (req, res) => {
    await axios.post('https://api.smsapi.pl/mfa/codes/verifications', {
        phone_number: req.body.phone_number,
        code: req.body.code
    }).then(response => {
        switch (response.status) {
        case 204:
            res.status(200).send({ error: false, message: 'Numer zweryfikowany' });
            break;
        case 404:
            res.status(400).send({ error: true, message: 'Niepoprawny kod SMS' });
            break;
        case 408:
            res.status(400).send({ error: true, message: 'Kod SMS wygasł' });
            break;
        }
    });
};
