from fastapi import FastAPI, HTTPException, Request
import json
import uvicorn
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from subgrounds import Subgrounds

app = FastAPI()
sg = Subgrounds()

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

SubgraphData = None
pretext = "Whatever you answer must first be from this given data as the knowledge base: "

def load_subgraph(endpoint: str):
    os_zk = sg.load_subgraph(endpoint)
    res = ""
    
    data = sg.query_df([
        os_zk.Query.mints
    ])
    res += data.to_string()
    res += " \n"
        
    data = sg.query_df([os_zk.Query.deploymentMaps])
    res += data.to_string()
    res += " \n"
    return res

def get_fine_tuned_text(query) -> str:
    final_text = pretext+SubgraphData+"Answer this query: "+query
    return final_text

def run_model(query):
    response = model.generate_content(query)
    return response.text

default_endpoint = "https://api.studio.thegraph.com/query/90589/ethvercel/version/latest"
load_subgraph(default_endpoint)

@app.get("/")
async def health_check():
    return "Running!"


@app.get("/load_subgraph")
async def get_subgraph(endpoint: str, query):
    text_subgraph_data = load_subgraph()
    # response = model.generate_content(pretext+SubgraphData+"Answer this query: "+query)    
    global SubgraphData
    SubgraphData = text_subgraph_data
    return "Subgraph loaded!"


@app.get("/askGPT")
async def query_model(query: str) -> str:
    fine_tuned_text = get_fine_tuned_text(query)
    response_text = run_model(fine_tuned_text)
    return response_text

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
    