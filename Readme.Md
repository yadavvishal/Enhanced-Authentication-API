# Enhanced Authentication API

This is an enhanced authentication API built with Node.js, Express, and MongoDB. The API allows users to register, log in, log out, view and edit their profiles, and choose to make their profiles public or private. Admin users can view all profiles, while normal users can only view public profiles. It also supports authentication via Google and GitHub.

## Features

- User registration and login
- JWT-based authentication
- OAuth authentication via Google and GitHub
- User profile management (view, edit, and upload profile photo)
- Profile visibility (public or private)
- Admin access to all profiles
- Secure password handling with bcrypt
- Session management with express-session

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/your-username/enhanced-auth-api.git
   cd enhanced-auth-api
   ```

2. Install dependencies

   ```sh
   npm install
   ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   SESSION_SECRET=your_generated_session_secret
   ```

4. Start the server
   ```sh
   npm start
   ```

The server should now be running on `http://localhost:5000`.

## API Endpoints

### Auth Routes

- **Register a new user**

  - **URL:** `/api/auth/register`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "username": "testuser",
      "password": "password123",
      "email": "test@example.com",
      "name": "Test User",
      "phone": "1234567890"
    }
    ```

- **Login a user**

  - **URL:** `/api/auth/login`
  - **Method:** `POST`
  - **Body:**
    ```json
    {
      "username": "testuser",
      "password": "password123"
    }
    ```

- **Logout a user**
  - **URL:** `/api/auth/logout`
  - **Method:** `POST`

### Profile Routes

- **Get my profile**

  - **URL:** `/api/profile/me`
  - **Method:** `GET`
  - **Headers:** `Authorization: Bearer <token>`

- **Edit my profile**

  - **URL:** `/api/profile/me`
  - **Method:** `PATCH`
  - **Headers:** `Authorization: Bearer <token>`
  - **Body:**
    ```json
    {
      "name": "New Name",
      "bio": "New bio",
      "phone": "0987654321",
      "email": "newemail@example.com",
      "password": "newpassword123",
      "photo": "image_url_or_upload"
    }
    ```

- **Get all profiles (Admin only)**

  - **URL:** `/api/profile`
  - **Method:** `GET`
  - **Headers:** `Authorization: Bearer <token>`

- **Get a specific profile**
  - **URL:** `/api/profile/:username`
  - **Method:** `GET`

## OAuth Configuration

For Google and GitHub OAuth authentication, you need to set up your OAuth credentials and configure the callback URLs as per your development and production environments.

### Google OAuth

1. Go to the [Google Developers Console](https://console.developers.google.com/).
2. Create a new project and enable the "Google+ API".
3. Create OAuth 2.0 credentials.
4. Set the authorized redirect URIs to `http://localhost:5000/auth/google/callback`.

### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Register a new OAuth application.
3. Set the authorization callback URL to `http://localhost:5000/auth/github/callback`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Passport.js](http://www.passportjs.org/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js/)
- [JWT](https://jwt.io/)

---

Feel free to contribute to this project by opening issues or submitting pull requests.
