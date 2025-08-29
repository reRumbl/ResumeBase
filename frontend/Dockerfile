# --- Build Stage ---
FROM node:24-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --force

COPY . .
RUN npm run build

# --- Production Stage ---
FROM nginx:1.29.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]