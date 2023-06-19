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

EXPOSE 3000

CMD cd apps/server && npm run dev


