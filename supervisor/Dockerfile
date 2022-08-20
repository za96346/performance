#####################  superVisor  #####################
FROM ubuntu:13.04 AS supervisorOS
RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" > /etc/apt/sources.list
RUN apt-get update
RUN apt-get upgrade -y

RUN apt-get install -y supervisor
RUN mkdir -p /var/log/supervisor

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

#####################  python  #####################
FROM python:3.9.13 AS pythonBackend

WORKDIR /
COPY ./backend .
RUN pip3 install flask
RUN pip3 install six
RUN pip3 install gunicorn
RUN pip3 install gevent
RUN pip3 install mysql-connector-python
RUN pip3 install python-socketio
RUN pip3 install uvicorn
RUN pip3 install uvicorn[standard]
RUN pip3 install aioredis
RUN pip3 install redis
RUN apt-get update
RUN apt-get -y install redis-server
RUN apt-get install redis
RUN ps aux | grep redis-server