export interface Mensaje {
    message: string;
    respuesta: number;
    code: number;

    user?: { 
        id: number;
        name: string;
        email: string;
        role:string
    };
}
