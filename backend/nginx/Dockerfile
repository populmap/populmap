FROM		debian:buster

RUN			apt-get update -y
RUN			apt-get upgrade -y
RUN			apt-get install -y nginx vim dumb-init

RUN			chmod +x /usr/bin/dumb-init

COPY		nginx.conf /etc/nginx/conf.d/nginx.conf

# Don't use nginx default server
RUN			rm -rf /etc/nginx/sites-enabled/default

# Handle Every Signal Correctly by Dumb Init to PID 1
ENTRYPOINT	["/usr/bin/dumb-init", "--", "nginx", "-g", "daemon off;"]

# CMD ["tail", "-f", "/dev/null"]

