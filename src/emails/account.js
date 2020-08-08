const sgMail = require('@sendgrid/mail')
const apiKey  ='';

sgMail.setApiKey(apiKey);

const sendWelcomeMail = (mail,name) =>{

    sgMail.send({
        to: mail,
        from: 'sasikumar.balasubramanian92@gmail.com',
        subject: 'Thanks for joining in!!',
        text: `Welcome to the app,${name} let me know how you get along with the app...` 
    })
}

const cancellationMail = (mail,name)=>{

    sgMail.send({
        to: mail,
        from: 'sasikumar.balasubramanian92@gmail.com',
        subject: 'Cancellation Mail!!',
        text: `Thanks to be a part of our family,${name} Please be in touch...` 
    })

}

module.exports = {
    sendWelcomeMail,
    cancellationMail
}
