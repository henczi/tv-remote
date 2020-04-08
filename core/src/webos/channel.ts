import Config from './service-config';

export interface WSChannelListener {
  onConnected?: () => void;
  onClosed?: () => void;
  onError?: (error?: any) => void;
}

export abstract class WSChannel {
  private _hostUri: string = '';
  private _ws: WebSocket | null = null;

  constructor(protected _listener: WSChannelListener = {}) { }

  protected messageEvent(m: any) { 
    // console.log('message: ', m)
  }

  send(message: string) {
    if (!this._ws || this._ws.readyState !== this._ws.OPEN) {
      this._listener.onError?.(new Error('not connected'));
    }
    try {
      this._ws.send(message);
    } catch (err) {
      this._listener.onError(err);
    }
  }

  connect(uri: string) {
    this._hostUri = uri;
    this.disconnect();
    try {
      this._ws = new Config.WebSocket(this._hostUri);
      this._ws.onopen = () => (this._listener.onConnected?.());
      this._ws.onclose = () => (this.disconnect(), this._listener.onClosed?.());
      this._ws.onerror = () => (this.disconnect(), this._listener.onError?.(new Error('socket error')));
      this._ws.onmessage = (m) => this.messageEvent(m.data);
    } catch (err) {
      return this._listener.onError?.(err);
    }
  }

  disconnect() {
    if (this._ws) {
      this._ws.close();
      // TODO: socket finalize
      // if ((this._ws as any).finalize) (this._ws as any).finalize();
    }
    this.reset();
    this._ws = null;
  }

  protected reset() {};
}
