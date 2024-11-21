FROM python:3.8-slim

WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y wget

RUN wget https://storage.googleapis.com/atlas-training-model/LLMmodel.h5

ENV CUDA_VISIBLE_DEVICES=""

EXPOSE 3000

CMD ["python", "app.py"]