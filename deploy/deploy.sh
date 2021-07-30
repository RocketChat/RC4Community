#!/bin/sh

# Deployment script for the application

# Change directory to app
cd ../app

# Create community.rocket.chat directory
ssh root@$SERVER_IP 'sudo mkdir -p /var/www/community.rocket.chat'

# Change Directory to the out folder
cd out

# Change ownership of the folder (optional)
# ssh ubuntu@$SERVER_IP 'sudo chown ubuntu /var/www/community.rocket.chat'

# Securely copy the files to the server
scp -i ~/.ssh/id_rsa -r * root@$SERVER_IP:/var/www/community.rocket.chat

# Change ownership of the folder (optional)
# ssh ubuntu@$SERVER_IP 'sudo chown ubuntu /etc/nginx/sites-available'

# Securely copy the config file to the server
scp -i ~/.ssh/id_rsa ../../deploy/community.rocket.chat root@$SERVER_IP:/etc/nginx/sites-available

# Create symlink to enable the site
ssh root@$SERVER_IP 'sudo ln -s /etc/nginx/sites-available/community.rocket.chat /etc/nginx/sites-enabled/community.rocket.chat'

# Restart the nginx service
ssh root@$SERVER_IP 'sudo systemctl restart nginx'
