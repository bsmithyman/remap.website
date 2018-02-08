const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.remapUrl = functions.https.onRequest((request, response) => {
    var uid = request.originalUrl.split('/').pop();
    var ref = admin.firestore().collection('links').doc(uid);
    return ref.get().then(doc => {
        if (!doc.exists) {
            console.log('Document not found: ', request.originalUrl);
            return response.sendStatus(404);
        } else {
            var data = doc.data();
            console.log('Redirecting to: ', data.url);
            return response.redirect(data.url);
        }
    }).catch(err => {
        console.log('Error getting document ', err);
        return response.sendStatus(404);
    });
});
