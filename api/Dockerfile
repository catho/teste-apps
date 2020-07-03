FROM node:12.18.2

ENV TZ 'America/Sao_Paulo'

WORKDIR /app/

COPY . /app/

RUN npm install

EXPOSE 4040

CMD ["npm", "start"]
