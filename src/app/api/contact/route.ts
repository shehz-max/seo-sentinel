import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // --- EMAIL SENDING LOGIC ---
        // User needs to configure these environment variables:
        // EMAIL_USER=your-email@gmail.com
        // EMAIL_PASS=your-app-password

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_TO || "hyspam6@gmail.com",
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
                html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
                    <div style="background-color: #0F172A; padding: 20px; color: white;">
                        <h2 style="margin: 0;">New Contact Message</h2>
                    </div>
                    <div style="padding: 20px; color: #1e293b; line-height: 1.6;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        <div style="margin-top: 20px; padding: 15px; background-color: #f8fafc; border-radius: 6px;">
                            <p style="margin:0; font-weight: bold; color: #64748b;">Message:</p>
                            <p style="margin-top: 10px;">${message.replace(/\n/g, '<br>')}</p>
                        </div>
                    </div>
                    <div style="background-color: #f1f5f9; padding: 15px; text-align: center; color: #94a3b8; font-size: 12px;">
                        This email was sent from the Free Spams Check contact form.
                    </div>
                </div>
            `,
            });
            console.log("Email sent successfully via Nodemailer");
        } else {
            // Fallback for development/demo if no credentials
            console.log("--- MOCK EMAIL SENT ---");
            console.log(`To: hyspam6@gmail.com`);
            console.log(`From: ${name} <${email}>`);
            console.log(`Message: ${message}`);
            console.log("-----------------------");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
