FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

# Adds requirements.txt file
ADD requirements.txt /code/

# Install requirements
RUN pip install -r requirements.txt

ADD . /code/

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
