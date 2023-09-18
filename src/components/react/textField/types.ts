/**
 * @description IValidation result type a common object to resolve validation styles
 */
export type IValidation = {
    gotError: boolean;
    message: string | null;
}

/**
 * @description Validation method type
 * mehtod - name of the method to be called for validation
 * @example
 *  method: 'onFetchValidation' // wait for fetch status
 *  method: 'onlyDigits' // will check only digits
 *  method: 'lowercase' // will check if all characters are lowercase
 *  method: 'uppercase' // will check if all characters are uppercase
 */
export type ValidationMethod = {
    method: string;
    status?: number | undefined;
}

/**
 * @description TextField props type
 * @param {string} type - Input type.
 * @param {string} name - Input name.
 * @param {string} placeholder - Input placeholder.
 * @param {function} eventDispatch - Function to dispatch input value.
 * @param {string} behavior - Input behavior ('onBlur', 'onFocus', 'onChange').
 * @param {boolean} disabled - Input disabled flag.
 * @param {object} validationMethod - Type: {@link ValidationMethod}.
 */
export type TextFieldProps = {
    type: string;
    name: string;
    placeholder: string;
    behavior?: string;
    eventDispatch: (value: string, type: string) => void;
    disabled?: boolean;
    validationMethod: ValidationMethod
}
