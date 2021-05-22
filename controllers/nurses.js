const nurses = [
    {
        id: 'e9ff723c-1ad7-4b7c-8e82-3206ccfb230e',
        name: 'Marta Żurowska',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: 'dc14c654-5dca-47a3-ad02-5e640940f8ca',
        name: 'Dorota Miodek',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '62387432-5cb1-4bda-b13d-8d8750fc122b',
        name: 'Anna Jajkiewicz',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '6e0a2f98-2e72-461e-a7f0-3c3ccd8c5a8d',
        name: 'Anna Nawrocka',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '202f7aa7-1b86-49f5-a49d-6694efe3928a',
        name: 'Urszula Wojciechowska',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    }
];
exports.getAllNurses = (req, res) => {
    res.status(200).send(nurses);
};

exports.getNurse = (req, res) => {
    const filtered = nurses.filter((nurse) => {
        return nurse.id === req.params.id;
    })
    res.status(200).send(
        filtered[0]
    );
};

exports.getDocumentNurses = (req, res) => {
    res.status(200).send([nurses[0], nurses[1]]);
};
