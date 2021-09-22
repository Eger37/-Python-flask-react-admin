#!/bin/bash
app="docker.edt1"
docker build -t ${app} .
docker run --rm -p 5000:5000 \
  --name=${app} \
#  python app.py -d
#  -v $PWD:/app ${app}

#sudo bash start.sh

#docker run --rm  -p 5000:5000 docker.test