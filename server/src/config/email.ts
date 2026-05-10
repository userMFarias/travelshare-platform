import * as nodemailer from 'nodemailer';

export const sendNewUserNotification = async (username: string, email: string) => {
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.NOTIFICATION_EMAIL,
            subject: '🌍 New TravelShare registration',
            html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
                    <h2 style="color: #4f46e5;">New user registered on TravelShare</h2>
                    <p><strong>Username:</strong> ${username}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
                    <hr>
                    <p style="color: #64748b; font-size: 12px;">TravelShare notification system</p>
                </div>
            `
        });
        console.log('New user notification sent');
    } catch (error) {
        console.error('Error sending notification email:', error);
    }
};