# Stage 1
FROM node:14.15.4 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/twitch-followed-channels /usr/share/nginx/html
ENV PORT=4200
EXPOSE 4200
CMD ["npm", "start"]
