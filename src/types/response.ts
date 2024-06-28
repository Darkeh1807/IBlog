//Custom response

class IResponse {
    readonly status: string;
    readonly message: string;
    readonly data?: string;
    readonly token?: string;

    constructor(status: string, message: string, data?: any, token?: string) {
        this.status = status;
        this.message = message;
        this.data = data
        this.token = token;
    }
}


export default IResponse;