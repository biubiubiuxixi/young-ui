import classNames from "classnames";
import React, {createContext, useState} from "react";
import { MenuItemProps } from "./MenuItem";

type SelectCallback = (selectIndex: string) => void;
type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    mode?: MenuMode; // 横向纵向
    className?: string;
    style?: React.CSSProperties;
    defaultIndex?: string;
    onSelect?: SelectCallback;
    defaultOpenSubMenus?: string[]; // 纵向默认展开
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({index: "0", defaultOpenSubMenus: []});

const Menu: React.FC<MenuProps> = (props) => {
    const { mode, className, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props;
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const handleClick = (index: string) => {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const passedContext: IMenuContext = {
        index: activeIndex ? activeIndex : "0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    }
    return (
        <ul className={classes} style={style} data-testid="menu-test">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
};

Menu.defaultProps = {
    defaultIndex: "0",
    mode: 'horizontal',
    defaultOpenSubMenus: [],
}

export default Menu;