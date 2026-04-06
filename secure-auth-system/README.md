# 🔐 Secure Authentication System

Multi-factor authentication system with OAuth 2.0, JWT tokens, and TOTP 2FA. Implements NIST password guidelines, session management, brute-force protection, and CSRF defenses.

## Features

✅ **JWT-based Authentication**
- Secure token generation and validation
- Configurable token expiration
- Refresh token mechanism

✅ **Multi-Factor Authentication (MFA)**
- TOTP-based 2FA (Time-based One-Time Password)
- Email verification
- Backup codes for account recovery

✅ **OAuth 2.0 Integration**
- Google OAuth support
- GitHub OAuth support
- Secure token exchange

✅ **Security Features**
- Password hashing with bcrypt
- NIST password guidelines compliance
- Brute-force attack protection
- CSRF token validation
- Session management
- SQL injection prevention

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** React
- **Database:** PostgreSQL / MongoDB
- **Security:** JWT, OAuth 2.0, bcrypt, speakeasy (TOTP)
- **Deployment:** Docker

## Installation

### Prerequisites
```bash
Node.js 14+
npm or yarn
PostgreSQL / MongoDB
```

### Setup
```bash
# Clone the repository
git clone https://github.com/Taranpreetsingh077/secure-auth-system.git
cd secure-auth-system

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Run database migrations
npm run migrate

# Start the server
npm start
```

## API Documentation

### Authentication Endpoints

**POST /api/auth/register**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "name": "John Doe"
}
```

**POST /api/auth/login**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

**POST /api/auth/mfa/setup**
- Returns QR code for authenticator app

**POST /api/auth/mfa/verify**
```json
{
  "token": "123456"
}
```

**POST /api/auth/oauth/google**
```json
{
  "code": "OAUTH_AUTH_CODE"
}
```

## Security Considerations

- ✅ Passwords are hashed using bcrypt (12 rounds)
- ✅ JWT tokens are signed with HS256/RS256
- ✅ TOTP implements RFC 6238 standard
- ✅ All responses include security headers
- ✅ Rate limiting on authentication endpoints
- ✅ HTTPS/TLS enforcement in production

## Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Security audit
npm audit
```

## Deployment

### Docker
```bash
docker build -t secure-auth-system .
docker run -p 3000:3000 secure-auth-system
```

### Environment Variables
```
DATABASE_URL=postgresql://user:pass@localhost/auth_db
JWT_SECRET=your_jwt_secret_key
TOTP_WINDOW=2
SESSION_TIMEOUT=3600
```

## Contributing

Contributions are welcome! Please follow the security best practices and add tests for new features.

## License

MIT License - See LICENSE file

## Author

**Taranpreet Singh Mander**
- GitHub: [@Taranpreetsingh077](https://github.com/Taranpreetsingh077)
- Email: mickymander2@gmail.com
