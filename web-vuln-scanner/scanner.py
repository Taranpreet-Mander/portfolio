#!/usr/bin/env python3
"""Web Vulnerability Scanner - OWASP Top 10 Detection"""

import requests
import argparse
import json
from urllib.parse import urljoin, urlparse
from datetime import datetime

class VulnerabilityScanner:
    def __init__(self, url):
        self.url = url
        self.vulnerabilities = []
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        })
    
    def scan(self):
        """Run all vulnerability scans"""
        print(f"[*] Starting scan on {self.url}")
        
        self.test_sql_injection()
        self.test_xss()
        self.test_insecure_headers()
        self.test_csrf()
        self.test_ssl_configuration()
        
        print(f"\n[+] Scan completed. Found {len(self.vulnerabilities)} vulnerabilities")
        return self.vulnerabilities
    
    def test_sql_injection(self):
        """Test for SQL Injection vulnerabilities"""
        print("[*] Testing for SQL Injection...")
        
        payloads = [
            "' OR '1'='1",
            "admin' --",
            "1' UNION SELECT NULL --",
            "'; DROP TABLE users; --"
        ]
        
        for payload in payloads:
            try:
                response = self.session.get(
                    f"{self.url}?id={payload}",
                    timeout=5
                )
                
                # Check for SQL error patterns
                sql_errors = [
                    'SQL syntax',
                    'MySQL error',
                    'Warning: mysql',
                    'PostgreSQL'
                ]
                
                if any(error in response.text for error in sql_errors):
                    self.add_vulnerability(
                        type='SQL_INJECTION',
                        severity='CRITICAL',
                        location=f"{self.url}?id=",
                        description='SQL Injection vulnerability detected'
                    )
                    break
                    
            except Exception as e:
                print(f"[!] Error testing SQL injection: {e}")
    
    def test_xss(self):
        """Test for Cross-Site Scripting (XSS)"""
        print("[*] Testing for XSS vulnerabilities...")
        
        xss_payloads = [
            '<script>alert("xss")</script>',
            '"><script>alert("xss")</script>',
            "'><script>alert('xss')</script>",
            '<img src=x onerror="alert(\'xss\')">'
        ]
        
        for payload in xss_payloads:
            try:
                response = self.session.get(
                    f"{self.url}?search={payload}",
                    timeout=5
                )
                
                if payload in response.text:
                    self.add_vulnerability(
                        type='XSS',
                        severity='HIGH',
                        location=f"{self.url}?search=",
                        description='Reflected XSS vulnerability found'
                    )
                    break
                    
            except Exception as e:
                print(f"[!] Error testing XSS: {e}")
    
    def test_insecure_headers(self):
        """Test for insecure HTTP headers"""
        print("[*] Testing HTTP security headers...")
        
        try:
            response = self.session.get(self.url, timeout=5)
            
            required_headers = {
                'X-Frame-Options': 'Clickjacking protection',
                'X-Content-Type-Options': 'MIME type sniffing protection',
                'Strict-Transport-Security': 'HTTPS enforcement',
                'Content-Security-Policy': 'XSS protection'
            }
            
            for header, description in required_headers.items():
                if header not in response.headers:
                    self.add_vulnerability(
                        type='INSECURE_HEADERS',
                        severity='MEDIUM',
                        location=self.url,
                        description=f'Missing {header} - {description}'
                    )
                    
        except Exception as e:
            print(f"[!] Error checking headers: {e}")
    
    def test_csrf(self):
        """Test for CSRF token presence"""
        print("[*] Testing for CSRF protection...")
        
        try:
            response = self.session.get(self.url, timeout=5)
            
            if '<form' in response.text:
                if 'csrf' not in response.text.lower():
                    self.add_vulnerability(
                        type='CSRF',
                        severity='HIGH',
                        location=self.url,
                        description='Missing CSRF token in forms'
                    )
                    
        except Exception as e:
            print(f"[!] Error testing CSRF: {e}")
    
    def test_ssl_configuration(self):
        """Test SSL/TLS configuration"""
        print("[*] Testing SSL/TLS configuration...")
        
        parsed_url = urlparse(self.url)
        if parsed_url.scheme == 'http':
            self.add_vulnerability(
                type='INSECURE_TRANSPORT',
                severity='CRITICAL',
                location=self.url,
                description='HTTP used instead of HTTPS'
            )
    
    def add_vulnerability(self, type, severity, location, description):
        """Add vulnerability to list"""
        vuln = {
            'type': type,
            'severity': severity,
            'location': location,
            'description': description,
            'timestamp': datetime.now().isoformat()
        }
        self.vulnerabilities.append(vuln)
        print(f"  [+] Found {type}: {severity}")
    
    def generate_report(self, format='json'):
        """Generate vulnerability report"""
        report = {
            'scan_date': datetime.now().isoformat(),
            'target': self.url,
            'vulnerabilities_found': len(self.vulnerabilities),
            'vulnerabilities': self.vulnerabilities
        }
        
        if format == 'json':
            return json.dumps(report, indent=2)
        
        return report

def main():
    parser = argparse.ArgumentParser(description='Web Vulnerability Scanner')
    parser.add_argument('--url', required=True, help='Target URL')
    parser.add_argument('--report', default='json', help='Report format (json/html)')
    
    args = parser.parse_args()
    
    scanner = VulnerabilityScanner(args.url)
    vulnerabilities = scanner.scan()
    
    report = scanner.generate_report(format=args.report)
    print("\n" + "="*50)
    print(report)

if __name__ == '__main__':
    main()
