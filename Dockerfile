FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

COPY build /usr/share/nginx/html
EXPOSE 80
EXPOSE 4000
EXPOSE 4001