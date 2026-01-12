#--------Build---------#
FROM node:20-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

#--------Serve----------#
FROM nginx:alpine AS serve

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build ./app/build usr/share/nginx/html/

COPY ./nginx/config.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
#---- runs Nginx in the foreground so the container stays alive and shuts down correctly.