import { PersistentWebStore } from '../../core/dist/lib/util/store';
import { ClientKeyStore } from '../../core/dist/lib/util/keystore';
import { LgWebOSTvDeviceService, LgWebOSTvDeviceServiceConfig } from '../../core/dist/lib/webos';

LgWebOSTvDeviceServiceConfig.WebSocket = window.CustomWebSocket || WebSocket;

class RemoteController {
  constructor() {
    this.connectTimeout = null;
    this.destination = null;
    this.autoReconnect = new PersistentWebStore('LG_WEBOS_AUTO_RECONNECT');
    this.lastConnected = new PersistentWebStore('LG_WEBOS_LAST_CONNECTED');
    this.keyStore = new ClientKeyStore('LG_WEBOS_CLIENT_KEYS');
    this.device = window.webosService = new LgWebOSTvDeviceService({
      onConnected: () => {
        console.log('connected')
        if (this.connectTimeout) clearTimeout(this.connectTimeout);
        this.device.register('PROMPT', this.destination && this.destination.key || undefined);
      },
      onDisconnected: () => {
        console.log('disconnected')
        this.destination = null;
        if (this.ondisconnected) this.ondisconnected();
      },
      onPairing: (type, setpin) => {
        console.log('pairing', type);
        if (type == "PIN")
          setpin(prompt('Pin?'))
      },
      onRegistered: (clientKey) => {
        if (this.destination.save) {
          this.keyStore.add(this.destination.name, this.destination.uri, clientKey);
        }
        this.lastConnected.set(this.destination);
        webosService.connectMouse(); // TODO: integrate flow
        if (this.onready) this.onready();
      },
      onError: (err) => {
        console.log('error', err)
        if (this.onerror) this.onerror(err);
      }
    });
  }

  init() {
    if (this.autoReconnect.get() == true)
      this.doAutoReconnect();
  }

  listConnections() {
    return this.keyStore.list();
  }

  connectTo(uri, name) {
    this.destination = { uri, name, save: name != null };
    this.connect();
  }

  doAutoReconnect() {
    const last = this.lastConnected.get();
    if (last) {
      this.destination = last;
      this.connect();
    }
  }

  connect() {
    if (this.onconnecting) this.onconnecting();
    this.device.connect(this.destination.uri);
    this.connectTimeout = setTimeout(() => this.disconnect(), 3500);
  }

  disconnect() {
    this.autoReconnect.set(false)
    this.device.disconnect();
  }
}

export default new RemoteController;