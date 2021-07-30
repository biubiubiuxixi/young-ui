import {cleanup, fireEvent, render, RenderResult, waitFor} from "@testing-library/react";
import Menu, { MenuProps } from "./Menu";
import MenuItem from "./MenuItem";
import SubMenu from "./SubMenu";

const testMenuProps: MenuProps = {
    defaultIndex: "0",
    onSelect: jest.fn(),
    className: 'test-class'
};

const testVerticalMenuProps: MenuProps = {
    defaultIndex: "0",
    mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>link3</MenuItem>
            <SubMenu title="submenu">
                <MenuItem>drop1</MenuItem>
                <MenuItem disabled>drop2</MenuItem>
                <MenuItem>drop3</MenuItem>
            </SubMenu>
        </Menu>
    );
}

const createStyleFile = () => {
    const styleFile: string = `
        .submenu {
            display: none;
        }
        .submenu.submenu-opened {
            display: block;
        }
    `;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = styleFile;
    return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuIem component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testMenuProps));
        wrapper.container.append(createStyleFile());
        menuElement = wrapper.getByTestId('menu-test');
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });
    it('should render correct Menu and MenuIem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('test-class menu');
        // expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
        expect(activeElement).toHaveClass('menu-item is-active');
        expect(disabledElement).toHaveClass('menu-item is-disabled');
    })
    it('click items should change active and call the right callback', () => {
        const thirdItem = wrapper.getByText('link3');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testMenuProps.onSelect).toHaveBeenCalledWith("2");
        fireEvent.click(disabledElement);
        expect(activeElement).not.toHaveClass('is-active');
        expect(testMenuProps.onSelect).not.toHaveBeenCalledWith("1");
    })
    it('should render vertical mode when mode is set to vertical', () => {
        cleanup();
        const verWrapper = render(generateMenu(testVerticalMenuProps));
        const verMenuElement = verWrapper.getByTestId('menu-test')
        expect(verMenuElement).toHaveClass('menu menu-vertical');
    })
    it('should show dropdown items when hover on submenu', async () => {
        expect(wrapper.queryByText('drop1')).not.toBeInTheDocument(); // 需要先引入 css 文件
        const dropdownElement = wrapper.getByText('submenu');
        fireEvent.mouseEnter(dropdownElement);
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).toBeVisible();
        });
        fireEvent.click(wrapper.getByText('drop1'));
        expect(testMenuProps.onSelect).toHaveBeenCalledWith("3-0");
        fireEvent.mouseLeave(dropdownElement);
        await waitFor(() => {
            expect(wrapper.queryByText('drop1')).not.toBeVisible();
        });
    })
})