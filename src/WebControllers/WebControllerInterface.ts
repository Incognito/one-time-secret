import { IncomingMessage, ServerResponse } from 'http';

export interface WebControllerInterface {
  execute(request: IncomingMessage, response: ServerResponse): void;
}
