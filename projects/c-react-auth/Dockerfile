FROM nginx:1.21.4

RUN yarn install && yarn build

# 复制 Web 资源目录
COPY build/ /usr/share/nginx/webapp
COPY nginx.conf /etc/nginx/conf.d/default.conf
