export class HttpException extends Error {
    code;
    message;
    constructor(code, message) {
        super(message);
        this.code = code;
        this.message = message;
    }
}
export class NotFoundException extends HttpException {
    constructor(message = 'Not found') {
        super(404, message);
    }
}
//# sourceMappingURL=http-exceptions.js.map