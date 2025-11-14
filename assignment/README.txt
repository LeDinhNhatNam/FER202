# Personal Budget Management Application

## Installation

1. Install dependencies:
```
npm install
```

2. Make sure you have the following packages installed:
   - react
   - react-dom
   - react-router-dom
   - react-redux
   - @reduxjs/toolkit
   - axios
   - bootstrap
   - react-bootstrap

## Running the Application

### Step 1: Start the JSON Server
In the first terminal, navigate to the assignment folder and run:
```
npx json-server --watch db.json --port 3001
```

This will start the mock API server on http://localhost:3001

### Step 2: Start the React Application
In a second terminal, run:
```
npm start
```

This will start the React app on http://localhost:3000

## Login Credentials

You can use any of these users to login:

Username: john_doe
Password: password123

Username: jane_smith
Password: securepass456

## Features

1. **Authentication**
   - Login with username and password validation (min 6 characters)
   - Protected routes (must login to access home page)
   - Logout functionality

2. **Expense Management**
   - Add new expenses with description, amount, category, and date
   - Edit existing expenses
   - Delete expenses with confirmation
   - View all expenses in a table

3. **Filtering**
   - Filter expenses by category (All, Food, Transport, Entertainment, Shopping, Other)

4. **Display**
   - Total expenses calculated and displayed in VND format
   - Dates formatted as DD-MM-YYYY
   - Amounts formatted as Vietnamese currency

5. **Validation**
   - Required fields validation
   - Amount must be greater than 0
   - Password must be at least 6 characters

## Technology Stack

- React 18
- Redux Toolkit (State Management)
- React Router v6 (Routing)
- Bootstrap 5 + React Bootstrap (UI)
- Axios (HTTP Client)
- JSON Server (Mock API)
