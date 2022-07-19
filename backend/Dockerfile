FROM python:3.9.13

WORKDIR /
ADD . .
RUN pip3 install flask
RUN pip3 install six
RUN pip3 install gunicorn
RUN pip3 install gevent
RUN pip3 install mysql-connector-python
RUN pip3 install python-socketio
Run pip3 install uvicorn
RUN pip3 install uvicorn[standard]
CMD gunicorn --config gunicorn.conf.py backend:app
#CMD python backend.py
EXPOSE 5000