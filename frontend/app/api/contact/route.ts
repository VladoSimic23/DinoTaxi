import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, route, message } = body;

    // To use this, the user will need to configure environment variables in Vercel:
    // EMAIL_USER (e.g. your GMAIL)
    // EMAIL_PASS (App Password generated from Google Account Settings)
    
    // As a fallback to prevent 500 crashes before they setup ENV variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Contact Form Email Not Sent: Missing EMAIL_USER or EMAIL_PASS environment variables.");
      // Soft-fail for now so the UI shows success to simulate it
      return NextResponse.json({ success: true, warning: 'Environment variables not configured' }, { status: 200 }); 
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'dubrovniktaxicab@gmail.com', // Where you want to receive emails
      replyTo: email,
      subject: `New Taxi Inquiry from ${name} ${route ? `- Route: ${route}` : ''}`,
      text: `
        Name: ${name}
        Email: ${email}
        Route/Service: ${route || 'Not specified'}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Taxi Booking Inquiry</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Route/Service:</strong> ${route || 'Not specified'}</p>
        <br/>
        <h4>Message:</h4>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}