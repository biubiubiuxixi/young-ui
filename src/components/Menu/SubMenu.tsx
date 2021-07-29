import React, {FunctionComponentElement, useContext, useState} from "react";
import {MenuContext} from "./Menu";
import classNames from "classnames";
import {MenuItemProps} from "./MenuItem";

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {
    const context = useContext(MenuContext);
    const openSubMenus = context.defaultOpenSubMenus as Array<string>;
    const isOpened = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false; // 设置是否默认展开
    const [menuOpen, setMenuOpen] = useState(isOpened);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
    });
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
    let time: any;
    const handleMouseMove = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(time);
        e.preventDefault();
        time = setTimeout(() => {
            setMenuOpen(toggle);
        }, 300);
    };
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => handleMouseMove(e, true),
        onMouseLeave: (e: React.MouseEvent) => handleMouseMove(e, false)
    } : {};
    const renderChildren = () => {
        const subMenuClasses = classNames('submenu', {
            'submenu-opened': menuOpen,
        });
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            } else {
                console.error('warning: SubMenu has a child is not a MenuItem')
            }
        });
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="submenu-title" {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    );
}
SubMenu.displayName = 'SubMenu';
export default SubMenu;