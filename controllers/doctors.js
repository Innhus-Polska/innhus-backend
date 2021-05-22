const doctors = [
    {
        id: '1d40c903-4ddd-4e1b-b83e-4603672d4101',
        name: 'Anna Maluty',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '3c7dab58-bd9b-4403-8640-f2d7b39b18d6',
        name: 'Janina Kantor-Włodarczyk',
        category: 'Pediatra',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: 'd0312692-85f0-43d5-b985-82484661a507',
        name: 'Ana Rincon Espinoza',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '6f38c443-4846-4f90-8e75-154a820b744d',
        name: 'Danuta Pogorzelska-Kokoszka',
        category: 'Pediatra',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '16c61ef8-ef70-4fcc-86c2-02103a92150a',
        name: 'Aleksandra Dulęba',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: 'ae188ffa-7134-4114-b3d8-776f5451cd2f',
        name: 'Krzysztof Rembiasz',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '95bf1ba4-62a9-4076-ab09-bc5aa7fbd840',
        name: 'Aleksandra Biesiada',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: 'c7d01983-4bc9-433c-a516-5cd02c94aa8d',
        name: 'Piotr Lenik',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    },
    {
        id: '8c4d8a7d-e1ed-413d-8522-531e67643681',
        name: 'Jarosław Kiecana',
        category: '',
        img: 'https://via.placeholder.com/150x150',
    }
];

exports.getAllDoctors = (req, res) => {
    res.status(200).send(doctors);
};

exports.getDoctor = (req, res) => {
    const filtered = doctors.filter((doctor) => {
        return doctor.id === req.params.id;
    })
    res.status(200).send(
        filtered[0]
    );
};

exports.getDocumentDoctors = (req, res) => {
    res.status(200).send([doctors[1], doctors[2]]);
};
