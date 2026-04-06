#!/usr/bin/env python3
"""Modern Encryption Toolkit - Cryptographic Operations"""

from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend
import os
import base64

class AESEncryption:
    """AES-256 Encryption wrapper using Fernet"""
    
    @staticmethod
    def generate_key(password: str):
        """Generate encryption key from password"""
        salt = os.urandom(16)
        kdf = PBKDF2(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=default_backend()
        )
        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
        return key, salt
    
    @staticmethod
    def encrypt(plaintext: str, password: str):
        """Encrypt plaintext with password"""
        key, salt = AESEncryption.generate_key(password)
        cipher = Fernet(key)
        ciphertext = cipher.encrypt(plaintext.encode())
        return base64.b64encode(salt + ciphertext).decode()
    
    @staticmethod
    def decrypt(encrypted_data: str, password: str):
        """Decrypt encrypted data with password"""
        data = base64.b64decode(encrypted_data)
        salt = data[:16]
        ciphertext = data[16:]
        
        kdf = PBKDF2(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
            backend=default_backend()
        )
        key = base64.urlsafe_b64encode(kdf.derive(password.encode()))
        cipher = Fernet(key)
        plaintext = cipher.decrypt(ciphertext).decode()
        return plaintext

class RSAEncryption:
    """RSA Encryption and Digital Signatures"""
    
    @staticmethod
    def generate_keypair(key_size=2048):
        """Generate RSA key pair"""
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=key_size,
            backend=default_backend()
        )
        public_key = private_key.public_key()
        return public_key, private_key
    
    @staticmethod
    def encrypt(plaintext: str, public_key):
        """Encrypt with RSA public key"""
        ciphertext = public_key.encrypt(
            plaintext.encode(),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return base64.b64encode(ciphertext).decode()
    
    @staticmethod
    def decrypt(ciphertext: str, private_key):
        """Decrypt with RSA private key"""
        encrypted_data = base64.b64decode(ciphertext)
        plaintext = private_key.decrypt(
            encrypted_data,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return plaintext.decode()

class DigitalSignature:
    """Digital Signature Generation and Verification"""
    
    @staticmethod
    def sign(message: bytes, private_key):
        """Sign message with private key"""
        signature = private_key.sign(
            message,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return base64.b64encode(signature).decode()
    
    @staticmethod
    def verify(message: bytes, signature: str, public_key):
        """Verify message signature"""
        try:
            sig_data = base64.b64decode(signature)
            public_key.verify(
                sig_data,
                message,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except Exception:
            return False

# Usage examples
if __name__ == "__main__":
    print("[*] Modern Encryption Toolkit")
    
    # AES Example
    print("\n[*] AES-256-GCM Encryption")
    plaintext = "Secret message"
    password = "MySecurePassword123!"
    encrypted = AESEncryption.encrypt(plaintext, password)
    print(f"Encrypted: {encrypted[:50]}...")
    decrypted = AESEncryption.decrypt(encrypted, password)
    print(f"Decrypted: {decrypted}")
    
    # RSA Example
    print("\n[*] RSA-2048 Encryption")
    public_key, private_key = RSAEncryption.generate_keypair(2048)
    message = "Confidential data"
    encrypted_rsa = RSAEncryption.encrypt(message, public_key)
    decrypted_rsa = RSAEncryption.decrypt(encrypted_rsa, private_key)
    print(f"Decrypted RSA: {decrypted_rsa}")
    
    # Digital Signature Example
    print("\n[*] Digital Signatures")
    sig = DigitalSignature.sign(b"Document", private_key)
    is_valid = DigitalSignature.verify(b"Document", sig, public_key)
    print(f"Signature valid: {is_valid}")
