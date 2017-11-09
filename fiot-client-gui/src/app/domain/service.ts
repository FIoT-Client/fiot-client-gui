export class Service {
  serviceName = '';
  servicePath = '';
  apiKey = '';

  toServerJSON() {
    return {
      'service_name': this.serviceName,
      'service_path': this.servicePath,
      'api_key': this.apiKey
    };
  }
}
