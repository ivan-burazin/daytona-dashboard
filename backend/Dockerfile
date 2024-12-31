FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
RUN chmod +x start.sh

ENV PORT=8080
ENV PYTHONPATH=/app

ENTRYPOINT ["./start.sh"]
