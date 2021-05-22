const googleAuth = require('google-auth-library');
const { Credentials } = require('google-auth-library/build/src/auth/credentials');

const scope = 'https://mail.google.com';

const credentials = {
    "web": {
        "client_id": "419770454666-jd8jqf9iqcjrcgvic0b13mg4tuoklucp.apps.googleusercontent.com",
        "project_id": "generated-wharf-313617",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_secret": "WsZ4ekWBcx4Xs8_Wuf8FlawG",
        "javascript_origins": [
            "https://app.widoknazdrowie.pl:60001",
            "https://app.widoknazdrowie.pl"
        ]
    }
};
const code = "4/0AY0e-g5Lw7wKQrjB4ggPP-R4UHlY6_LOxuXceZBQ_DhJOfbYvcqdwNkUR8zoSXT3lTqXWA";
exports.getUrl = (req, res) => {
/**    const oauth2Client = new googleAuth.OAuth2Client(
        credentials.web.client_id,
        credentials.web.client_secret,
        'https://app.widoknazdrowie.pl:60001/api/auth/google/redir'
    );
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
	    scope: scope
    });
    res.status(200).send({authUrl: authUrl}); **/
    const oauth2Client = new googleAuth.OAuth2Client(credentials.web.client_id, credentials.web.client_secret, "https://app.widoknazdrowie.pl:60001/api/auth/google/redir");
    oauth2Client.getToken(code, (err, token) => {
        if(err) return console.log(err);
        res.status(200).send({ token });
    });
}

exports.redirect = (req, res) => {
    res.status(200).send({request: req});
}


