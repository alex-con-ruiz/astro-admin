import type { ButtonProps } from './types';
import Styles from './styles.module.scss';

const Button = ({ dispatchEvent, children, disabled }: ButtonProps): JSX.Element => {
    return (
        <button className={Styles.button} disabled={disabled}>
            {children}
        </button>);
};

export default Button;