#!/bin/bash
/usr/local/bin/python -m uvicorn app.main:app --host 0.0.0.0 --port 8080
