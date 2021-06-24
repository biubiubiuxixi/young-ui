/*
 * @Descripttion: 
 * @Author: chelsea.jiang
 * @Date: 2021-05-27 21:27:33
 * @LastEditors: chelsea.jiang
 * @LastEditTime: 2021-05-28 22:34:17
 */
import React from "react";
import classNames from 'classnames';

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

interface BaseButtonProps {
    children: React.ReactNode;
    size?: ButtonSize;
    buttonType?: ButtonType;
    className?: string;
    href?: string,
    disabled?: boolean;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>; // 按钮 &交叉类型
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>; // a链接
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>; // Partial 属性可选

const Button: React.FC<ButtonProps> = (props) => {
    const {
        children,
        className,
        size,
        buttonType,
        disabled,
        href,
        ...restProps
    } = props;
    const classes = classNames('btn', className, {
        [`btn-${size}`]: size,
        [`btn-${buttonType}`]: buttonType,
        disabled: (buttonType === ButtonType.Link) && disabled
    });
    if (buttonType === ButtonType.Link && href) {
        return (
            <a
                href={href}
                className={classes}
                {...restProps}
            >
                {children}
            </a>
        );
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        );
    }
}
export default Button;
Button.defaultProps = {
    disabled: false,
    buttonType: ButtonType.Default,
}