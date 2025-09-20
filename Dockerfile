FROM nginxinc/nginx-unprivileged:1.29-alpine

WORKDIR /app

USER ROOT
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx src/ .

USER nginx
EXPOSE 8080
