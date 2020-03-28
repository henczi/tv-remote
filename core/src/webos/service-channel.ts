import { WSChannel, WSChannelListener } from "./channel";
import { PairingType } from "./models/pairing-type";
import { defaultPermissions } from "./models/permissions";
import { WSChannelState } from "./models/channel-state";

export interface MessageHandler {
  (response: ServerMessage, context?: MessageContext): void;
}

export interface MessageContext {
  request: ClientMessage;
  handler: MessageHandler;
}

export interface ClientMessage {
  type: "hello" | "register" | "request" | "subscribe" | "unsubscribe" | "p2p";
  id?: string;
  uri?: string;
  payload?: object;
}

export interface ServerMessage {
  type: "error" | "hello" | "registered" | "response" | "p2p";
  id?: string;
  payload?: any;
  error?: string;
}

export class ServiceWSChannel extends WSChannel {
  nextRequestId = 1;
  messageContextMap: { [id: string]: MessageContext } = {};

  constructor(protected listener?: WSChannelListener) {
    super(listener);
  }

  private createRequestId() { return (this.nextRequestId++).toString(); }

  private createRequest(request: ClientMessage, handler?: MessageHandler) {
    if (handler) {
      const id = this.createRequestId();
      request.id = id;
      this.messageContextMap[id] = {
        request,
        handler
      }
      // timout - remove handler
      // if (request.type !== 'subscribe') setTimeout(() => delete this.messageContextMap[id], 3000);
    }
    this.send(JSON.stringify(request));
  }

  register(pairingType: PairingType, clientKey: string, handler: MessageHandler) {
    this.createRequest({
      type: 'register',
      payload: {
        pairingType: pairingType,
        'client-key': clientKey || undefined,
        manifest: {
          permissions: defaultPermissions
        }
      }
    }, handler);
  }

  registerPin(pin: string) {
    this.request('ssap://pairing/setPin', { pin });
  }

  getPointerInputSocket(handler: MessageHandler) {
    this.request('ssap://com.webos.service.networkinput/getPointerInputSocket', undefined, handler);
  }

  request(uri: string, payload?: object, handler?: MessageHandler) {
    this.createRequest({ type: 'request', uri, payload }, handler);
  }

  // return subscription?
  subscibe(uri: string, handler: MessageHandler) {
    this.createRequest({ type: 'subscribe', uri }, handler);
  }

  unsubscribe(uri: string, handler: MessageHandler) {
    // find id?
    this.createRequest({ type: 'unsubscribe', uri }, handler);
  }

  handleMessage(raw: string) {
    const message = JSON.parse(raw) as ServerMessage;
    const messageContext = message.id && this.messageContextMap[message.id] || undefined;
    switch (message.type) {
      case "error":
        this.listener?.onError({ message: message.error, context: messageContext });
        if (messageContext) {
          delete this.messageContextMap[message.id];
        }
        break;
      case "response":
        if (messageContext) {
          if (messageContext.handler)
            messageContext.handler(message)
          if (messageContext.request.type !== "subscribe" && messageContext.request.type !== "register")
            delete this.messageContextMap[message.id];
        }
        break;
      case "registered":
        if (messageContext) {
          delete this.messageContextMap[message.id];
        }
        break;
      default:
        console.log('Unhandled message', message);
        break;
    }
  }

  protected stateChangeEvent(newState: WSChannelState) {
    super.stateChangeEvent(newState);
  }

  protected messageEvent(m: any) {
    super.messageEvent(m);
    this.handleMessage(m);
  }

  protected reset() {
    super.reset();
    this.nextRequestId = 1;
  }

}