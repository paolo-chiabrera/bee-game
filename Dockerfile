FROM quay.io/d3lirium/basic-frontend

MAINTAINER Paolo Chiabrera <paolo.chiabrera@gmail.com>

# cache npm install

ADD package.json /tmp/package.json

RUN cd /tmp && npm install --dev

RUN mkdir -p /home/app && cp -a /tmp/node_modules /home/app/

# copy the app content

ADD . /home/app

WORKDIR /home/app

RUN npm run build

# overwrite nginx config

RUN yes | cp ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-s", "reload"]
