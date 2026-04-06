# 🔐 API Security Tester

Interactive platform for testing API security. Includes OWASP API testing guides, injection payloads, authentication bypass detection, rate limiting tests, and security best practices.

## Features

✅ **API Endpoint Testing**
- REST API security testing
- Authentication/Authorization checks
- Input validation testing
- Rate limiting detection

✅ **Vulnerability Detection**
- OWASP API Security Top 10
- Broken authentication
- Broken object level authorization
- Injection attacks
- Insufficient logging

✅ **Interactive Dashboard**
- Real-time test execution
- Results visualization
- Severity classification
- Export capabilities

✅ **Security Guidelines**
- OWASP API best practices
- Remediation suggestions
- Security checklist
- Implementation guides

## Tech Stack

- **Frontend:** React, Material-UI
- **Backend:** Express.js, Node.js
- **Testing:** Axios, Jest
- **Database:** MongoDB
- **Documentation:** Swagger/OpenAPI

## Installation

### Prerequisites
```bash
Node.js 14+
npm or yarn
MongoDB (optional)
```

### Setup
```bash
git clone https://github.com/Taranpreetsingh077/api-security-tester.git
cd api-security-tester

# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (new terminal)
cd frontend
npm install
npm start
```

## Usage

### Web Interface
1. Open http://localhost:3000
2. Enter API endpoint URL
3. Select tests to run
4. View results and recommendations

### API Endpoints

**POST /api/test**
```json
{
  "url": "https://api.example.com/users",
  "method": "GET",
  "headers": {"Authorization": "Bearer token"},
  "tests": ["auth", "injection", "ratelimit"]
}
```

**GET /api/test/:id/results**
Returns test results with severity and recommendations

### CLI Testing
```bash
npm test -- --url https://api.example.com/endpoint
npm test -- --config config.json
```

## Test Categories

### Authentication Tests
- Missing authentication
- Weak authentication
- Token expiration
- Session management

### Authorization Tests
- Unauthorized access
- Privilege escalation
- Broken object references (BORA)

### Input Validation
- SQL injection
- NoSQL injection
- Command injection
- Path traversal

### Rate Limiting
- Missing rate limits
- Predictable patterns
- Bypass attempts

## Example Report

```
API Security Test Report
========================
Target: https://api.example.com/v1
Tests Executed: 50
Issues Found: 8

CRITICAL (2)
  - Missing authentication on /api/admin endpoint
  - Hardcoded API keys in response headers

HIGH (3)
  - SQL injection in /search endpoint
  - Missing rate limiting on login
  - Weak session token validation

MEDIUM (3)
  - Missing CORS headers
  - Information disclosure in error messages
  - Insufficient logging
```

## Configuration

```yaml
test:
  timeout: 30000
  retries: 2
  verbosity: 'detailed'
  
security:
  auth_bypass: true
  injection_tests: true
  rate_limit_check: true
  headers_check: true
  
output:
  format: 'json'
  save: true
  directory: './reports'
```

## OWASP API Top 10 Coverage

1. ✅ Broken Object Level Authorization
2. ✅ Broken Authentication
3. ✅ Broken Object Property Level Authorization
4. ✅ Unrestricted Resource Consumption
5. ✅ Broken Function Level Authorization
6. ✅ Mass Assignment
7. ✅ Cross-Site Request Forgery (CSRF)
8. ✅ Soft Token Expiration
9. ✅ Insufficient Logging & Monitoring
10. ✅ Improper Assets Management

## Performance

- Light endpoint tests: <100ms
- Full security suite: 5-30 seconds
- Batch testing: Configurable concurrency
- Report generation: <2 seconds

## Contributing

Contributions welcome! Focus areas:
- GraphQL testing
- gRPC security
- WebSocket security
- Advanced ML-based detection

## License

MIT License

## References

- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)
- [Swagger Security](https://swagger.io/tools/swagger-ui/)

## Author

**Taranpreet Singh Mander**
- GitHub: [@Taranpreetsingh077](https://github.com/Taranpreetsingh077)
- Email: mickymander2@gmail.com
