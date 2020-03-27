import { WSChannelState } from "./models/channel-state";

const WSImpl: typeof WebSocket = WebSocket;

export interface WSChannelListener {
  onConnected?: () => void;
  onClosed?: () => void;
  onError?: (error?: any) => void;
}

export abstract class WSChannel {
  private _hostUri: string = '';
  private _ws: WebSocket | null = null;

  private _state = WSChannelState.Disconnected;
  get state() {
    return this._state;
  }

  constructor(private _listener: WSChannelListener) { }

  protected stateChangeEvent(newState: WSChannelState) {
    console.log('newState: ', newState)
    this._state = newState;
  }

  protected messageEvent(m: any) { 
    console.log('message: ', m)
  }

  send(message: string) {
    if (!this._ws) throw new Error('no socket');
    this._ws.send(message);
  }

  connect(uri: string) {
    this._hostUri = uri;
    this.disconnect();
    this._ws = new WSImpl(this._hostUri);
    this.stateChangeEvent(WSChannelState.Connecting);
    this._ws.addEventListener('open', () => (this.stateChangeEvent(WSChannelState.Connected), this._listener?.onConnected()));
    this._ws.addEventListener('close', () => (this.disconnect(), this._listener?.onClosed()));
    this._ws.addEventListener('error', () => (this.disconnect(), this._listener?.onError()));
    this._ws.addEventListener('message', (m) => this.messageEvent(m));
  }

  disconnect() {
    if (this._ws) {
      this.stateChangeEvent(WSChannelState.Disconnecting);
      this._ws.close();
      // TODO: socket finalize
      // if ((this._ws as any).finalize) (this._ws as any).finalize();
    }
    this.reset();
    this.stateChangeEvent(WSChannelState.Disconnected)
    this._ws = null;
  }

  protected reset() {};
}
