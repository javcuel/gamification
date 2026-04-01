# Usamos una versión ligera de Node
FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto que usa tu server.js (5000)
EXPOSE 5000

# Comando para arrancar
CMD ["node", "server.js"]