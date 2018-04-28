import { WebControllerInterface } from './WebControllerInterface'

export class FetchController(){
  constructor(
    // TODO belongs in special home
    private secureDataStore
  ) { }
  public execute(request, response) {
    // TODO belongs in special home
    const targetRecord = 'TODO'
    if (!secureDataStore.has(targetRecord)) {
      // todo return early, 404
    }

    if (secureDataStore.get(targetRecord)) {
      // todo get data and return with template
    }
  }
}
