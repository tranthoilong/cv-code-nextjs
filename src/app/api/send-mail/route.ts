import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.NEXT_PUBLIC_MAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_MAIL_FROM,
      to: process.env.NEXT_PUBLIC_MAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: #0A192F;
                color: white;
                padding: 20px;
                border-radius: 5px;
                margin-bottom: 20px;
              }
              .content {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 5px;
                border: 1px solid #ddd;
              }
              .field {
                margin-bottom: 15px;
              }
              .label {
                font-weight: bold;
                color: #0A192F;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <p>${name}</p>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <p>${email}</p>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <p>${message}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    const confirmationMailOptions = {
      from: `"Trần Thới Long" <${process.env.NEXT_PUBLIC_MAIL_FROM}>`,
      to: email,
      subject: 'Thank you for your message',
      text: `
        Dear ${name},

        Thank you for contacting us. We have received your message and will get back to you soon.

        Best regards,
        Trần Thới Long
      `,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                background-color: #f8f9fa;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background: linear-gradient(135deg, #0A192F 0%, #172A45 100%);
                color: #64FFDA;
                padding: 30px;
                text-align: center;
              }
              .content {
                padding: 30px;
                color: #333;
              }
              .signature {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eaeaea;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2 style="margin:0;font-size:24px;">Thank you for your message</h2>
              </div>
              <div class="content">
                <p>Dear ${name},</p>
                <p>Thank you for contacting us. We have received your message and will get back to you soon.</p>
                <div class="signature">
                  <p>Best regards,<br>Trần Thới Long</p>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      headers: {
        'X-No-Relay': 'true',
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
        'From': `"Trần Thới Long" <${process.env.NEXT_PUBLIC_MAIL_FROM}>`
      }
    };

    await transporter.sendMail(confirmationMailOptions);

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
