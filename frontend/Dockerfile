FROM node:22.12.0-slim@sha256:a4b757cd491c7f0b57f57951f35f4e85b7e1ad54dbffca4cf9af0725e1650cd8 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build-production

FROM nginx:alpine AS runner
RUN rm /etc/nginx/conf.d/default.conf
COPY /nginx/nginx.conf /etc/nginx/conf.d
COPY --from=builder /app/dist /usr/share/nginx/html