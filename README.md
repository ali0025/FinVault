# FINVAULT

## Project Overview
FINVAULT is a secure financial vault application that allows users to manage their accounts with basic banking operations. Users can register, authenticate, create accounts, and perform deposit/withdrawal transactions.

## Key Features
- User registration and authentication with JWT
- Account creation with minimum balance validation
- Secure deposit and withdrawal operations
- Account balance tracking
- User authorization and data protection

## Technical Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **Environment Management**: dotenv
- **HTTP Parsing**: cookie-parser

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB database (local or cloud)

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd FINVAULT
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required environment variables (see below)

4. Start the server:
   ```bash
   npm start
   ```

The application will run on `http://localhost:3000`

## Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/database-name
JWT_SECRET=your-secure-jwt-secret-key
```

## Running the Application
- **Start server**: `npm start`
- **Development mode**: `npm run dev` (if nodemon is configured)
- **Stop server**: `Ctrl + C`

## API Endpoints / Usage

Base URL: `http://localhost:3000/api`

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login

### Account Management (Requires Authentication)
- `POST /accounts` - Create new account
- `GET /accounts/:id` - Get account details
- `POST /accounts/:id/deposit` - Deposit funds
- `POST /accounts/:id/withdraw` - Withdraw funds

**Authentication**: Include JWT token in header: `Authorization: Bearer <token>`

### API Examples

#### Register a User
**Endpoint:** `POST http://localhost:3000/api/register`  
**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "phone": "9876543210",
  "password": "YourPassword123"
}
```

#### Login
**Endpoint:** `POST http://localhost:3000/api/login`  
**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "YourPassword123"
}
```

#### Create Account
**Endpoint:** `POST http://localhost:3000/api/accounts`  
**Request Body:**
```json
{
  "initialBalance": 100,
  "accountType": "SAVINGS",
  "currency": "INR"
}
```

## Testing
- Use **Postman** or **Thunder Client** to test API endpoints
- Test authentication flow: Register → Login → Get Token → Use Protected Routes
- Verify error handling with invalid inputs
- Test account operations with insufficient balance scenarios

## Project Structure
```
FINVAULT/
├── config/
│   └── database.js          # MongoDB connection setup
├── controllers/
│   ├── AccountController.js  # Account operations logic
│   └── AuthController.js     # Authentication logic
├── middleware/
│   └── auth.js              # JWT verification middleware
├── models/
│   ├── account.js           # Account data schema
│   └── user.js              # User data schema
├── routes/
│   └── index.js             # API route definitions
├── .env                     # Environment variables
├── package.json             # Project dependencies
└── server.js                # Main application entry point
```

**Key Files:**
- `server.js` - Express server setup and middleware configuration
- `config/database.js` - MongoDB connection with error handling
- `controllers/` - Business logic for authentication and account operations
- `models/` - Mongoose schemas for User and Account entities
- `middleware/auth.js` - JWT token verification for protected routes
