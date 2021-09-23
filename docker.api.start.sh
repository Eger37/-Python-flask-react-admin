#!/bin/bash
app="docker.edt1.api"
docker build -t ${app} -f DockerfileApi .
docker run --rm -p 5000:5000 \
  --name=${app} \
#  python app.py -d
#  -v $PWD:/app ${app}

#sudo bash docker.api.start.sh

#docker run --rm  -p 5000:5000 docker.edt.api