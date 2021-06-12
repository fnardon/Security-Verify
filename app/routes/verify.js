module.exports = function (application) {

    application.get('/verify', function (req, res) {
        application.app.controllers.verify.verify(application, req, res);
    });

    application.get('/verify/token', function (req, res) {
        application.app.controllers.verify.token(application, req, res);
    });

    application.get('/verify/consent_id', function (req, res) {
        application.app.controllers.verify.consent_id(application, req, res);
    });


};