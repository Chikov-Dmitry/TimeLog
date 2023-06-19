FROM node:16-alpine as builder

#ENV NODE_ENV development

#add turborepo
RUN npm install turbo --global

# Set working directory
WORKDIR /app

# Install app dependencies
COPY  ["package-lock.json", "package.json", "./"]

# Copy source files
COPY . .

# Install app dependencies
RUN npm install

CMD cd apps/client && npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=builder app/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


