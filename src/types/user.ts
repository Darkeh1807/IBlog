export interface IUserSchema {
    name: string,
    email: string,
    password: string,
    role: string,
}

export interface ICreateUserInput {
    name: string,
    email: string,
    password: string,
    role: string
}


export interface ISignUserInput{
    email:string,
    password:string
}


