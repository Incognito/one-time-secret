import { WebControllerInterface } from './WebControllerInterface';

export class AuthorController implements WebControllerInterface {
  public execute(request, response) {
    if (request) {
      return response;
    }
  }
}
