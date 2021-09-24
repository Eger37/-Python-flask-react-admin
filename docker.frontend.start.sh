#!/bin/bash
app="docker.edt1.frontend"
docker build -t ${app} -f DockerfileFrontend .
docker run --rm -d -p 3001:3001 ${app}



#sudo bash docker.frontend.start.sh

#docker run --rm  -p 3001:3001 docker.edt1.frontend