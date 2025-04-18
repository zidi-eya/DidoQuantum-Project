import smtplib
from src.exceptions import BadGateway
from src.modules.email.config import config as MailConfig
from jinja2 import Environment, PackageLoader, select_autoescape
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.message import EmailMessage
class EmailService:
    env = Environment(
        loader=PackageLoader("src.modules.email"),
        autoescape=select_autoescape()
    )
    def send_email(self, recipient: str, subject: str, body: str, html: bool = False):
        with smtplib.SMTP(MailConfig.SMTP_HOST, MailConfig.SMTP_PORT) as server:
            if MailConfig.SMTP_TLS:
                server.starttls()

            if MailConfig.SMTP_USE_AUTHENTICATION:
                server.login(MailConfig.SMTP_USERNAME, MailConfig.SMTP_PASSWORD)

            # header = f"To: {recipient}\nFrom: {MailConfig.SMTP_SENDER_ADDRESS}\nSubject: {subject}\n\n"
            email = EmailMessage()
            email['Subject'] = subject
            email['From'] = MailConfig.SMTP_SENDER_ADDRESS
            email['To'] = recipient
            email.set_content(body, subtype="html" if html else "plain")

            try:
                server.send_message(email)
            except smtplib.SMTPSenderRefused:
                raise BadGateway()

    def get_template(self, template_name: str):
        return self.env.get_template(template_name) 

service: EmailService = EmailService()
