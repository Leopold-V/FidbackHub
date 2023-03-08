import { ReactNode } from 'react';
type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};
export declare const Button: ({ onClick, disabled, children, className, type, }: ButtonProps) => JSX.Element;
export {};
