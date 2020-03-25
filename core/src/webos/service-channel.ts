import { WSChannel } from "./channel";
import { pairingTypeString, PairingType } from "./models/pairing-type";
import { defaultPermissions } from "./models/permissions";
import { WSChannelState } from "./models/channel-state";

export class ServiceWSChannel extends WSChannel {
  nextRequestId = 1;
  requestsMap: { [id: string]: { request: object, handler: (response: object) => void } } = {};

  constructor() {
    super();
  }

  private createRequestId() { return (this.nextRequestId++).toString(); }

  private createRequest(request: { type: string, id?: string, uri?: string, payload?: object }, handler: () => void) {
    if (handler) {
      const id = this.createRequestId();
      request[id] = id;
      this.requestsMap[id] = {
        request,
        handler: (response) => console.log('req handler: ', response)
      }
      // timout - remove handler
      // if (request.type !== 'subscribe') setTimeout(() => delete this.requestsMap[id], 3000);
    }
    this.send(JSON.stringify(request));
  }

  register(pairingType: PairingType = PairingType.Prompt, clientKey?: string) {
    this.createRequest({
      type: 'register',
      payload: {
        pairingType: pairingTypeString(pairingType),
        'client-key': clientKey || undefined,
        manifest: {
          permissions: defaultPermissions
        }
      }
    }, console.log);
  }

  registerPin(pin: string) {
    // get ID
  }

  request(uri: string, payload?: object) {
    this.createRequest({
      type: 'request',
      uri,
      payload
    }, console.log);
  }

  // return subscription?
  subscibe(uri: string, /* handler */) {
    this.createRequest({
      type: 'subscribe',
      uri,
    }, console.log);
  }

  unsubscribe(uri: string, /* handler */) {
    // find id?
    this.createRequest({
      type: 'unsubscribe',
      uri,
    }, console.log);
  }

  stateChangeEvent(newState: WSChannelState) {
    super.stateChangeEvent(newState);
    console.log('state changed', newState);
  }

  messageEvent(m: any) {
    super.messageEvent(m);
    console.log('message', m)
  }

  reset() {
    super.reset();
    this.nextRequestId = 1;
  }

}