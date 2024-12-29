"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleFileUpload = void 0;
const multer_1 = require("multer");
const path_1 = require("path");
const platform_express_1 = require("@nestjs/platform-express");
function MultipleFileUpload(fieldName, maxFiles = 10) {
    const dest = 'uploads/';
    return (0, platform_express_1.FilesInterceptor)(fieldName, maxFiles, {
        storage: (0, multer_1.diskStorage)({
            destination: dest,
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join("");
                return cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    });
}
exports.MultipleFileUpload = MultipleFileUpload;
//# sourceMappingURL=multi-upload.interceptor.js.map