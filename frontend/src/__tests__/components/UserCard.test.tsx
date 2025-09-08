import React from "react";
import { render, screen } from "@testing-library/react";
import { UserCard } from "@/components/UserCard";
import { User } from "@/types";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function MockLink({ href, children, className }: any) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

describe("UserCard Component", () => {
  const mockUser: User = {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    phone: "+1-234-567-8900",
    addresses: [
      {
        id: "1",
        user_id: "1",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
      },
    ],
  };

  it("should render user information correctly", () => {
    render(
      <table>
        <tbody>
          <UserCard user={mockUser} />
        </tbody>
      </table>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("+1-234-567-8900")).toBeInTheDocument();
    expect(screen.getByText("New York, NY")).toBeInTheDocument();
  });

  it('should display "No address" when user has no addresses', () => {
    const userWithoutAddress = { ...mockUser, addresses: [] };

    render(
      <table>
        <tbody>
          <UserCard user={userWithoutAddress} />
        </tbody>
      </table>
    );

    expect(screen.getByText("No address")).toBeInTheDocument();
  });

  it('should display "No address" when user addresses is undefined', () => {
    const userWithoutAddress: Partial<User> = {
      ...mockUser,
      addresses: undefined,
    };

    render(
      <table>
        <tbody>
          <UserCard user={userWithoutAddress as User} />
        </tbody>
      </table>
    );

    expect(screen.getByText("No address")).toBeInTheDocument();
  });

  it("should render posts count when provided", () => {
    render(
      <table>
        <tbody>
          <UserCard user={mockUser} postsCount={5} />
        </tbody>
      </table>
    );

    expect(screen.getByText("View 5 posts →")).toBeInTheDocument();
  });

  it("should render default posts text when count is not provided", () => {
    render(
      <table>
        <tbody>
          <UserCard user={mockUser} />
        </tbody>
      </table>
    );

    expect(screen.getByText("View posts →")).toBeInTheDocument();
  });

  it("should generate correct link href with encoded parameters", () => {
    render(
      <table>
        <tbody>
          <UserCard user={mockUser} postsCount={3} />
        </tbody>
      </table>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/posts?userId=1&userName=John%20Doe&userEmail=john%40example.com"
    );
  });

  it("should handle special characters in user data correctly", () => {
    const userWithSpecialChars: User = {
      id: "2",
      name: "María José & Co.",
      username: "mariajose",
      email: "maria+test@example.com",
      phone: "+1-555-123-4567",
      addresses: [
        {
          id: "2",
          user_id: "2",
          street: "456 Oak Ave",
          city: "Los Angeles",
          state: "CA",
          zipcode: "90210",
        },
      ],
    };

    render(
      <table>
        <tbody>
          <UserCard user={userWithSpecialChars} />
        </tbody>
      </table>
    );

    expect(screen.getByText("María José & Co.")).toBeInTheDocument();
    expect(screen.getByText("maria+test@example.com")).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/posts?userId=2&userName=Mar%C3%ADa%20Jos%C3%A9%20%26%20Co.&userEmail=maria%2Btest%40example.com"
    );
  });

  it("should apply custom className", () => {
    const { container } = render(
      <table>
        <tbody>
          <UserCard user={mockUser} className="custom-class" />
        </tbody>
      </table>
    );

    const row = container.querySelector("tr");
    expect(row).toHaveClass("custom-class");
  });

  it("should have correct styling for table cells", () => {
    render(
      <table>
        <tbody>
          <UserCard user={mockUser} />
        </tbody>
      </table>
    );

    const nameTd = screen.getByText("John Doe").closest("td");
    expect(nameTd).toHaveClass(
      "py-4",
      "px-4",
      "text-sm",
      "text-gray-900",
      "border-b",
      "border-gray-200"
    );

    const emailTd = screen.getByText("john@example.com").closest("td");
    expect(emailTd).toHaveClass(
      "py-4",
      "px-4",
      "text-sm",
      "text-gray-700",
      "border-b",
      "border-gray-200"
    );
  });

  it("should have correct styling for the link", () => {
    render(
      <table>
        <tbody>
          <UserCard user={mockUser} />
        </tbody>
      </table>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "text-purple-500",
      "hover:text-purple-700",
      "transition-colors",
      "font-medium"
    );
  });

  it("should render the row as a table row element", () => {
    const { container } = render(
      <table>
        <tbody>
          <UserCard user={mockUser} />
        </tbody>
      </table>
    );

    const row = container.querySelector("tr");
    expect(row).toBeInTheDocument();
    expect(row?.tagName).toBe("TR");
  });

  it("should render correct number of table cells", () => {
    const { container } = render(
      <table>
        <tbody>
          <UserCard user={mockUser} />
        </tbody>
      </table>
    );

    const cells = container.querySelectorAll("td");
    expect(cells).toHaveLength(5); // name, email, phone, address, actions
  });

  it("should use first address when multiple addresses exist", () => {
    const userWithMultipleAddresses: User = {
      ...mockUser,
      addresses: [
        {
          id: "1",
          user_id: "1",
          street: "123 Main St",
          city: "New York",
          state: "NY",
          zipcode: "10001",
        },
        {
          id: "2",
          user_id: "1",
          street: "456 Secondary St",
          city: "Boston",
          state: "MA",
          zipcode: "02101",
        },
      ],
    };

    render(
      <table>
        <tbody>
          <UserCard user={userWithMultipleAddresses} />
        </tbody>
      </table>
    );

    expect(screen.getByText("New York, NY")).toBeInTheDocument();
    expect(screen.queryByText("Boston, MA")).not.toBeInTheDocument();
  });
});
