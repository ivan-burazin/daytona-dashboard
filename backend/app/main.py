from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Daytona Dashboard API")

# Configure CORS for production
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://daytona-dashboard.onrender.com")
PORT = int(os.getenv("PORT", "8080"))

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)

DAYTONA_API_KEY = os.getenv("DAYTONA_API_KEY")
DAYTONA_SERVER_URL = os.getenv("DAYTONA_SERVER_URL", "https://api-a0534c9b-df6d-40f5-8657-792993bc24ec.try-eu.daytona.app")

headers = {
    "Authorization": f"Bearer {DAYTONA_API_KEY}"
}

@app.get("/workspace")
async def list_workspaces():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DAYTONA_SERVER_URL}/workspace", headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.post("/workspace")
async def create_workspace(workspace: dict):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{DAYTONA_SERVER_URL}/workspace", headers=headers, json=workspace)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.delete("/workspace/{workspace_id}")
async def delete_workspace(workspace_id: str):
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{DAYTONA_SERVER_URL}/workspace/{workspace_id}", headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.get("/apikey")
async def list_api_keys():
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{DAYTONA_SERVER_URL}/apikey", headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.post("/apikey/{key_name}")
async def create_api_key(key_name: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(f"{DAYTONA_SERVER_URL}/apikey/{key_name}", headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

@app.delete("/apikey/{key_name}")
async def delete_api_key(key_name: str):
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{DAYTONA_SERVER_URL}/apikey/{key_name}", headers=headers)
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        return response.json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
