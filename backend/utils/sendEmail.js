import nodemailer from 'nodemailer'

const sendEmail = async (to, subject, text) => {

    try {

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        const mailOption = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        }

        await transporter.sendMail(mailOption)

        console.log("Email sent successfully")

    } catch (error) {
        console.log("error in email sending", error)
    }
}

export default sendEmail