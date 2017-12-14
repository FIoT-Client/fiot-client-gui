FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

# Adds requirements.txt file
ADD requirements.txt /code/

# Install requirements
RUN pip install -r requirements.txt

RUN git clone https://github.com/FIoT-Client/fiot-client-python.git

RUN pip install -e fiot-client-python

ADD . /code/

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
