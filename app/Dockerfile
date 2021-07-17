FROM node:14

# Copy the current directory contents into the container working directory
COPY . /rc4community/app/

# Set the working directory
WORKDIR /rc4community/app

# Install dependencies for client
RUN yarn

# Install PM2 globally
RUN yarn global add pm2

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run the app when the container launches
CMD [ "pm2-runtime", "npm", "--", "start" ]