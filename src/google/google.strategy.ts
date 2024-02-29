import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy,VerifyCallback} from 'passport-google-oauth20';



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL : process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
            scope: ['email' , 'profile']
        })
    }

    async validate(request: any,accesstoken: string, refreshtoken: string, profile: any, done: VerifyCallback){
        const {name, email, photos} = profile;
        const user = {
            email: email[0].value,
            firstName: name.giveName,
            lastName: name.familyName,
            picture: photos[0].value,
            accesstoken
        }
        await done(null, user);
    }
}