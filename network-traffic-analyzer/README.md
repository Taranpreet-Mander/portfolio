# 🌐 Network Traffic Analyzer & IDS

Real-time packet sniffer with anomaly detection. Identifies suspicious traffic patterns, protocol violations, and potential DDoS attacks using pattern matching and statistical analysis.

## Features

✅ **Real-Time Packet Sniffing**
- Capture network packets in real-time
- Filter by protocol, IP, port
- Detailed packet inspection

✅ **Protocol Analysis**
- TCP/UDP/ICMP packet dissection
- DNS query analysis
- HTTP traffic inspection
- SSL/TLS handshake logging

✅ **Anomaly Detection**
- DDoS attack detection
- Port scanning detection
- Unusual traffic patterns
- Suspicious connection attempts

✅ **IDS Features**
- Rule-based detection engine
- Statistical baseline analysis
- Alert generation and logging
- Threat severity classification

## Tech Stack

- **Language:** Python 3.8+
- **Packet Analysis:** Scapy, dpkt
- **Data Analysis:** NumPy, Pandas
- **Machine Learning:** Scikit-learn
- **Visualization:** Matplotlib, Plotly
- **Database:** SQLite / MongoDB

## Installation

### Prerequisites
```bash
Python 3.8+
pip
Wireshark (optional, for GUI analysis)
Admin/Root privileges for packet capture
```

### Setup
```bash
# Clone repository
git clone https://github.com/Taranpreetsingh077/network-traffic-analyzer.git
cd network-traffic-analyzer

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

## Usage

### Basic Packet Capture
```bash
python analyzer.py --interface eth0 --duration 60
```

### DDoS Detection
```bash
python analyzer.py --mode ids --threat-level high
```

### Protocol Filtering
```bash
python analyzer.py --filter "tcp port 80 or tcp port 443"
```

### Generate Report
```bash
python analyzer.py --report html --output report.html
```

## Configuration

Create `config.yaml`:
```yaml
capture:
  interface: eth0
  packet_count: 0  # 0 = infinite
  timeout: 300

detection:
  ddos_threshold: 1000  # packets/sec
  port_scan_threshold: 50
  anomaly_sensitivity: 0.8

output:
  log_file: traffic.log
  alert_file: alerts.log
  database: traffic.db
```

## Understanding the Output

### Packet Information
```
[*] Packet #1
    Source IP: 192.168.1.100
    Dest IP: 8.8.8.8
    Protocol: TCP
    Source Port: 54321
    Dest Port: 443
    Flags: SYN
```

### Alert Format
```
[ALERT] DDoS Attack Detected
  Time: 2024-04-06 10:30:45
  Severity: HIGH
  Source IPs: 192.168.1.0/24 (500+ packets)
  Destination: 192.168.1.50:80
  Recommendation: Block source IPs immediately
```

## Examples

### Capture and Analyze
```python
from analyzer import PacketAnalyzer

analyzer = PacketAnalyzer()
analyzer.start_capture(interface='eth0', duration=300)
analyzer.detect_anomalies()
```

### Export Results
```python
analyzer.export_to_csv('traffic.csv')
analyzer.export_to_json('traffic.json')
analyzer.generate_html_report('report.html')
```

## Performance

- Captures 10,000+ packets/second
- Real-time anomaly detection
- Minimal CPU overhead (<5%)
- Memory efficient packet processing

## Contributing

Contributions welcome! Focus areas:
- ML-based anomaly detection
- Additional protocol dissectors
- Performance optimization
- UI development

## License

MIT License

## Author

**Taranpreet Singh Mander**
- GitHub: [@Taranpreetsingh077](https://github.com/Taranpreetsingh077)
- Email: mickymander2@gmail.com

## References

- [Scapy Documentation](https://scapy.readthedocs.io/)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [Wireshark User Guide](https://www.wireshark.org/docs/)
