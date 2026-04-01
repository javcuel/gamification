FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Vite por defecto usa el 5173
EXPOSE 5173

# Necesitamos --host para que Docker pueda exponer el puerto
CMD ["npm", "run", "dev", "--", "--host"]