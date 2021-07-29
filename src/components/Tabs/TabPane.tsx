import React from "react";
import classNames from "classnames";

export interface TabPaneProps {
    index?: number;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    label: React.ReactNode;
}

const TabPane: React.FC<TabPaneProps> = (props) => {
    const { children, style, className } = props;
    const classes = classNames('tab-content', className);
    return (
        <div style={style} className={classes}>
            {children}
        </div>
    )
}

TabPane.displayName = "TabPane";
export default TabPane;