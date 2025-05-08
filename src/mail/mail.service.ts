import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Patient } from '../patients/models/patient.model';


@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(patient:Patient){
        const url = `${process.env.API_URL}/api/patients/activate/${patient.activation_link}`;
        console.log(url);
        console.log(patient.email);
        

        await this.mailerService.sendMail({
          to: patient.email,
          subject: "Welcome to app",
          template: "./confirmation",
          context: {
            name: patient.full_name,
            url,
          },
        });
        
    }
}
