import { useEffect, useState } from 'react';
import Styles from './styles.module.scss';
import validateInput from './utils/validations';
import type { TextFieldProps } from './types';

/**
 * @component
 * Custom input component for more details look readme.
 * @param {Object} props - props
 * @param {string} props.type - Input type.
 * @param {string} props.name - Input name.
 * @param {string} props.placeholder - Input placeholder.
 * @param {function} props.eventDispatch - Function to dispatch input value.
 * @param {string} props.behavior - Input behavior ('onBlur', 'onFocus', 'onChange').
 * @param {string} props.disabled - Input disabled status.
 * @param {object} props.validationMethod - Validation method type -> ValidationMethod.
 * @returns {JSX.Element}
 * 
 * @example
 * <TextField
        type='text'
        name='username'
        placeholder='Usuario'
        eventDispatch={inputHandler}
        validationMethod={userFetchStatus}
        disabled={false}
        behavior='onBlur'
    />
 */
const TextField = ({ type, name, placeholder, eventDispatch, behavior = 'onBlur', disabled = false, validationMethod }: TextFieldProps) => {
	// States
	const [inputErrors, setInputErrors] = useState(false);
	const [helperMessage, setHelperMessage] = useState('');

	// Styles
	let classNames = `${Styles.inputBase}`;
	// Errors styles
	classNames = inputErrors ? `${classNames} ${Styles['--helperOn']} ${Styles['--inputError']}` : classNames;
	// Disabled styles
	classNames = disabled ? `${classNames} ${Styles['--disabled']}` : classNames;

	// Options
	const hasAutoComplete = type === 'text' ? 'on' : 'off';

	// Handlers
	const validatorHandler = (value: string = ''): void => {
		const { gotError, message } = validateInput(value, type, validationMethod.method, validationMethod.status);
		if (gotError) {
			setInputErrors(true);
			setHelperMessage(`- Error: ${message}`);
			return;
		}

		setInputErrors(false);
	};

	const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = e.target;

		// For fetch only
		if (validationMethod.method === 'onFetchValidation' && validationMethod.status !== 200) {
			eventDispatch(value, name);
			return;
		} else {
			validatorHandler(value);

			if (!inputErrors) {
				eventDispatch(value, type);
			}
		}
	};

	// Effects
	useEffect(() => { validatorHandler(); }, [validationMethod]);

	return (
		<>
			{/* {false ? <label>{placeholder}:</label> : null} */}
			<input
				className={classNames}
				type={type}
				name={name}
				autoComplete={hasAutoComplete}
				placeholder={placeholder}
				{... { [`${behavior}`]: inputHandler }}
				alt={placeholder}
				disabled={disabled}
				aria-label={placeholder}
			/>
			{inputErrors && <span className={Styles.helper}>{helperMessage}</span>}
		</>
	);
};

export default TextField;