FROM nginxinc/nginx-unprivileged:1.29-alpine

USER ROOT
COPY --chown=nginx:nginx src/ /usr/share/nginx/html

USER nginx
EXPOSE 8080

