import { handleChange } from "../frontend/src/features/Auth/SignUp/SignUp";
describe("testsignup", function () {
  test("should update form data on input change", () => {
    render(<SignUp />);

    // Check initial state of form inputs
    expect(screen.getByPlaceholderText("Full Name").value).toBe("");
    expect(screen.getByPlaceholderText("Email").value).toBe("");
    expect(screen.getByPlaceholderText("Password").value).toBe("");

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { name: "fullName", value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { name: "password", value: "password123" },
    });

    // Check if the state is updated
    expect(screen.getByPlaceholderText("Full Name").value).toBe("John Doe");
    expect(screen.getByPlaceholderText("Email").value).toBe("john@example.com");
    expect(screen.getByPlaceholderText("Password").value).toBe("password123");
  });
});
