import type { ButtonProps } from './types';
import Styles from './styles.module.scss';

const Button = ({ dispatchEvent, children, disabled, fwidth }: ButtonProps): JSX.Element => {
	// Styles
	let classNames = Styles.button;
	if (fwidth) classNames = `${classNames} ${Styles.fullWidthButton}`;

	//  Methods
	const dispatchEventHandler = () => {
		dispatchEvent();
	};

	return (
		<button
			className={classNames}
			disabled={disabled}
			onClick={() => dispatchEventHandler()}
		>
			{children}
		</button>);
};

export default Button;