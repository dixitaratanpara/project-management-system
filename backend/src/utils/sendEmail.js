import { Resend } from "resend";

const sendEmail= async(to, subject, html)=>{

    const resend = new Resend(process.env.RESEND_API_KEY);

    try{
        await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html,
        });
         console.log("Email Sent Successfully");
    } catch (error) {
     console.log(error);
        throw new Error("Email Sending Failed");
    }
};

export default sendEmail;