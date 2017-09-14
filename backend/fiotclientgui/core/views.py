import os
import json

from django.http.response import HttpResponse
from django.http import Http404
from django.views.decorators.csrf import csrf_exempt
from fiotclient import iot
from fiotclient import context

from fiotclientgui import settings


CONFIG_FILE_PATH = os.path.join(settings.BASE_DIR, 'config.ini')

client_iot = iot.FiwareIotClient(CONFIG_FILE_PATH)
client_context = context.FiwareContextClient(CONFIG_FILE_PATH)


@csrf_exempt
def services_view(request):
    if request.method == 'GET':  # Retrieves all services allowed to logged user
        return HttpResponse("services GET")

    elif request.method == 'POST':  # Creates a new service
        service_name = request.POST["service_name"]
        service_path = request.POST["service_path"]
        api_key = request.POST["api_key"]

        response = client_iot.create_service(service_name, service_path, api_key)
        return HttpResponse(json.dumps(response), content_type='application/json')

        # curl --data "service_name=TestService&service_path=/testservice&api_key=11asd123jfakambaksdj94qwa" localhost:8000/services/

    elif request.method == 'PUT':  # Updates a service
        return HttpResponse("services PUT")

    elif request.method == 'DELETE':  # Deletes a service
        return HttpResponse("services DELETE")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def entities_view(request):
    if request.method == 'GET':  # Returns all entities from service
        response = client_context.get_entities_by_type('thing')  # TODO Change to return from all types
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'POST':  # Creates a new entity
        return HttpResponse("entities POST")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def entity_view(request, entity_id):
    if request.method == 'GET':  # Returns entity details
        response = client_context.get_entity_by_id(entity_id)
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'PUT':  # Updates entity details
        return HttpResponse("entity " + entity_id + " PUT")

    elif request.method == 'DELETE':  # Deletes an entity details
        return HttpResponse("entity " + entity_id + " DELETE")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def subscriptions_view(request, entity_id):
    if request.method == 'GET':  # Retrieves all subscriptions of an entity
        return HttpResponse("subscriptions for entity " + entity_id + " GET")

    elif request.method == 'POST':  # Creates a new subscription on an entity
        return HttpResponse("subscriptions for entity " + entity_id + " POST")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def subscription_view(request, entity_id, subscription_id):
    if request.method == 'GET':  # Retrieves details of entity subscription
        return HttpResponse("subscriptions for entity " + entity_id + " with id " + subscription_id + " GET")

    elif request.method == 'PUT':  # Updates information of entity subscription
        return HttpResponse("subscriptions for entity " + entity_id + " with id " + subscription_id + " PUT")

    elif request.method == 'DELETE':  # Deletes an entity subscription
        return HttpResponse("subscriptions for entity " + entity_id + " with id " + subscription_id + " DELETE")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def devices_view(request):
    if request.method == 'GET':  # Retrieves all devices registered on current service
        response = client_iot.list_devices()
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'POST':  # Registers a new device
        device_schema = request.POST["device_schema"]
        device_id = request.POST["device_id"]
        entity_id = request.POST["entity_id"]
        device_ip = request.POST["device_ip"]
        device_port = request.POST["device_port"]
        protocol = request.POST["protocol"]

        client_iot.register_device(device_schema, device_id, entity_id, device_ip=device_ip, device_port=device_port,
                                   protocol=protocol)  # TODO Register device with json schema string

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def device_view(request, device_id):
    if request.method == 'GET':  # Retrieves device details
        return HttpResponse("device " + device_id + " GET")

    elif request.method == 'PUT':  # Updates device info
        return HttpResponse("device " + device_id + " PUT")

    elif request.method == 'DELETE':  # Deletes a device
        return HttpResponse("device " + device_id + " DELETE")

    else:
        raise Http404("Unsupported method")
