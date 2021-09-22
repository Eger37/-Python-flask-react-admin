FROM python:3.9
WORKDIR /app

COPY requirements.txt app.py config.json ./
COPY api/* ./api/


RUN pip install -r ./requirements.txt

# WORKDIR /app/api
# RUN ["ls"]

EXPOSE 5000

CMD python app.py



# docker run --rm -p 5000:5000 pyramid python3 app.py
