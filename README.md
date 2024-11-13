BestInvest Project
BestInvest is an AI-driven software solution aimed at assisting users in managing their investments effectively. The platform offers user profiling, portfolio tracking, financial insights, and personalized recommendations. Built with React on the frontend and a Node.js/MySQL backend, BestInvest serves both regular users and administrators, with tailored dashboards and features.

Features
General User Features
SignUp: A two-step registration allowing users to select between regular and premium plans, with validation and backend integration.
Profile: Displays user information, upgrade options, and account management functions.
Portfolio: A personalized investment portfolio section with detailed visualization and options to manage investments.
Questionnaire: A profiling questionnaire that customizes investment recommendations based on user responses.
PremiumPage: Exclusive content for premium users, including news feeds, YouTube links, and stock indicators.
TopRankedStocks: Dynamic display of top-ranked stocks with real-time updates on price and performance.
NonPremiumInfo: Provides details on the benefits of premium membership, with prompts to upgrade.
Admin-Specific Features
DeleteByAdmin: Allows administrators to delete users by email.
UpdateQ: Provides functionality for administrators to update user questionnaire questions.
UserStatByAdmin: Displays user statistics, allowing for user status updates (e.g., Premium/Not Premium) and account management.
Project Components
Authentication Components
Login: User login form with validation, error handling, and role-based redirection.
SignUp: Registration component with a two-step form, plan selection, and backend integration.
Profile & Dashboard Components
Profile: Displays and manages user details, including the option to upgrade to premium, update passwords, and delete the account.
Portfolio: Provides portfolio insights with a form for entering investments and a pie chart visualization.
Questionnaire: Dynamic questionnaire for user profiling, with multiple-choice questions and a progress indicator.
Financial Information Components
PremiumPage: Premium-exclusive section showcasing a financial news feed, stock indicators, and relevant video content.
TopRankedStocks: A listing of top-ranked stocks with logos, names, prices, and color-coded performance indicators.
NonPremiumInfo: Displayed for non-premium users to encourage upgrades to premium membership.
Admin Dashboard Components
DeleteByAdmin: Admin-only component to delete users based on email input.
UpdateQ: Allows admins to update the questionnaire with a selection dropdown and confirmation dialog.
UserStatByAdmin: Displays a user statistics table and enables admins to manage user accounts and statuses.
Installation and Setup
Clone the Repository

bash
Copy code
git clone https://github.com/your-username/bestinvest.git
cd bestinvest
Install Dependencies

Backend:

bash
Copy code
cd backend
npm install
Frontend:

bash
Copy code
cd ../frontend
npm install
Running the Application

Backend: Start the backend server (runs on http://localhost:6500 by default).

bash
Copy code
cd backend
npm start
Frontend: Start the frontend client (runs on http://localhost:3000).

bash
Copy code
cd frontend
npm start
Backend API
Ensure the backend server is accessible and running at http://localhost:6500 for the frontend application to function correctly. The API is responsible for handling user data, authentication, financial information retrieval, and questionnaire responses.

Dependencies
React: Frontend framework for building the user interface.
React Router: For client-side routing.
Material-UI: UI components for a consistent and responsive design.
SweetAlert2: For elegant, customizable alerts.
Axios: HTTP client for backend communication.
Recharts: Data visualization library used for portfolio insights.
PropTypes: For type-checking React props.
Developer Notes
Ensure robust error handling and provide user-friendly feedback across components.
Maintain consistent styling throughout the application.
Implement role-based access control to prevent unauthorized access.
Update API endpoint URLs if they change in the backend.
Confirm that backend endpoints are functioning as expected, especially for dynamic data like questionnaire questions.
Enjoy using BestInvest! Let us know if you encounter any issues or have feature requests to improve the platform.
