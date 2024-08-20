# Admin Dashboard Project

This project is an admin dashboard application built with React. It provides functionality for user management, question management, authentication, financial information display, and user profiling through a questionnaire.

## Components

### DeleteByAdmin

Located in `DeleteByAdmin.jsx`, this component allows administrators to delete users from the system.

- Features:
  - Input field for user email
  - Delete button to remove the user
  - Displays success or error messages using Material-UI Alert component

### UpdateQ

Found in `UpdateQ.jsx`, this component enables administrators to update questions in the system.

- Features:
  - Dropdown to select a question
  - Text area to edit the question
  - Update button to save changes
  - Confirmation dialog using SweetAlert2

### UserStatByAdmin

Defined in `UserStatByAdmin.jsx`, this component displays user statistics and allows for user management.

- Features:
  - Table view of all users
  - Ability to change user status (Premium/Not Premium)
  - Option to remove users
  - Confirmation dialog for user removal using SweetAlert2

### Login

The `Login.jsx` file contains the login component for user authentication.

- Features:
  - Email and password input fields
  - Password visibility toggle
  - Form validation
  - Error display
  - Success/Error alerts using Material-UI Alert component
  - Redirection based on user role (admin/regular user)

### PremiumPage

Located in `PremiumPage.jsx`, this component displays premium content for users with premium accounts.

- Features:
  - Displays NewsFeed
  - Shows YouTube links
  - Presents stock indicators

### TopRankedStocks

Found in `TopRankedStocks.jsx`, this component displays the top-ranked stocks.

- Features:
  - Shows a list of the top 15 stocks
  - Displays logo, name, current price, and change percentage for each stock
  - Dynamic colors based on stock performance

### Portfolio

Located in `Portfolio.jsx`, this component manages the user's investment portfolio.

- Features:
  - Displays portfolio details
  - Form for entering investment amount
  - Creates a personalized portfolio based on the user's risk level
  - Pie chart visualization of the portfolio

### Profile

Found in `Profile.jsx`, this component displays and manages the user's profile.

- Features:
  - Displays user information
  - Option to upgrade to premium account
  - Password update
  - Account deletion

### Questionnaire

Located in `Questionnaire.jsx`, this component handles a dynamic questionnaire for user profiling.

- Features:
  - Fetches questions dynamically from the backend
  - Displays questions one at a time with multiple-choice answers
  - Progress indicator showing completion percentage
  - Navigation between questions (Next and Back buttons)
  - Submits answers to the backend upon completion
  - Redirects to the portfolio page after successful submission
  - Error handling with user-friendly messages using SweetAlert2
  - Responsive design with Material-UI components

### NonPremiumInfo

Located in `NonPremiumInfo.jsx`, this component provides information for non-premium users.

- Features:
  - Displays a message encouraging users to upgrade to premium
  - Directs users to the personal area for package details

### SignUp

Found in `SignUp.jsx`, this component handles the user registration process.

- Features:
  - Two-step registration process
  - Form for basic user information (name, email, password)
  - Plan selection form for choosing between regular and premium plans
  - Credit card information input for premium users
  - Email availability check
  - Form validation and error display
  - Integration with backend for user registration

## Installation and Setup

1. Clone the repository

2. Install and update dependencies:

   ```
   # Update all dependencies from the root directory
   npm update

   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Run the backend server:

   ```
   cd backend
   npm start
   ```

4. Run the frontend application:
   ```
   cd frontend
   npm run start
   ```

## Backend API

The application communicates with a backend API running on `http://localhost:6500`. Ensure the backend server is running and accessible before starting the frontend application.

## Dependencies

- React
- React Router
- Material-UI
- SweetAlert2
- react-icons
- axios
- recharts
- PropTypes

## Notes for Developers

- Ensure proper error handling and user feedback in all components
- Maintain consistent styling across components
- Implement proper authentication and authorization checks
- Keep the API endpoint URLs updated if they change
- Make sure the backend server is running before starting the frontend application
- The Questionnaire component relies on backend endpoints for fetching questions and submitting answers. Ensure these endpoints are properly configured and maintained.
