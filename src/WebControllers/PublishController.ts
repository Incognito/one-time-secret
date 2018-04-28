import { WebControllerInterface } from './WebControllerInterface';

export class PublishController implements WebControllerInterface {
  public execute(request, response) {
    if (request) {
      return response;
    }
  }
}
