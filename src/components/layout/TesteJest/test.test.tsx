import { screen, render } from '@testing-library/react';

import { TesteJest } from '.';

describe('<TesteJest />', () => {
  it('should render the heading', () => {
    const { container } = render(<TesteJest />);

    expect(screen.getByRole('heading', { name: /react/i })
    ).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });
});
