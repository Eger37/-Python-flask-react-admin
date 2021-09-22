#!/bin/bash
app="docker.edt1"
docker build -t ${app} .
docker run --rm -p 5000:5000 \
  --name=${app} \
  python3 app.py-
#  -v $PWD:/app ${app}

#sudo bash start.sh