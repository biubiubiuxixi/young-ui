import classNames from "classnames";
import { MenuContext } from './Menu';
import {useContext} from "react";

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const { className, style, disabled, children, index } = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index,
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    }
    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    )
}

MenuItem.defaultProps = {
}
MenuItem.displayName = "MenuItem";
export default MenuItem;