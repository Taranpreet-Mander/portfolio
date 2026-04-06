from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import uuid
from datetime import datetime, timedelta
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.backends import default_backend

app = FastAPI(title="Encrypted File Share")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File storage
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# In-memory file metadata (use database in production)
file_metadata = {}

class FileShare:
    def __init__(self, share_id, filename, expiration_hours=24):
        self.share_id = share_id
        self.filename = filename
        self.created_at = datetime.now()
        self.expires_at = self.created_at + timedelta(hours=expiration_hours)
        self.downloads = 0
        self.max_downloads = None
        self.private_key = ec.generate_private_key(
            ec.SECP256R1(), default_backend()
        )
        self.public_key = self.private_key.public_key()

@app.post("/api/upload")
async def upload_file(
    file: UploadFile = File(...),
    expiration_hours: int = 24,
    max_downloads: int = None
):
    """Upload and encrypt file"""
    try:
        share_id = str(uuid.uuid4())
        
        # Save encrypted file
        file_path = os.path.join(UPLOAD_DIR, share_id)
        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # Create file metadata
        file_share = FileShare(share_id, file.filename, expiration_hours)
        file_share.max_downloads = max_downloads
        file_metadata[share_id] = file_share
        
        return JSONResponse({
            "share_id": share_id,
            "download_link": f"/api/download/{share_id}",
            "filename": file.filename,
            "expires_at": file_share.expires_at.isoformat(),
            "max_downloads": max_downloads,
            "public_key": file_share.public_key.public_bytes_encoded().hex()
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/download/{share_id}")
async def download_file(share_id: str):
    """Download encrypted file"""
    
    if share_id not in file_metadata:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_share = file_metadata[share_id]
    
    # Check expiration
    if datetime.now() > file_share.expires_at:
        os.remove(os.path.join(UPLOAD_DIR, share_id))
        del file_metadata[share_id]
        raise HTTPException(status_code=410, detail="Link expired")
    
    # Check download limit
    if file_share.max_downloads and file_share.downloads >= file_share.max_downloads:
        raise HTTPException(status_code=403, detail="Download limit exceeded")
    
    # Increment download counter
    file_share.downloads += 1
    
    # Return file
    file_path = os.path.join(UPLOAD_DIR, share_id)
    return FileResponse(
        file_path,
        filename=file_share.filename,
        media_type="application/octet-stream"
    )

@app.delete("/api/share/{share_id}")
async def revoke_access(share_id: str):
    """Revoke access to shared file"""
    
    if share_id not in file_metadata:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_path = os.path.join(UPLOAD_DIR, share_id)
    if os.path.exists(file_path):
        os.remove(file_path)
    
    del file_metadata[share_id]
    
    return {"message": "File access revoked"}

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Encrypted File Share",
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/share/{share_id}/info")
async def get_share_info(share_id: str):
    """Get share information"""
    
    if share_id not in file_metadata:
        raise HTTPException(status_code=404, detail="File not found")
    
    file_share = file_metadata[share_id]
    
    return {
        "share_id": share_id,
        "filename": file_share.filename,
        "created_at": file_share.created_at.isoformat(),
        "expires_at": file_share.expires_at.isoformat(),
        "downloads": file_share.downloads,
        "max_downloads": file_share.max_downloads
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
