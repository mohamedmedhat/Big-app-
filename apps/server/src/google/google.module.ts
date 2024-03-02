import { Module } from "@nestjs/common";
import { GoogleService } from "./google.service";
import { GoogleController } from "./google.controller";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'google'},)
    ],
    controllers: [GoogleController],
    providers: [GoogleService],
})

export class GoogleModule{}