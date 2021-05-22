const controller = require('../controllers/appointment');

export default function(app) {
    app.get('/api/appointments', controller.getAllAppointments);
    app.get('/api/appointments/:id', controller.getAppointment);
    app.post('/api/appointments', controller.createAppointment);
    app.put('/api/appointments/:id', controller.editAppointment);
    app.delete('/api/appointments/:id', controller.deleteAppointment);
}