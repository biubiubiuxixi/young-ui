/*
 * @Descripttion: 
 * @Author: chelsea.jiang
 * @Date: 2021-05-28 22:57:51
 * @LastEditors: chelsea.jiang
 * @LastEditTime: 2021-05-28 23:00:18
 */

import React, {useState} from "react";
import classNames from "classnames";

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning'
}

interface AlertProps {
    className?: string;
    type?: AlertType;
    title?: string;
    content: string;
    closable?: boolean; // 是否显示关闭按钮
    closeText?: React.ReactNode;
}

const Alert: React.FC<AlertProps> = (props) => {
    const { className, type, title, content, closable, closeText, ...restProps } = props;
    const [closed, setClosed] = useState(false); // 是否显示
    const classes = classNames('alert', className, {
        [`alert-${type}`]: type,
    });
    const renderCloseButton = () => {
        return closable ? '关闭' : null;
    }
    if (closed) return null;
    return (
        <div
            role="alert"
            className={classes}
            {...restProps}
        >
            <div className="alert-content-box">
                {title && <div className="alert-title">{title}</div>}
                {content && <div className="alert-content">{content}</div>}
            </div>
            <button className="alert-close" onClick={() => setClosed(true)}>{closeText ? closeText : renderCloseButton()}</button>
        </div>
    );
};
export default Alert;
Alert.defaultProps = {
    type: AlertType.Default,
    closable: true,
}