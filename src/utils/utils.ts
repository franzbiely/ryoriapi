import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class Utils {
    async pushWhenNew(object, element): Promise<any> {
        const exists = object.some(ele => 
            ele._id ? 
                ele._id.equals(element._id) : 
                ele.equals(element)
            )
        if(!exists) {
            object.push(element)
        }
        return object
    }
}