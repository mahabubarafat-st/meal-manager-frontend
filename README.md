# Software Documentation for Prepaid Meal Management System

## 1. Introduction

This document provides detailed software documentation for the **Prepaid Meal Management System (PMMS)**, which is a barcode-based system designed to streamline the meal payment and token issuance process for university dining services. The system utilizes student ID cards embedded with barcodes to ensure efficient and secure access to meals.

The documentation is divided into two major sections:

1. **Frontend Documentation** - Describes the user interfaces (UI) for both students and dining staff.
2. **Backend Documentation** - Describes the server-side components, database structure, and other technical aspects of the system.

---

## 2. Frontend Documentation

### 2.1 Overview

The frontend of the system consists of two distinct interfaces:
- **Student Interface** - Allows students to interact with their meal plans, view their balance, meal history, and statistics.
- **Admin Interface** - Provides dining staff with control over meal requests, monitoring of student eligibility, and financial tracking.

The frontend is designed for usability, with a simple and intuitive interface to ensure quick adoption by both students and dining staff.

### 2.2 Student Interface

#### 2.2.1 Key Features
1. **Login Page**
   - Students will log into the system using their **CUET ID** number, which corresponds to their unique barcode stored on their student ID card.
   - The login page will validate the student's ID and automatically fetch their meal plan details and balance.

2. **Home Page**
   - **Meal History**: Displays a detailed log of meals accessed by the student.
   - **Balance Information**: Displays the current balance remaining in the student's meal plan.
   - **Meal Plan Statistics**: Displays meal consumption statistics, including average meals per week and month.
   - **Recharge Option**: Allows students to top-up their balance using cash, credit, or debit cards.

3. **Recharge Page**
   - Students can select their preferred payment method (cash, card) to recharge their balance.
   - Payment details are entered securely and processed in real-time.

4. **Settings**
   - Students can update their contact details or preferences related to their meal plans.

#### 2.2.2 User Flow
1. **Login** → 2. **Home** → 3. **View Meal History/Balance** → 4. **Recharge** → 5. **Logout**

#### 2.2.3 Technologies Used
- **HTML5, CSS3** for the UI design.
- **JavaScript (React)** for dynamic content rendering and interactivity.
- **Axios** for API requests to the backend.

### 2.3 Admin Interface

#### 2.3.1 Key Features
1. **Login Page**
   - Admins log in using their designated credentials.
   - Admin credentials are stored securely and authenticated by the backend.

2. **Dashboard**
   - **Meal Request Monitoring**: Admins can scan student ID cards to validate eligibility.
   - **Budgeting and Financial Monitoring**: Admins can track costs, revenues, and profits in real-time, with automatic updates based on meal requests.
   - **Meal Tracking**: Admins can monitor meal statistics, including the number of meals served and remaining funds.

3. **Reports**
   - **Financial Reports**: Automatically generated reports about revenue, expenditures, and profitability.
   - **Meal History**: Logs of all meals served, including a breakdown by time, student, and eligibility.

4. **Settings**
   - Admins can update system configurations, meal plans, and restrictions.

#### 2.3.2 User Flow
1. **Login** → 2. **Dashboard** → 3. **Scan Student ID** → 4. **View Meal Plan/Track Budget** → 5. **Generate Reports** → 6. **Logout**

#### 2.3.3 Technologies Used
- **HTML5, CSS3** for the UI.
- **JavaScript (React)** for dynamic rendering.
- **Axios** for communication with the backend.

---

## 3. Backend Documentation

### 3.1 Overview

The backend is responsible for handling all server-side processes, including meal validation, student eligibility checks, data storage, and reporting. The backend communicates with the frontend through **RESTful APIs**, processing requests and returning data in JSON format.

### 3.2 Architecture

The backend follows a **Model-View-Controller (MVC)** architecture, with the following main components:
- **Controller**: Manages incoming requests from the frontend and coordinates actions between the model and view.
- **Model**: Represents the data structure, including student information, meal plans, and historical meal data.
- **View**: Represents the user-facing data (although in the backend, it’s focused on API responses).

### 3.3 Technologies Used
- **Node.js** with **Express.js**: Used to build the server and handle API requests.
- **MongoDB**: NoSQL database for storing student data, meal plans, and meal history.
- **JWT (JSON Web Tokens)**: Used for user authentication (student and admin).
- **Mongoose**: MongoDB object modeling tool for defining schemas and interacting with the database.

### 3.4 Endpoints

#### 3.4.1 Authentication Endpoints
1. **POST /login/student**
   - **Input**: `studentID`
   - **Output**: JWT token and student data
   - **Description**: Authenticates the student and returns a token for session management.

2. **POST /login/admin**
   - **Input**: `adminUsername`, `adminPassword`
   - **Output**: JWT token for session management
   - **Description**: Authenticates the admin user and returns a token.

#### 3.4.2 Student Endpoints
1. **GET /student/{id}/profile**
   - **Input**: `studentID` (from URL)
   - **Output**: Student profile, including meal plan, balance, and meal history.
   - **Description**: Fetches student details and meal history.

2. **GET /student/{id}/meal-history**
   - **Input**: `studentID`
   - **Output**: Meal history data.
   - **Description**: Returns a list of meals the student has accessed.

3. **POST /student/{id}/recharge**
   - **Input**: `amount`, `paymentMethod`
   - **Output**: Updated balance.
   - **Description**: Allows students to recharge their meal account.

#### 3.4.3 Admin Endpoints
1. **POST /admin/scan-id**
   - **Input**: `studentID`, `mealPlan`
   - **Output**: Meal eligibility (approved or denied)
   - **Description**: Admin scans a student ID to validate their eligibility for a meal.

2. **GET /admin/meal-stats**
   - **Input**: None
   - **Output**: Meal statistics, revenue, and expenditures.
   - **Description**: Provides overall meal statistics for the admin to monitor the dining operations.

3. **GET /admin/report**
   - **Input**: `startDate`, `endDate`
   - **Output**: Financial and meal data between the specified dates.
   - **Description**: Generates a financial and meal consumption report.

---

## 4. Database Schema

The system relies on **MongoDB** for data storage, organized into several collections.

### 4.1 Collections

1. **Students**
   - `studentID` (String): Unique student identifier
   - `name` (String): Full name of the student
   - `mealPlan` (String): The meal plan assigned to the student
   - `balance` (Number): Current meal balance
   - `mealHistory` (Array): List of meals taken, including date and time
   - `status` (String): Active/Inactive status

2. **Meals**
   - `mealID` (String): Unique identifier for the meal
   - `mealType` (String): Type of meal (e.g., Breakfast, Lunch)
   - `mealDate` (Date): Date of meal service
   - `servedTo` (String): The studentID of the recipient

3. **Transactions**
   - `transactionID` (String): Unique identifier for the transaction
   - `amount` (Number): Recharge amount
   - `paymentMethod` (String): Method used (Card, Cash)
   - `transactionDate` (Date): Date and time of transaction

---

## 5. Security Considerations

- **JWT Authentication**: Secure token-based authentication is used for both students and admins to ensure unauthorized access is prevented.
- **Data Encryption**: Sensitive data such as passwords and payment information are encrypted before storing in the database.
- **Access Control**: The admin interface has limited access based on user roles and is protected by secure login mechanisms.

---

## 6. Conclusion

The Prepaid Meal Management System offers a streamlined, secure, and efficient solution for university dining. The use of barcode scanning technology ensures smooth and quick meal access, while the backend guarantees real-time validation and accurate tracking of student meals, balances, and statistics. Both students and administrators benefit from a more secure and user-friendly system for managing meal services.

