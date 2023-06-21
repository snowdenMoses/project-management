FROM nginx:1.22-alpine
EXPOSE 80

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/nginx.conf
# COPY ./default.conf /etc/nginx/conf.d/default.conf
