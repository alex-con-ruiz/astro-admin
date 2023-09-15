type dispatchEvent = () => void;

export type ButtonProps = {
    dispatchEvent: dispatchEvent;
    children: React.ReactNode | string;
    disabled?: boolean;
    fwidth?: boolean;
};