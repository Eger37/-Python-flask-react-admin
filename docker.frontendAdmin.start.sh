#!/bin/bash
app="docker.edt1.frontend.admin"
docker build -t ${app} -f DockerfileFrontendAdmin .
docker run --rm -p 3000:3000 \
  --name=${app} \


#sudo bash docker.frontend.admin.start.sh

#docker run --rm  -p 3000:3000 docker.edt1.frontend.admin