#    socket io  
FROM python:3.9.13

WORKDIR /
COPY ./backend .
RUN pip3 install python-socketio
RUN pip3 install uvicorn
RUN pip3 install uvicorn[standard]
RUN pip3 install aioredis
RUN pip3 install redis
RUN pip3 install mysql-connector-python
RUN pip3 install python-dotenv
RUN pip3 install flask
RUN pip3 install six
RUN pip3 install gunicorn
RUN pip3 install gevent
RUN pip3 install mysql-connector-python
# RUN apt-get update
# RUN apt-get -y install redis-server
# RUN apt-get install redis
# RUN ps aux | grep redis-server