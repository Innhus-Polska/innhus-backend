const controller = require('../controllers/doctors');

export default function(app) {
    app.get('/api/doctors', controller.getAllDoctors);
    app.get('/api/doctors/form', controller.getDocumentDoctors);
    app.get('/api/doctors/:id', controller.getDoctor);
}
