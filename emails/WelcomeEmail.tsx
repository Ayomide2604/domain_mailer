import {
	Html,
	Head,
	Preview,
	Body,
	Container,
	Section,
	Text,
	Img,
	Button,
} from "@react-email/components";

interface WelcomeEmailProps {
	name: string;
}

export const WelcomeEmail = ({ name }: { name: string }) => (
	<Html>
		<Head />
		<Preview>Welcome to Domain Mailer, {name}!</Preview>
		<Body style={main}>
			<Container style={container}>
				<Section style={logoSection}>
					{/* Uncomment and update the src to your logo */}
					{/* <Img
						src="https://yourdomain.com/images/logo.png"
						alt="Domain Mailer Logo"
						width="120"
						height="auto"
					/> */}
				</Section>
				<Section>
					<Text style={heading}>Welcome to Domain Mailer, {name}!</Text>
					<Text style={paragraph}>
						Thanks for signing up with Domain Mailer. We're thrilled to help you manage your domains and emails with ease.
					</Text>
					<Button style={button} href="https://yourdomain.com/dashboard">
						Go to your dashboard
					</Button>
					<Text style={paragraph}>
						Need help getting started? Check out our <a href="https://yourdomain.com/docs">documentation</a> or <a href="mailto:support@yourdomain.com">contact support</a>.
					</Text>
					<Text style={footer}>
						If you have any questions, just reply to this email—we’re always happy to help!
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: "Arial, sans-serif",
	padding: "40px 0",
};

const container = {
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
	margin: "0 auto",
	padding: "32px 24px",
	maxWidth: "480px",
};

const logoSection = {
	textAlign: "center" as const,
	marginBottom: "24px",
};

const heading = {
	fontSize: "22px",
	fontWeight: "bold" as const,
	marginBottom: "16px",
	color: "#222",
};

const paragraph = {
	fontSize: "16px",
	marginBottom: "24px",
	color: "#333",
};

const button = {
	backgroundColor: "#0070f3",
	color: "#fff",
	padding: "12px 24px",
	borderRadius: "6px",
	textDecoration: "none",
	fontWeight: "bold" as const,
	fontSize: "16px",
	border: "none",
	display: "inline-block",
	marginBottom: "24px",
};

const footer = {
	fontSize: "14px",
	color: "#888",
	marginTop: "32px",
	textAlign: "center" as const,
};
