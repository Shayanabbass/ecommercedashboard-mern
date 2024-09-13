const nodemailer=require('nodemailer');

const transporter=nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'shayanabbas20081@gmail.com',
        pass:''
    }
});

const sendmail=async(to,subject,text)=>{
    try {
        transporter.sendMail({
            from:'shayanabbas20081@gmail.com',
            to,
            subject,
            text


        });
    } catch (error) {
        console.log('error sending mail',error.message);
        
    }

}

module.exports=sendmail;
