import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class IsDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    if (!req.user || req.user.role !== "doctor") {
      throw new ForbiddenException({
        message: "Faqat doktorlar uchun ruxsat berilgan",
      });
    }

    return true;
  }
}
