#!/bin/bash
app="docker.edt1.frontend.admin"
docker build -t ${app} -f DockerfileFrontendAdmin .
docker run --rm -d -p 3000:3000 ${app}

#sudo bash docker.frontendAdmin.start.sh

#docker run --rm  -p 3000:3000 docker.edt1.frontend.admin