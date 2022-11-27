import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UserDto } from "src/dto/user.dto";

@Injectable()
export class EmailSender {
  private logger = new Logger(EmailSender.name);
  constructor(
    @Inject(ConfigService) private configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  sendPasswordEmail(email: string, password: string): void {
    const emailFrom = this.configService.get<string>('email.from');
    console.log(emailFrom);
    console.log(this.configService.get<string>('email.user'));
    console.log(this.configService.get<string>('email.pass'));
    this.mailerService
      .sendMail({
        from: `populmap <${emailFrom}>`,
        to: email,
        subject: '[populmap] 비밀번호 임시 발급 안내',
        template: `./find.password.hbs`,
        context: { password },
      })
      .then((success) => {
        this.logger.log(`Send mail to ${email} success!`);
        this.logger.log(`${email} : ${new Date()} : ${success.response}`);
      })
      .catch((e) => {
        this.logger.error(`Send mail to ${email} failed.. 🥺 ${e}`);
        this.logger.error(`${email} : ${new Date()} : ${e}`);
      });
  }
}
