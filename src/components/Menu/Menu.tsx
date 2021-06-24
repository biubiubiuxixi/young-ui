import classNames from "classnames";
import React, {createContext, useState} from "react";
import { MenuItemProps } from "./MenuItem";

type SelectCallback = (selectIndex: number) => void;
type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    mode?: MenuMode;
    className?: string;
    style?: React.CSSProperties;
    defaultIndex?: number;
    onSelect?: SelectCallback;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}
export const MenuContext = createContext<IMenuContext>({index: 0});

const Menu: React.FC<MenuProps> = (props) => {
    const { mode, className, style, children, defaultIndex, onSelect } = props;
    const classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical'
    });
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const handleClick = (index: number) => {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const passedContext: IMenuContext = {
        index: activeIndex ? activeIndex : 0,
        onSelect: handleClick,
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index
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
    defaultIndex: 0,
    mode: 'horizontal',
}

export default Menu;