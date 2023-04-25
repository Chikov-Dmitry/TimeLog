export interface ICreateUserRequestDto {
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    password: string;
    deviceId: string
}