import HttpCodes from "http-status-codes";

export class SharedErrors {

    //HTTP ERRORS
    static get InternalServerError(){
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            message: 'InternalServerError'
        }
    }

    static get BadRequest() {
      return {
          code: HttpCodes.BAD_REQUEST,
          message: 'BadRequest'
      };
  }

  static get Unauthorized() {
      return {
          code: HttpCodes.UNAUTHORIZED,
          message: 'Unauthorized'
      };
  }

  static get Forbidden() {
      return {
          code: HttpCodes.FORBIDDEN,
          message: 'Forbidden'
      };
  }

  static get NotFound() {
      return {
          code: HttpCodes.NOT_FOUND,
          message: 'NotFound'
      };
  }

  static get Conflict() {
      return {
          code: HttpCodes.CONFLICT,
          message: 'Conflict'
      };
  }

  static get UnprocessableEntity() {
      return {
          code: HttpCodes.UNPROCESSABLE_ENTITY,
          message: 'UnprocessableEntity'
      };
  }

  static get ServiceUnavailable() {
      return {
          code: HttpCodes.SERVICE_UNAVAILABLE,
          message: 'ServiceUnavailable'
      };
  }



    //COMMON ERRORS
    static get InvalidEmailFormat() {
        return {
            code: HttpCodes.BAD_GATEWAY,
            message: "Invalid email format"
        }
    }

    static get InvalidNameFormat() {
        return {
            code: HttpCodes.BAD_GATEWAY,
            message: "Invalid name format"
        }
    }

    static get ErrorUploadImage(){
        return {
            code: HttpCodes.INTERNAL_SERVER_ERROR,
            message: 'InternalServerError'
        };
    }

    static get WrongFileType(){
        return {
            code: HttpCodes.BAD_GATEWAY,
            message: 'Please upload an image file'
        };
    }

    static get UserNotFound(){
        return {
            code: HttpCodes.NOT_FOUND,
            message: 'User Not Found'
        };
    }

    static get ImageNotFound(){
        return {
            code: HttpCodes.NOT_FOUND,
            message: 'Image Not Found'
        };
    }

    static get EmailAlreadyExists(){
        return {
            code: HttpCodes.NOT_FOUND,
            message: 'Email Already Exists'
        }
    }

    static get UserAlreadyExists(){
      return {
          code: HttpCodes.NOT_FOUND,
          message: 'User Already Exists'
      }
    }


    static get InvalidCreadintial(){
      return {
          code: HttpCodes.NOT_FOUND,
          message: 'Invalid credentials'
      }
    }
}
