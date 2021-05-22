const controller = require('../controllers/nurses');

export default function(app) {
    app.get('/api/nurses', controller.getAllNurses);
    app.get('/api/nurses/form', controller.getDocumentNurses);
    app.get('/api/nurses/:id', controller.getNurse);
}
