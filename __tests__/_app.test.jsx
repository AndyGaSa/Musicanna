import { render } from '@testing-library/react';
import MyApp from '../pages/_app';

// Mock the Analytics component
jest.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

describe('MyApp', () => {
  it('renders the component with props', () => {
    const props = {
      Component: () => <div>Mock Component</div>,
      pageProps: { prop1: 'value1', prop2: 'value2' },
    };

    const { getByText } = render(<MyApp {...props} />);

    expect(getByText('Mock Component')).toBeInTheDocument();
  });
});
