import { Injectable } from "@nestjs/common";


@Injectable()
export class GoogleService{

    async googleLogIn(req: any){
        if(!req){
            return 'No User from Google';
        }
        return {
            msg: 'User info from Google',
            user: req.user
        }
    }
}