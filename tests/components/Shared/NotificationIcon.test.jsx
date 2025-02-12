import { render, screen } from '@testing-library/react';
import NotificationIcon from '../../../src/components/Shared/NotificationIcon';

describe('NotificationIcon', () => {
  it('should render the loading indicator with default size and color', () => {
    render(<NotificationIcon />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toBeInTheDocument();
    expect(notificationIcon).toHaveClass('w-6 h-6'); // Default size is md
    expect(notificationIcon).toHaveClass('primary'); // Default color is primary
  });

  it('should render the loading indicator with specified size sm', () => {
    render(<NotificationIcon size="sm" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('w-4 h-4');
  });

  it('should render the loading indicator with specified size lg', () => {
    render(<NotificationIcon size="lg" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('w-8 h-8');
  });

  it('should render the loading indicator with specified size xl', () => {
    render(<NotificationIcon size="xl" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('w-10 h-10');
  });

  it('should render the loading indicator with specified color secondary', () => {
    render(<NotificationIcon color="secondary" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('secondary');
  });

  it('should render the loading indicator with specified color accent', () => {
    render(<NotificationIcon color="accent" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('accent');
  });

  it('should render the loading indicator with specified color error', () => {
    render(<NotificationIcon color="error" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('error');
  });

  it('should apply additional className', () => {
    render(<NotificationIcon className="my-custom-class" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('my-custom-class');
  });

  it('should handle invalid size and color props gracefully', () => {
    render(<NotificationIcon size="invalid" color="invalid" />);
    const notificationIcon = screen.getByTestId("notificationIcon");
    expect(notificationIcon).toHaveClass('w-6 h-6'); // Should fallback to default size (md)
    expect(notificationIcon).toHaveClass('primary'); // Should fallback to default color (primary)
  });

  it('should display the correct notification count', () => {
    render(<NotificationIcon notificationCount={5} />);
    const badge = screen.getByRole('status'); // Or getByText('5'), if you prefer
    expect(badge).toHaveTextContent('5');
  });

  it('should display "99+" when notification count is 100', () => {
    render(<NotificationIcon notificationCount={100} />);
    const badge = screen.getByRole('status'); // Or getByText('5'), if you prefer
    expect(badge).toHaveTextContent('99+');

    // render(<NotificationIcon notificationCount={150} />); // Test with a higher number
    // const badge2 = screen.getByTestId("notification-count"); // Or getByText('99+'), if you prefer
    // expect(badge2).toHaveTextContent('99+');
  });

  it('should display "99+" when notification count exceeds 100', () => {
    render(<NotificationIcon notificationCount={150} />);
    const badge = screen.getByRole('status'); // Or getByText('5'), if you prefer
    expect(badge).toHaveTextContent('99+');
  });


  it('should not display the badge when notificationCount is 0 or undefined', () => {
    render(<NotificationIcon notificationCount={0} />);
    const badges = screen.queryAllByRole('status'); // Use queryAllByRole to get an array
    expect(badges.length).toBe(0); // Check that the array is empty
  
    render(<NotificationIcon />); // No notificationCount prop
    const badges2 = screen.queryAllByRole('status');
    expect(badges2.length).toBe(0);
  });

  it('should display the notification count when notificationCount is a string', () => {
    render(<NotificationIcon notificationCount={"5"} />);
    const badge = screen.getByRole('status'); // Or getByText('5'), if you prefer
    expect(badge).toHaveTextContent('5');
  });
});