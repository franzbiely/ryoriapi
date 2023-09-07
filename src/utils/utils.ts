import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class Utils {
    async pushWhenNew(object, element): Promise<any> {
        const exists = object.some(ele => ele._id.equals(element._id))
        if(!exists) {
            object.push(element)
        }
        console.log({exists, object})
        return object
    }
}