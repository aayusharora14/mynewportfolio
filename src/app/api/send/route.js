import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend('re_S4w7Pm1J_9oNvGUFv6HfQUnrEc6QFZ6Jg');
const fromEmail = process.env.FROM_EMAIL;

export async function POST(req, res) {
    const { email, subject, message } = await req.json();
    console.log(email, subject, message);
    try {
        const data = await resend.emails.send({
            from: fromEmail,
            to: ['sshashwat272@gmail.com', email],
            subject: subject,
            react: (
                <>
                    <h1>{subject}</h1>
                    <p>Thank you for contacting us!</p>
                    <p>New message submitted:</p>
                    <p>{message}</p>
                </>
            ),
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error });
    }
}