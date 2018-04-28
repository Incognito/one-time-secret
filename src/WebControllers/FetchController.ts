import { WebControllerInterface } from './WebControllerInterface';

export class FetchController implements WebControllerInterface {
  public execute(request, response) {
    if (request) {
      return response;
    }
  }
}
