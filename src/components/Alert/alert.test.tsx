import {render} from '@testing-library/react';
import Alert from "./Alert";

describe('test alert component', () => {
    it('should render the correct default alert', () => {
        const wrapper = render(<Alert content="这是内容" />);
        const element = wrapper.getByText('这是内容');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('alert-content');
    });
    it('should render the correct component based on different props', () => {

    });
})