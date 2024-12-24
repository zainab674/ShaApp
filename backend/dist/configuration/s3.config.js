"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Config = void 0;
const AWS = require("aws-sdk");
const dotenv = require("dotenv");
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
exports.s3Config = {
    s3: new AWS.S3({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }),
    bucketName: process.env.BUCKET_NAME,
};
//# sourceMappingURL=s3.config.js.map