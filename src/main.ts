import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
// somewhere in your initialization file

async function bootstrap() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, { logger: false });
    app.useGlobalPipes(
      new ValidationPipe()
    );
    app.setGlobalPrefix("api");

    app.enableCors({
      origin: (origin, callback) => {
        const allowOrigin = [
          "http://localhost:8000",
          "http://localhost:3000",
        ];
        if (!origin || allowOrigin.includes(origin)) {
          callback(null, true);
        } else {
          callback(new BadRequestException("Not allow Cors"));
        }
      },
      methods: "GET,PUT,PATCH,POST,DELETE",
      credentials: true,
    });

    const config = new DocumentBuilder()
      .setTitle("Private Clinic project")
      .setDescription("Private Clinic REST API")
      .setVersion("1.0")
      .addTag("Nestjs", "Validation")
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api/docs", app, document);
    app.use(cookieParser());
    await app.listen(PORT, () => {
      console.log(`ishladikuuuu ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
