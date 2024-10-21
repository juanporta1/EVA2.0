# Usar la imagen de Node.js versión 20-alpine
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación en modo producción
CMD ["npm", "run", "start"]
