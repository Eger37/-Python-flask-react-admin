#!/bin/bash
app="docker.edt1.frontend"
docker build -t ${app} -f DockerfileFrontend .
docker run --rm -p 3001:3001 \
  --name=${app} \


#sudo bash docker.frontend.start.sh

#docker run --rm  -p 3001:3001 docker.edt1.frontend