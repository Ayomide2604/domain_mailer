import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generic function to send any email template with any props.
 *
 * @param from - Sender email (e.g. 'Acme <admin@domain.com>')
 * @param to - Recipient(s), single email or array of emails
 * @param subject - Email subject
 * @param EmailComponent - React email template/component
 * @param props - All other props required by the email template
 *
 * Usage:
 *   await sendEmail({
 *     from: 'Acme <admin@domain.com>',
 *     to: ['user@example.com'],
 *     subject: 'Welcome!',
 *     EmailComponent: WelcomeEmail,
 *     name: 'John',
 *     ...otherTemplateProps
 *   })
 */
export async function sendEmail<TemplateProps extends Record<string, unknown>>(
	args: {
		from: string;
		to: string | string[];
		subject: string;
		EmailComponent: (props: TemplateProps) => React.ReactElement;
	} & TemplateProps
) {
	const { from, to, subject, EmailComponent, ...templateProps } = args;
	try {
		const { data, error } = await resend.emails.send({
			from,
			to: Array.isArray(to) ? to : [to],
			subject,
			react: EmailComponent(templateProps as unknown as TemplateProps),
			replyTo: "theolowuayo@gmail.com",
		});
		if (error) {
			return { error };
		}
		return { data };
	} catch (error) {
		return { error };
	}
}

// Example usage (can be removed or kept as reference):
// await sendEmail({
//   from: 'Acme <admin@chicagocrane.services>',
//   to: ['iamharyo@gmail.com'],
//   subject: 'Hello world',
//   EmailComponent: WelcomeEmail,
//   name: 'John', // <-- props specific to WelcomeEmail
// })
