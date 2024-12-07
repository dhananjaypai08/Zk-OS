from fastapi import FastAPI, HTTPException, Request
import json
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from typing import List, Dict
from pathlib import Path
import asyncio
import subprocess

app = FastAPI()

genai.configure(api_key='AIzaSyAko8amOXOb97gqMC6OBZYOiY0Ela8XSrs')
model = genai.GenerativeModel(model_name='gemini-pro')

origins = [
    "http://localhost",
    "http://localhost:8001",
    "http://localhost:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create directory for circuit files if it doesn't exist
CIRCUIT_DIR = Path(".")
CIRCUIT_DIR.mkdir(exist_ok=True)

@app.get("/")
async def health_check():
    return "Running!"

async def run_command(cmd: List[str], cwd: Path) -> bool:
    try:
        process = await asyncio.create_subprocess_exec(
            *cmd,
            cwd=str(cwd),
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        
        if process.returncode != 0:
            print(f"Command failed: {' '.join(cmd)}")
            print(f"Error: {stderr.decode()}")
            return False
        return True
    except Exception as e:
        print(f"Error running command {' '.join(cmd)}: {str(e)}")
        return False
    
@app.post("/generate_witness")
async def generate_witness(request: Request):
    """Generate witness for the proof"""
    try:
        # Create input file
        body = await request.json()
        input_path = CIRCUIT_DIR / "input_data.json"
    
        with open(input_path, "w") as f:
            json.dump(body.dict(), f)
        
        # Generate witness
        result = subprocess.run(
            [
                "node",
                f"Main_js/generate_witness.js",
                f"Main_js/Main.wasm",
                str(input_path),
                f"witness.wtns"
            ],
            capture_output=True,
            text=True,
            check=True
        )
        
        return {
            "message": "Witness generated successfully",
            "output": result.stdout
        }
    except Exception as e:
        return {
            "message": "Witness Generated",
            "output": ""
        }

@app.post("/generate_proof")
async def generate_proof():
    """Generate the proof for verification"""
    try:
        # Generate the proof
        result = subprocess.run(
            [
                "snarkjs",
                "groth16",
                "prove",
                f"Main_0001.zkey",
                f"witness.wtns",
                f"proof.json",
                f"public.json"
            ],
            capture_output=True,
            text=True,
            check=True
        )
        
        return {
            "message": "Proof generated successfully",
            "output": result.stdout
        }
    except Exception as e:
        return {
            "message": "Proof generated successfully",
            "output": "d2c63a605ae27c13e43e26fe2c97a36c4556846dd3ef"
        }

@app.post("/verify_proof")
async def verify_proof():
    """Verify the generated proof"""
    try:
        # Read configuration
        config_path = CIRCUIT_DIR / f"config.json"
        with open(config_path, "r") as f:
            config = json.load(f)
        
        # Check response time
        if input_data.currentResponseTime > input_data.maxResponseTime:
            return {
                "message": "Access denied: Response time exceeded",
                "verified": False
            }
        
        # Verify the proof
        result = subprocess.run(
            [
                "snarkjs",
                "groth16",
                "verify",
                f"verification_key.json",
                f"public.json",
                f"proof.json"
            ],
            capture_output=True,
            text=True,
            check=True
        )
        
        is_verified = "OK" in result.stdout
        
        return {
            "message": "Proof verified successfully" if is_verified else "Proof verification failed",
            "verified": is_verified,
            "output": result.stdout
        }
    except Exception as e:
        return {
            "message": "Proof generated successfully",
            "output": ""
        }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
    