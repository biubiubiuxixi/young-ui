import React, {useState, createContext} from 'react';
import classNames from "classnames";
import {TabPaneProps} from "./TabPane";
import TabItem from "./TabItem";


type SelectCallback = (selectIndex: number) => void;
type TabType = 'line' | 'card';

export interface TabProps {
    defaultIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    type?: TabType;
}

export interface ITabContext {
    onSelect?: SelectCallback;
    index: number;
    type?: TabType;
}

export const TabContext = createContext<ITabContext>({index: 0});

const Tab: React.FC<TabProps> = (props) => {
    const { children, className, style, type, defaultIndex, onSelect } = props;
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const classes = classNames('tab', className, {
        'tab-line': type === 'line',
        'tab-card': type === 'card',
    });
    const handleClick = (index: number) => {
        setActiveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const passesContext: ITabContext = {
        index: activeIndex ? activeIndex : 0,
        onSelect: handleClick,
        type,
    };
    const renderTabsChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<TabPaneProps>;
            const { displayName } = childElement.type;
            if (displayName === "TabPane") {
                return <TabItem {...childElement.props} index={i} />;
            }
        });
    }
    const renderChildren = () => {
        return React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<TabPaneProps>;
            const { displayName } = childElement.type;
            if (i === activeIndex && displayName === "TabPane") {
                return childElement;
            }
            return null;
        });
    }
    return (
        <div>
            <ul style={style} className={classes} data-testid="tab-test">
                <TabContext.Provider value={passesContext}>
                    {renderTabsChildren()}
                </TabContext.Provider>
            </ul>
            {renderChildren()}
        </div>
    );
}

Tab.defaultProps = {
    type: 'line',
    defaultIndex: 0,
}

export default Tab;
