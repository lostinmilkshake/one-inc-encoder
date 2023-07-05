FROM node AS base
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn run build

FROM nginx:alpine AS prod
WORKDIR /usr/share/nginx/html
COPY --from=base /app/dist .
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]