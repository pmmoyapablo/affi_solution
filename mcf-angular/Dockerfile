# Etapa de construcción
FROM node:20.11.1-alpine AS builder

# Instalar dependencias necesarias
RUN apk add --no-cache python3 make g++ git

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY package*.json ./
COPY lerna.json ./
COPY tsconfig*.json ./

# Copiar todos los package.json de los microfrontends
COPY packages/*/package*.json ./packages/

# Instalar dependencias
RUN npm install -g npm@8.19.4
RUN npm install --legacy-peer-deps

# Copiar el código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos
COPY --from=builder /app/packages/root-config/dist /usr/share/nginx/html
COPY --from=builder /app/packages/*/dist /usr/share/nginx/html/packages/

# Exponer el puerto
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 