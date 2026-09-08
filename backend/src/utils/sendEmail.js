import { Resend } from "resend";

const sendEmail = async (to, subject, html) => {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html,
        });

        console.log("RESEND DATA:", data);
        console.log("RESEND ERROR:", error);

        if (error) {
            throw new Error(error.message);
        }

        console.log("Email Sent Successfully");

        return data;

    } catch (error) {
        console.log("Email Sending Failed:", error);
        throw new Error("Email Sending Failed");
    }
};

export default sendEmail;