import {render, RenderResult, fireEvent, cleanup} from "@testing-library/react";
import Tab, {TabProps} from "./Tabs";
import TabPane from "./TabPane";

const testTabProps: TabProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test-class'
};

const testTabCardProps: TabProps = {
    defaultIndex: 0,
    type: "card",
};

const generateCard = (props: TabProps) => {
    return (
        <Tab {...props}>
            <TabPane label="active-tab">第1个</TabPane>
            <TabPane label={<span>two</span>}>第2个</TabPane>
            <TabPane label="disabled-tab" disabled>第3个</TabPane>
            <TabPane label="four">第4个</TabPane>
        </Tab>
    );
}

let wrapper: RenderResult, tabElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Tab and TabIem component', () => {
    beforeEach(() => {
        wrapper = render(generateCard(testTabProps));
        tabElement = wrapper.getByTestId('tab-test');
        activeElement = wrapper.getByText('active-tab');
        disabledElement = wrapper.getByText('disabled-tab');
    });
    it('should render correct Menu and MenuIem based on default props', () => {
        expect(tabElement).toBeInTheDocument();
        expect(tabElement).toHaveClass('test-class tab');
        expect(tabElement.querySelectorAll(':scope > li').length).toEqual(4);
        expect(activeElement).toHaveClass('tab-item is-active');
        expect(disabledElement).toHaveClass('tab-item is-disabled');
    })
    it('click items should change active and call the right callback', () => {
        const fourItem = wrapper.getByText('four');
        fireEvent.click(fourItem);
        expect(fourItem).toHaveClass('is-active');
        expect(activeElement).not.toHaveClass('is-active');
        expect(testTabProps.onSelect).toHaveBeenCalledWith(3);
        fireEvent.click(disabledElement);
        expect(activeElement).not.toHaveClass('is-active');
        expect(testTabProps.onSelect).not.toHaveBeenCalledWith(2);
    })
    it('should render card type when type is set to card', () => {
        cleanup();
        const cardWrapper = render(generateCard(testTabCardProps));
        const cardTabElement = cardWrapper.getByTestId('tab-test');
        expect(cardTabElement).toHaveClass('tab tab-card');
    })
})