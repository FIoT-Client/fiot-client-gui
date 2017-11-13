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

service_list = []


def load_context_parameters(request, context_client):
    service_name = request.GET.get("service_name", "")
    service_path = request.GET.get("service_path", "")
    context_client.set_service(service_name, service_path)
    return context_client


def load_iot_parameters(request, iot_client):
    service_name = request.GET.get("service_name", "")
    service_path = request.GET.get("service_path", "")
    api_key = request.GET.get("api_key", "")
    iot_client.set_service(service_name, service_path)
    iot_client.set_api_key(api_key)

    return iot_client


@csrf_exempt
def services_view(request):
    if request.method == 'GET':  # Retrieves all services allowed to logged user
        # services = [
        #     {'serviceName': 'Teste', 'servicePath': '/teste', 'apiKey': ''},
        #     {'serviceName': 'STELAService', 'servicePath': '/ufrn/imd/stela', 'apiKey': 'e7de7b88bad211e7a45d7200077c2c20'},
        #     {'serviceName': 'UFRNService', 'servicePath': '/ufrn', 'apiKey': '1111111111'},
        #     {'serviceName': 'DIMAPService', 'servicePath': '/ufrn/dimap', 'apiKey': '2222222222'},
        #     {'serviceName': 'IMDService', 'servicePath': '/ufrn/imd', 'apiKey': '3333333333'}
        # ]

        return HttpResponse(json.dumps({"status_code": 200, "response": service_list}), content_type='application/json')

    elif request.method == 'POST':  # Creates a new service
        request_body = json.loads(request.body)

        service_name = request_body.get("service_name")
        service_path = request_body.get("service_path")
        api_key = request_body.get("api_key", "")

        response = client_iot.create_service(service_name, service_path, api_key=api_key)

        if response['status_code'] == 201:
            service_list.append({
                'serviceName': service_name,
                'servicePath': service_path,
                'apiKey': response['api_key']
            })

        return HttpResponse(json.dumps(response), content_type='application/json')

        # curl --data "service_name=TestService&service_path=/testservice&api_key=11asd123jfakambaksdj94qwa" localhost:8000/services/

    elif request.method == 'PUT':  # Updates a service
        client = load_context_parameters(request, client_context)
        return HttpResponse("services PUT")

    elif request.method == 'DELETE':  # Deletes a service
        client = load_context_parameters(request, client_context)
        return HttpResponse("services DELETE")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def entities_view(request):
    if request.method == 'GET':  # Returns all entities from service
        client = load_context_parameters(request, client_context)
        response = client.get_entities_by_type('thing')  # TODO Change to return from all types
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'POST':  # Creates a new entity
        client = load_context_parameters(request, client_context)
        request_body = json.loads(request.body)

        entity_id = request_body.get("entity_id")
        entity_type = request_body.get("entity_type")
        entity_schema = request_body.get("entity_schema")

        # TODO Implement on FIoT-Client-Python
        response = client.create_entity(entity_id, entity_type, entity_schema)

        return HttpResponse(json.dumps(response), content_type='application/json')

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def entity_view(request, entity_id):
    if request.method == 'GET':  # Returns entity details
        client = load_context_parameters(request, client_context)
        response = client.get_entity_by_id(entity_id)
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'PUT':  # Updates entity details
        client = load_context_parameters(request, client_context)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("entity " + entity_id + " PUT")

    elif request.method == 'DELETE':  # Deletes an entity details
        client = load_context_parameters(request, client_context)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("entity " + entity_id + " DELETE")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def subscriptions_view(request, entity_id):
    if request.method == 'GET':  # Retrieves all subscriptions of an entity
        client = load_context_parameters(request, client_context)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("subscriptions for entity " + entity_id + " GET")

    elif request.method == 'POST':  # Creates a new subscription on an entity
        client = load_context_parameters(request, client_context)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("subscriptions for entity " + entity_id + " POST")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def subscription_view(request, entity_id, subscription_id):
    if request.method == 'GET':  # Retrieves details of entity subscription
        client = load_context_parameters(request, client_context)
        response = client.get_subscription_by_id(subscription_id)
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'PUT':  # Updates information of entity subscription
        client = load_context_parameters(request, client_context)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("subscriptions for entity " + entity_id + " with id " + subscription_id + " PUT")

    elif request.method == 'DELETE':  # Deletes an entity subscription
        client = load_context_parameters(request, client_context)
        response = client.unsubscribe(subscription_id)
        return HttpResponse(json.dumps(response), content_type='application/json')

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def devices_view(request):
    if request.method == 'GET':  # Retrieves all devices registered on current service
        client = load_iot_parameters(request, client_iot)
        response = client.list_devices()
        return HttpResponse(json.dumps(response), content_type='application/json')

    elif request.method == 'POST':  # Registers a new device
        client = load_iot_parameters(request, client_iot)
        request_body = json.loads(request.body)

        device_id = request_body.get("device_id")
        entity_id = request_body.get("entity_id")
        endpoint = request_body.get("endpoint", "")
        protocol = request_body.get("protocol", "")
        device_schema = request_body.get("device_schema")

        kwargs = {}
        if endpoint:
            kwargs['endpoint '] = endpoint
        if protocol:
            kwargs['protocol'] = protocol

        response = client.register_device(device_schema, device_id, entity_id, **kwargs)

        return HttpResponse(json.dumps(response), content_type='application/json')

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def device_view(request, device_id):
    if request.method == 'GET':  # Retrieves device details
        client = load_iot_parameters(request, client_iot)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("device " + device_id + " GET")

    elif request.method == 'PUT':  # Updates device info
        client = load_iot_parameters(request, client_iot)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("device " + device_id + " PUT")

    elif request.method == 'DELETE':  # Deletes a device
        client = load_iot_parameters(request, client_iot)
        # TODO Implement on FIoT-Client-Python
        return HttpResponse("device " + device_id + " DELETE")

    else:
        raise Http404("Unsupported method")


@csrf_exempt
def settings_view(request):
    if request.method == 'GET':  # Retrieves settings of the deploy
        instance_settings = {
            # IoT
            'idas': {
                'host': client_iot.idas_host,
                'admin_port': client_iot.idas_admin_port,
                'ul20_port': client_iot.idas_ul20_port,
                'api_key': client_iot.api_key
            },
            'mosquitto': {
                'host': client_iot.mosquitto_host,
                'port': client_iot.mosquitto_port
            },
            # Context
            'sth': {
                'host': client_context.sth_host,
                'port': client_context.sth_port
            },
            'cygnus': {
                'host': client_context.cygnus_host,
                'port': client_context.cygnus_port,
                'notification_host': client_context.cygnus_notification_host,
                'agents': [
                    {
                        'name': 'mysql',
                        'host': 'MYSQL_HOST',
                        'port': 'MYSQL_PORT'
                    },
                    {
                        'name': 'mongodb',
                        'host': 'MONGODB_HOST',
                        'port': 'MONGODB_PORT'
                    },
                    {
                        'name': 'elasticsearch',
                        'host': 'ELK_HOST',
                        'port': 'ELK_PORT'
                    }
                ]
            },
            'perseo': {
                'host': client_context.perseo_host,
                'port': client_context.perseo_port
            }
        }

        return HttpResponse(json.dumps({"status_code": 200, "response": instance_settings}), content_type='application/json')

    else:
        raise Http404("Unsupported method")
