import { Resend } from 'resend';

export const sendNewUserNotification = async (username: string, email: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    try {
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.NOTIFICATION_EMAIL || 'mirianfariasp@gmail.com',
            subject: 'New TravelShare registration',
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
        if (error) {
            console.error('Resend error:', JSON.stringify(error));
        } else {
            console.log('New user notification sent:', data);
        }
    } catch (error) {
        console.error('Error sending notification email:', JSON.stringify(error));
    }
};