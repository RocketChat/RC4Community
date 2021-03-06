FROM node:14

# Copy the current directory contents into the container working directory
COPY . /rc4git/

# install dependencies for client
RUN npm install --prefix rc4git/client

# Set the working directory
WORKDIR /rc4git/server

# install dependencies for server
RUN npm install

# install nodemon
RUN npm install nodemon -g

# Make port 8090 available to the world outside this container
EXPOSE 8090

# Run the app when the container launches
CMD ["npm", "run", "prod"]