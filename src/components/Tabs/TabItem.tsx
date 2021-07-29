import React, {useContext} from "react";
import {TabContext} from "./Tabs";
import classNames from "classnames";

export interface TabItemProps {
    index: number;
    disabled?: boolean;
    label: React.ReactNode;
}

const TabItem: React.FC<TabItemProps> = (props) => {
    const { label, index, disabled } = props;
    const context = useContext(TabContext);
    const classes = classNames('tab-item', {
        'is-disabled': disabled,
        'is-active': context.index === index,
    })
    const handleClick = () => {
        if (context.onSelect && !disabled) {
            context.onSelect(index);
        }
    }
    return (
        <li onClick={handleClick} className={classes}>
            {label}
        </li>
    )
}
TabItem.displayName = "TabItem";
export default TabItem;