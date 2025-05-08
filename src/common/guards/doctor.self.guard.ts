import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SelfDoctorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const paramId = parseInt(req.params.id);
    if (
      !req.user ||
      req.user.role !== "doctor" ||
      isNaN(paramId) ||
      req.user.id !== paramId
    ) {
      throw new ForbiddenException({
        message: "Faqat o‘z profilingizga kirish mumkin",
      });
    }

    return true;
  }
}
