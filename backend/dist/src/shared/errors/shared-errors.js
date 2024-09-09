"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedErrors = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
class SharedErrors {
    //HTTP ERRORS
    static get InternalServerError() {
        return {
            code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
            message: 'InternalServerError'
        };
    }
    static get BadRequest() {
        return {
            code: http_status_codes_1.default.BAD_REQUEST,
            message: 'BadRequest'
        };
    }
    static get Unauthorized() {
        return {
            code: http_status_codes_1.default.UNAUTHORIZED,
            message: 'Unauthorized'
        };
    }
    static get Forbidden() {
        return {
            code: http_status_codes_1.default.FORBIDDEN,
            message: 'Forbidden'
        };
    }
    static get NotFound() {
        return {
            code: http_status_codes_1.default.NOT_FOUND,
            message: 'NotFound'
        };
    }
    static get Conflict() {
        return {
            code: http_status_codes_1.default.CONFLICT,
            message: 'Conflict'
        };
    }
    static get UnprocessableEntity() {
        return {
            code: http_status_codes_1.default.UNPROCESSABLE_ENTITY,
            message: 'UnprocessableEntity'
        };
    }
    static get ServiceUnavailable() {
        return {
            code: http_status_codes_1.default.SERVICE_UNAVAILABLE,
            message: 'ServiceUnavailable'
        };
    }
    //COMMON ERRORS
    static get InvalidEmailFormat() {
        return {
            code: http_status_codes_1.default.BAD_GATEWAY,
            message: "Invalid email format"
        };
    }
    static get InvalidNameFormat() {
        return {
            code: http_status_codes_1.default.BAD_GATEWAY,
            message: "Invalid name format"
        };
    }
    static get ErrorUploadImage() {
        return {
            code: http_status_codes_1.default.INTERNAL_SERVER_ERROR,
            message: 'InternalServerError'
        };
    }
    static get WrongFileType() {
        return {
            code: http_status_codes_1.default.BAD_GATEWAY,
            message: 'Please upload an image file'
        };
    }
    static get UserNotFound() {
        return {
            code: http_status_codes_1.default.NOT_FOUND,
            message: 'User Not Found'
        };
    }
    static get ImageNotFound() {
        return {
            code: http_status_codes_1.default.NOT_FOUND,
            message: 'Image Not Found'
        };
    }
    static get EmailAlreadyExists() {
        return {
            code: http_status_codes_1.default.NOT_FOUND,
            message: 'Email Already Exists'
        };
    }
    static get UserAlreadyExists() {
        return {
            code: http_status_codes_1.default.NOT_FOUND,
            message: 'User Already Exists'
        };
    }
    static get InvalidCreadintial() {
        return {
            code: http_status_codes_1.default.NOT_FOUND,
            message: 'Invalid credentials'
        };
    }
}
exports.SharedErrors = SharedErrors;
