import { useEffect, type ReactElement, useState } from 'react';
import { map } from 'nanostores';
import { useStore } from '@nanostores/react';
// import Cookies from 'universal-cookie';
import Styles from './styles.module.scss';
import TextField from '@components/react/textField';
import type { ValidationMethod } from '@components/react/textField/types';
import Button from '@components/react/button';

const inputValues = map<Record<string, string>>({
	username: '',
	password: ''
});

const LoginForm = (): ReactElement => {
	const storeEntries = useStore(inputValues);
	const [userFetchStatus, setUserFetchStatus] = useState<ValidationMethod>({
		method: 'onFetchValidation',
		status: undefined
	});

	const [passwordFetchStatus, setPasswordFetchStatus] = useState<ValidationMethod>({
		method: 'onFetchValidation',
		status: undefined
	});

	// handlers
	const inputHandler = (value: string, name: string): void => {
		const values = inputValues.get();
		inputValues.set({ ...values, [name]: value });
	};

	const handleLoginFrom = () => {
		console.log('xxx');

		/* const cookies = new Cookies(null, { path: '/admin' });
        cookies.set('auth', 'true', { maxAge: 60 });
        const form = document.getElementById('login-form');
        const anchor = document.createElement('a');
        anchor.href = '/admin/dashboard';
        anchor.id = 'redirect-on-login';
        form?.appendChild(anchor);
        document.getElementById('redirect-on-login')?.click(); */

		console.log(inputValues.get());
	};

	// effects
	useEffect(() => {
		if (storeEntries.username.length > 0) {
			setTimeout(() => {
				setUserFetchStatus({ ...userFetchStatus, status: 200 });
			}, 1500);
		}

		if (userFetchStatus && storeEntries.password.length > 0) {
			setTimeout(() => {
				setPasswordFetchStatus({ ...passwordFetchStatus, status: 404 });
			}, 1500);
		}
	}, [storeEntries]);

	return (
		<>
			<form className={Styles.form}>
				<TextField
					type='text'
					name='username'
					placeholder='Usuario'
					eventDispatch={inputHandler}
					validationMethod={userFetchStatus}
					behavior='onBlur'
				/>

				<TextField
					type='password'
					name='password'
					placeholder='Contraseña'
					eventDispatch={inputHandler}
					validationMethod={passwordFetchStatus}
					disabled={userFetchStatus.status === undefined || userFetchStatus.status !== 200}
					behavior='onBlur'
				/>
			</form>
			<Button
				dispatchEvent={handleLoginFrom}
				fwidth
			>
                Ingresar
			</Button>
		</>
	);
};

export default LoginForm;