#!/usr/bin/env python3
"""
Network Traffic Analyzer & IDS
Real-time packet sniffing with anomaly detection
"""

import sys
import argparse
from scapy.all import sniff, IP, TCP, UDP, ICMP
from collections import defaultdict
import datetime

class NetworkAnalyzer:
    def __init__(self):
        self.packet_count = 0
        self.traffic_stats = defaultdict(int)
        self.alerts = []
        self.ip_traffic = defaultdict(int)
        self.port_traffic = defaultdict(int)
        
    def packet_callback(self, packet):
        """Process each captured packet"""
        self.packet_count += 1
        
        if IP in packet:
            src_ip = packet[IP].src
            dst_ip = packet[IP].dst
            
            # Track IP traffic
            self.ip_traffic[src_ip] += 1
            
            # Protocol analysis
            if TCP in packet:
                self.traffic_stats['TCP'] += 1
                port = packet[TCP].dport
                self.port_traffic[port] += 1
                
                # Detect port scanning
                if self.is_port_scan(src_ip):
                    self.generate_alert('PORT_SCAN', src_ip, dst_ip)
                    
            elif UDP in packet:
                self.traffic_stats['UDP'] += 1
                
            elif ICMP in packet:
                self.traffic_stats['ICMP'] += 1
                # Detect ICMP floods
                if self.ip_traffic[src_ip] > 1000:
                    self.generate_alert('ICMP_FLOOD', src_ip, dst_ip)
        
        # Print packet summary
        if self.packet_count % 100 == 0:
            print(f"[*] Captured {self.packet_count} packets")
    
    def is_port_scan(self, src_ip):
        """Detect potential port scanning"""
        return self.ip_traffic[src_ip] > 50
    
    def generate_alert(self, alert_type, src_ip, dst_ip):
        """Generate security alert"""
        alert = {
            'type': alert_type,
            'timestamp': datetime.datetime.now(),
            'source': src_ip,
            'destination': dst_ip,
            'severity': 'HIGH'
        }
        self.alerts.append(alert)
        print(f"\n[ALERT] {alert_type} detected")
        print(f"  Source: {src_ip} -> Destination: {dst_ip}")
        print(f"  Time: {alert['timestamp']}")
    
    def start_capture(self, interface=None, packet_count=0, timeout=None):
        """Start packet capture"""
        print("[*] Starting network analysis...")
        print(f"[*] Interface: {interface or 'Default'}")
        
        try:
            sniff(
                iface=interface,
                prn=self.packet_callback,
                store=False,
                count=packet_count,
                timeout=timeout
            )
        except PermissionError:
            print("[!] Error: This script requires administrator/root privileges")
            sys.exit(1)
        except Exception as e:
            print(f"[!] Error: {e}")
            sys.exit(1)
    
    def print_summary(self):
        """Print analysis summary"""
        print("\n" + "="*50)
        print("NETWORK ANALYSIS SUMMARY")
        print("="*50)
        print(f"Total Packets: {self.packet_count}")
        print(f"TCP Packets: {self.traffic_stats['TCP']}")
        print(f"UDP Packets: {self.traffic_stats['UDP']}")
        print(f"ICMP Packets: {self.traffic_stats['ICMP']}")
        print(f"Alerts Generated: {len(self.alerts)}")
        
        if self.alerts:
            print("\nTop Alerts:")
            for alert in self.alerts[:5]:
                print(f"  - {alert['type']}: {alert['source']} @ {alert['timestamp']}")

def main():
    parser = argparse.ArgumentParser(
        description='Network Traffic Analyzer & IDS'
    )
    parser.add_argument(
        '--interface', '-i',
        help='Network interface to sniff on',
        default=None
    )
    parser.add_argument(
        '--count', '-c',
        type=int,
        help='Number of packets to capture',
        default=0
    )
    parser.add_argument(
        '--timeout', '-t',
        type=int,
        help='Capture timeout in seconds',
        default=None
    )
    
    args = parser.parse_args()
    
    analyzer = NetworkAnalyzer()
    analyzer.start_capture(
        interface=args.interface,
        packet_count=args.count,
        timeout=args.timeout
    )
    analyzer.print_summary()

if __name__ == '__main__':
    main()
