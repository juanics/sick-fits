//create a transport that hooks up to a smtp

import { createTransport, getTestMessageUrl } from 'nodemailer';

export interface MailResponse {
	accepted?: string[] | null;
	rejected?: null[] | null;
	envelopeTime: number;
	messageTime: number;
	messageSize: number;
	response: string;
	envelope: Envelope;
	messageId: string;
}
export interface Envelope {
	from: string;
	to?: string[] | null;
}

const transport = createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

const makeEmail = (text: string) => {
	return `
      <div style="
         border: 1px solid black;
         padding: 20px;
         font-family: sans-serif;
         line-height: 2;
         font-siez: 20px;
      ">
         <h2>hello there!</h2>
         <p>${text}</p>
      </div>
   `;
};

export async function sendPasswordResetEmail(resetToken: string, to: string): Promise<void> {
	const info = (await transport.sendMail({
		to,
		from: 'text@example.com',
		subject: 'Your password reset token',
		html: makeEmail(`Your password reset token is here
         <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
      `),
	})) as MailResponse;
	if (process.env.MAIL_USER.includes('ethereal.email')) {
		console.log(`Messagge sent Preview it at ${getTestMessageUrl(info)}`);
	}
}
