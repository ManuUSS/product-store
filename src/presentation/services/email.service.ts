import nodemailer, { type Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

export interface Attachment {
  filename: string;
  path: string;
}


export class EmailService {

  private transporter:Transporter;

  constructor(
    mailService: string,
    mailerEmail: string,
    key: string,
  ) {
    this.transporter = nodemailer.createTransport({
      service: mailService,
      auth: {
        user: mailerEmail,
        pass: key,
      },
    });
  }


  async sendEmail( options: SendMailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachments = [] } = options;

    try {

      const sentInformation = await this.transporter.sendMail( {
        to: to,
        subject: subject,
        html: htmlBody,
        attachments: attachments,
      });

      // console.log( sentInformation );

      return true;
    } catch ( error ) {
      return false;
    }

  }

}
