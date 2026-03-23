import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, route, message } = body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dubrovniktaxicab@gmail.com',
        pass: 'gxulmizarcipfalb',
      },
    });

    const mailOptions = {
      from: 'dubrovniktaxicab@gmail.com',
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