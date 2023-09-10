import type { IValidation } from "../types";

const FETCH_STATUS_OK = 200;

const onFetchValidation = (type: string, status: number | undefined): IValidation => {
    if (!status) return { gotError: false, message: null };

    const errorByType: { [index: string]: string } = {
        email: 'Debe ser un correo válido',
        password: 'Contraseña incorrecta',
        text: 'Nombre de usuario incorrecto',
        username: 'Nombre de usuario incorrecto',
        default: 'Lo sentimos ha ocurrido un error, por favor intenta de nuevo'
    }

    if (status === 404) {
        return {
            gotError: true,
            message: errorByType[type] ? errorByType[type] : errorByType.default,
        };
    };

    if (status && status >= 500) {
        return {
            gotError: true,
            message: errorByType.default,
        };
    };

    return { gotError: false, message: null };
}

const validateInput = (value: string = '', type: string, validationMethod: string, fetchStatus: number | undefined): IValidation => {
    switch (validationMethod) {
        case 'onFetchValidation':
            if (fetchStatus && fetchStatus === FETCH_STATUS_OK) return { gotError: false, message: null };

            return onFetchValidation(type, fetchStatus);
        default:
            return { gotError: false, message: null };
    }
};
export { onFetchValidation };
export default validateInput;