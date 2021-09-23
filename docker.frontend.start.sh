#!/bin/bash
app="docker.edt1.frontend"
docker build -t ${app} -f DockerfileFrontend .
docker run --rm -p 3000:3000 \
  --name=${app} \


#sudo bash docker.frontend.start.sh

#docker run --rm  -p 3000:3000 docker.edt1.frontend