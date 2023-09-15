import { expect, test } from 'vitest';
import validateInput, { onFetchValidation } from './validations';

const textFieldTypes = ['email', 'password', 'text', 'username', 'default'];

test('onFetchValidation [status undefined]', () => {{
	const validations = textFieldTypes.map(type => onFetchValidation(type, undefined));
	validations.forEach(validation => {
		expect(validation).toEqual({gotError: false, message: null});
	});
}});

test('onFetchValidation [status 200]', () => {{
	const validations = textFieldTypes.map(type => onFetchValidation(type, 200));
	validations.forEach(validation => {
		expect(validation).toEqual({gotError: false, message: null});
	});
}});

test('onFetchValidation [status 404]', () => {{
	const validations = textFieldTypes.map(type => onFetchValidation(type, 404));
	const expetedErrors = [
		{gotError: true, message: 'Debe ser un correo válido'},
		{gotError: true, message: 'Contraseña incorrecta'},
		{gotError: true, message: 'Nombre de usuario incorrecto'},
		{gotError: true, message: 'Nombre de usuario incorrecto'},
		{gotError: true, message: 'Lo sentimos ha ocurrido un error, por favor intenta de nuevo'},
	];

	expect(validations).toEqual(expetedErrors);
}});

test('onFetchValidation [status 500]', () => {{
	const validations = textFieldTypes.map(type => onFetchValidation(type, 500));
	validations.forEach(validation => {
		expect(validation).toEqual({gotError: true, message: 'Lo sentimos ha ocurrido un error, por favor intenta de nuevo'});
	});
}});

test('validateInput [onFetchValidation]', () => {{
	const validationOK = validateInput('', 'email', 'onFetchValidation', 200);
	expect(validationOK).toEqual({gotError: false, message: null});

	const validationError = validateInput('', 'email', 'onFetchValidation', 404);
	expect(validationError).toEqual({gotError: true, message: 'Debe ser un correo válido'});

	const validationDefaultType = validateInput('', 'x', 'onFetchValidation', 404);
	expect(validationDefaultType).toEqual({gotError: true, message: 'Lo sentimos ha ocurrido un error, por favor intenta de nuevo'});
}});

test('validateInput [otherMethod]', () => {{
	const validation = validateInput('', 'email', 'otherMethod', 404);
	expect(validation).toEqual({gotError: false, message: null});
}});