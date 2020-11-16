// import * as functions from 'firebase-functions';
const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp();
interface emailData {
    email: string
}
exports.makeAdmin = functions.https.onCall( ( data: any, context: any) => {
    console.log(data, context);
    return admin.auth().getUserByEmail(data['email']).then( (user: any) => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then( () => {
        return {
            message: `You have been registered to use with the site`
        }
    }).catch( (err: object) => {
        return err
    })
    
})

exports.signInAdmin = functions.https.onCall( (data: any, context: any) => {
    console.log(data, context);
    return admin.auth().getUserByEmail(data['email']).then( (user: any) => {
        console.log(user);
        return user
    })
})