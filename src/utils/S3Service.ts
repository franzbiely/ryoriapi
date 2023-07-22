import { Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";

@Injectable()
export class S3Service {
    AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
    s3 = new AWS.S3
        ({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });

    async getFile(file) {
        try {
            return await this.s3.getSignedUrl('getObject', {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: file,
                Expires: 43200, //12 hours
            })
        }
        catch (e) {
            return false
        }
    }

    async uploadFile(file) {
        try {
            const { originalname } = file;

            return await this.s3_upload(file.buffer, this.AWS_S3_BUCKET, originalname, file.mimetype);
        }
        catch (e) {
            return false
        }
    }

    async s3_upload(file, bucket, name, mimetype) {

        const params =
        {
            Bucket: bucket,
            Key: String(name),
            Body: file,
            ContentType: mimetype,
            ContentDisposition: "inline",
            CreateBucketConfiguration:
            {
                LocationConstraint: "ap-south-1"
            }
        };

        try {
            const response = await this.s3.upload(params).promise();
            return response
        }
        catch (e) {
            console.log(e);
        }
    }
}