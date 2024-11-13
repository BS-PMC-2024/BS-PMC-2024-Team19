# BestInvest Project

**BestInvest** is an AI-driven software solution aimed at assisting users in managing their investments effectively. The platform offers user profiling, portfolio tracking, financial insights, and personalized recommendations. Built with **React** on the frontend and a **Node.js/MySQL** backend, BestInvest serves both regular users and administrators, with tailored dashboards and features.

---

## Features

### General User Features

- **SignUp**: A two-step registration allowing users to select between regular and premium plans, with validation and backend integration.
- **Profile**: Displays user information, upgrade options, and account management functions.
- **Portfolio**: A personalized investment portfolio section with detailed visualization and options to manage investments.
- **Questionnaire**: A profiling questionnaire that customizes investment recommendations based on user responses.
- **PremiumPage**: Exclusive content for premium users, including news feeds, YouTube links, and stock indicators.
- **TopRankedStocks**: Dynamic display of top-ranked stocks with real-time updates on price and performance.
- **NonPremiumInfo**: Provides details on the benefits of premium membership, with prompts to upgrade.

### Admin-Specific Features

- **DeleteByAdmin**: Allows administrators to delete users by email.
- **UpdateQ**: Provides functionality for administrators to update user questionnaire questions.
- **UserStatByAdmin**: Displays user statistics, allowing for user status updates (e.g., Premium/Not Premium) and account management.

---

## Project Components

### Authentication Components

- **Login**: User login form with validation, error handling, and role-based redirection.
- **SignUp**: Registration component with a two-step form, plan selection, and backend integration.

### Profile & Dashboard Components

- **Profile**: Displays and manages user details, including the option to upgrade to premium, update passwords, and delete the account.
- **Portfolio**: Provides portfolio insights with a form for entering investments and a pie chart visualization.
- **Questionnaire**: Dynamic questionnaire for user profiling, with multiple-choice questions and a progress indicator.

### Financial Information Components

- **PremiumPage**: Premium-exclusive section showcasing a financial news feed, stock indicators, and relevant video content.
- **TopRankedStocks**: A listing of top-ranked stocks with logos, names, prices, and color-coded performance indicators.
- **NonPremiumInfo**: Displayed for non-premium users to encourage upgrades to premium membership.

### Admin Dashboard Components

- **DeleteByAdmin**: Admin-only component to delete users based on email input.
- **UpdateQ**: Allows admins to update the questionnaire with a selection dropdown and confirmation dialog.
- **UserStatByAdmin**: Displays a user statistics table and enables admins to manage user accounts and statuses.

---

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/bestinvest.git
   cd bestinvest
