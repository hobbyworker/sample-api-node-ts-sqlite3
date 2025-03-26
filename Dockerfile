# 1. Base image: Latest LTS Node.js on Alpine Linux
FROM node:22.14-alpine AS build

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Install specific version of npm
RUN npm install -g npm@11.2.0

# 4. Copy package manifest files and install all dependencies (including devDependencies)
COPY package*.json ./
RUN npm ci

# 5. Copy the entire project into the container
COPY . .

# 6. Compile TypeScript into JavaScript
RUN npm run build


# -----------------------------------------
# Stage 2: Lightweight production image
# -----------------------------------------

FROM node:22.14-alpine AS production

# 1. Set working directory
WORKDIR /usr/src/app

# 2. Install specific version of npm again in production stage
RUN npm install -g npm@11.2.0

# 3. Copy package manifest files and install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# 4. Copy compiled JavaScript output from the build stage
COPY --from=build /usr/src/app/dist ./dist

# 5. Expose the application port
EXPOSE 3000

# 6. Define the startup command
CMD ["node", "dist/app.js"]
