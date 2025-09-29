FROM node:22-slim

RUN apt-get update && apt-get install -y curl

WORKDIR /home/user/app

RUN npm create vite@latest . -- --template react --yes

# Install dependencies
RUN npm install
RUN npm install tailwindcss @tailwindcss/vite

RUN mv /home/user/app/* /home/user
RUN rm -rf /home/user/app

# vite.config.js should go directly
COPY assets/vite.config.js /home/user/vite.config.js
COPY assets/App.css /home/user/src/App.css
COPY assets/App.jsx /home/user/src/App.jsx
COPY assets/index.css /home/user/src/index.css

# Copy the bash script
COPY assets/start-dev.sh /home/user/start-dev.sh

# Make the script executable
RUN chmod +x /home/user/start-dev.sh

WORKDIR /home/user
# Expose Vite default port
ENV PORT=5173
EXPOSE $PORT
