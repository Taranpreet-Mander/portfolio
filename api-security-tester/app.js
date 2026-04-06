const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// API Security Tests
class APISecurityTester {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.results = [];
  }

  async testAuthentication() {
    console.log('[*] Testing authentication...');
    try {
      // Test without credentials
      const response = await axios.get(this.apiUrl);
      if (response.status === 200) {
        this.results.push({
          test: 'Missing Authentication',
          severity: 'CRITICAL',
          message: 'API accessible without authentication'
        });
      }
    } catch (error) {
      // Expected - API requires auth
      console.log('[+] Authentication required');
    }
  }

  async testSQLInjection() {
    console.log('[*] Testing SQL injection...');
    const payloads = [
      "' OR '1'='1",
      "admin' --",
      "1' UNION SELECT NULL --"
    ];

    for (const payload of payloads) {
      try {
        const response = await axios.get(
          `${this.apiUrl}?id=${encodeURIComponent(payload)}`
        );
        
        if (response.data && response.data.error) {
          if (response.data.error.includes('SQL')) {
            this.results.push({
              test: 'SQL Injection',
              severity: 'CRITICAL',
              message: `SQL error detected with payload: ${payload}`
            });
          }
        }
      } catch (error) {
        // Handle error
      }
    }
  }

  async testRateLimiting() {
    console.log('[*] Testing rate limiting...');
    const requests = [];
    
    for (let i = 0; i < 100; i++) {
      requests.push(
        axios.get(this.apiUrl).catch(error => ({ error }))
      );
    }

    const responses = await Promise.all(requests);
    const rateLimited = responses.filter(r => r.status === 429);

    if (rateLimited.length === 0) {
      this.results.push({
        test: 'Rate Limiting',
        severity: 'HIGH',
        message: 'No rate limiting detected'
      });
    }
  }

  async testHeaders() {
    console.log('[*] Testing security headers...');
    
    try {
      const response = await axios.get(this.apiUrl);
      
      const requiredHeaders = [
        'X-Content-Type-Options',
        'X-Frame-Options',
        'Content-Security-Policy'
      ];

      for (const header of requiredHeaders) {
        if (!response.headers[header.toLowerCase()]) {
          this.results.push({
            test: 'Missing Security Header',
            severity: 'MEDIUM',
            message: `Missing ${header}`
          });
        }
      }
    } catch (error) {
      console.error('Error testing headers:', error);
    }
  }

  async runAllTests() {
    console.log(`[*] Starting security tests on ${this.apiUrl}`);
    
    await this.testAuthentication();
    await this.testSQLInjection();
    await this.testRateLimiting();
    await this.testHeaders();

    return this.results;
  }
}

// API Routes
app.post('/api/test', async (req, res) => {
  const { url, tests } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL required' });
  }

  const tester = new APISecurityTester(url);
  const results = await tester.runAllTests();

  res.json({
    target: url,
    timestamp: new Date(),
    results: results
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'API Security Tester running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔐 API Security Tester running on port ${PORT}`);
});
