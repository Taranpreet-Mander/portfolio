# 🔐 Modern Encryption Toolkit

Educational cryptography suite implementing AES-256-GCM, RSA-2048, HMAC signatures, and PBKDF2 key derivation. Supports file encryption, digital signatures, and secure key management.

## Features

✅ **Symmetric Encryption**
- AES-256-GCM (authenticated encryption)
- PBKDF2 key derivation from passwords
- Secure random IV/nonce generation
- Authenticated ciphertexts

✅ **Asymmetric Encryption**
- RSA-2048 key generation
- Public key encryption
- Private key management
- Key export/import

✅ **Digital Signatures**
- HMAC-SHA256 signatures
- RSA digital signatures
- Signature verification
- Use cases for integrity verification

✅ **File Operations**
- Encrypt files with progress indication
- Decrypt encrypted files
- Batch processing
- Secure temporary file handling

## Tech Stack

- **Language:** Python 3.8+
- **Cryptography:** cryptography library
- **Key Derivation:** PBKDF2
- **Utilities:** Click, PrettyTable
- **Database:** JSON (for key storage)

## Installation

### Prerequisites
```bash
Python 3.8+
pip
```

### Setup
```bash
git clone https://github.com/Taranpreetsingh077/encryption-toolkit.git
cd encryption-toolkit

python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

pip install -r requirements.txt
```

## Usage

### CLI Commands

#### Generate Key Pair
```bash
python toolkit.py genkey --type rsa --bits 2048 --output keypair.pem
```

#### Encrypt Data (AES-256-GCM)
```bash
# With password
python toolkit.py encrypt --data "Secret message" --password "MyPassword123" --output secret.encrypted

# With key file
python toolkit.py encrypt --file data.txt --key aes_key.bin
```

#### Decrypt Data
```bash
python toolkit.py decrypt --file secret.encrypted --password "MyPassword123"
```

#### Generate Signature
```bash
python toolkit.py sign --file document.pdf --key private_key.pem --output signature.sig
```

#### Verify Signature
```bash
python toolkit.py verify --file document.pdf --signature signature.sig --key public_key.pem
```

#### Encrypt File
```bash
python toolkit.py encrypt-file --input sensitive.pdf --output sensitive.pdf.enc --mode password
```

## Examples

### Python API

#### AES Encryption
```python
from toolkit import AESEncryption

cipher = AESEncryption()
encrypted = cipher.encrypt("Hello, World!", password="secure_password")
decrypted = cipher.decrypt(encrypted, password="secure_password")
```

#### RSA
```python
from toolkit import RSAEncryption

rsa = RSAEncryption()
public_key, private_key = rsa.generate_keys(bits=2048)

# Encrypt with public key
ciphertext = rsa.encrypt("Secret", public_key)

# Decrypt with private key
plaintext = rsa.decrypt(ciphertext, private_key)
```

#### Digital Signatures
```python
from toolkit import DigitalSignature

sig = DigitalSignature()
signature = sig.sign(b"Document content", private_key)
is_valid = sig.verify(b"Document content", signature, public_key)
```

## Configuration

```python
# config.py
AES_MODE = 'GCM'
AES_KEY_SIZE = 32  # 256 bits
RSA_KEY_SIZE = 2048
PBKDF2_ITERATIONS = 100000
HMAC_ALGORITHM = 'SHA256'
```

## Security Considerations

✅ **Best Practices Implemented**
- Authenticated encryption (AES-GCM)
- Key stretching with PBKDF2
- Secure random number generation
- Protection against timing attacks
- Secure memory handling for sensitive data

⚠️ **Important Notes**
- Never hardcode passwords
- Use environment variables for secrets
- Regularly rotate keys
- Use strong passwords (minimum 12 characters)
- Store private keys securely

## Performance

```
AES-256-GCM Encryption:
- 1MB file: ~50ms
- 100MB file: ~5s

RSA-2048:
- Key generation: ~2s
- Encryption: ~10ms
- Decryption: ~50ms
```

## Testing

```bash
pytest tests/ -v
pytest tests/ --cov
```

## Contributing

Focus areas:
- Additional algorithms (ChaCha20, Argon2)
- Hardware acceleration
- GUI implementation
- Batch operations

## License

MIT License

## References

- [NIST Cryptographic Standards](https://nvlpubs.nist.gov/nistpubs/fips/)
- [Cryptography.io Documentation](https://cryptography.io/)
- [OWASP Cryptographic Storage](https://cheatsheetseries.owasp.org/cheatsheets/Cryptographic_Storage_Cheat_Sheet.html)

## Author

**Taranpreet Singh Mander**
- GitHub: [@Taranpreetsingh077](https://github.com/Taranpreetsingh077)
- Email: mickymander2@gmail.com
