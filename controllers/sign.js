const { db } = require('../models');
const User = db.user;

exports.sign = (req, res) => {
    User.update(
        {
            sign_data: req.body.sign_data
        }, {
        where: {
            uuid: req.body.sign_uuid
        }
    }
    ).then((response) => {
        if (response.sign_data !== '') {
            res.status(200).send({
                message: 'Update process finished.'
            });
        } else {
            res.status(500).send({
                message: 'Update process failed.'
            });
        }
    });
};

exports.getSignature = (req, res) => {
    User.findOne({
        where: {
            uuid: req.body.user_id
        }
    }).then((user) => {
        req.status(200).send({
            user_id: user.uuid,
            signature: user.sign_data
        });
    });
};
const choices = [
    {
        id: 1,
        title: 'Zapisuję dziecko poniżej 18 lat',
    },
    {
        id: 2,
        title: 'Jestem dzieckiem',
    },
    {
        id: 3,
        title: 'Zapisuję osobę ubezwłasnowolnioną',
    },
    {
        id: 4,
        title: 'Nie wybieram przedstawiciela ustawowego',
    },
];
exports.getChoices = (req, res, next) => {
    res.status(200).send(choices);
};

exports.getChoice = (req, res) => {
    const filtered = choices.filter((choice) => {
        return choice.id === req.params.id;
    });
    res.status(200).send(filtered[0]);
};

const reasons = [
    {
        id: 1,
        title:
            'okoliczność określona w art. 9 ust. 5 ustawy z dnia 27 października 2017 r. o podstawowej opiece zdrowotnej',
    },
    {
        id: 2,
        title: 'zmiana miejsca zamieszkania',
    },
    {
        id: 3,
        title:
            'zaprzestanie udzielania świadczeń opieki zdrowotnej przez wybranego świadczeniodawcę, lekarza podstawowej opieki zdrowotnej u wybranego świadczeniodawcy',
    },
    {
        id: 4,
        title:
            'osiągnięcie 18. roku życia przez świadczeniobiorcę, gdy lekarzem podstawowej opieki zdrowotnej jest lekarz posiadający specjalizację I lub II stopnia lub tytuł specjalisty w dziedzinie pediatrii',
    },
    {
        id: 5,
        title: 'z innych przyczyn powstałych po stronie świadczeniodawcy (podać jakich)',
    },
    {
        id: 6,
        title: 'inna okoliczność',
    },
];
exports.getReasons = (req, res, next) => {
    res.status(200).send(reasons);
};

exports.getReason = (req, res) => {
    const filtered = reasons.filter((reason) => {
        return reason.id === req.params.id;
    });
    res.status(200).send(filtered[0]);
}

const counts = [
    {
        id: 1,
        title: 'po raz pierwszy lub po raz drugi',
    },
    {
        id: 2,
        title: 'po raz trzeci i kolejny',
    },
];
exports.getChoiceCounts = (req, res, next) => {
    res.status(200).send(counts);
}

exports.getChoiceCount = (req, res) => {
    const filtered = counts.filter((count) => {
        return count.id === req.params.id;
    });
    res.status(200).send(filtered[0]);
};
