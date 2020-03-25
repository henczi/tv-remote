import { ClientKeyStore } from "./keystore";
import { PairingType } from "./models/pairing-type";
import { ServiceWSChannel } from "./service-channel";
import { MouseWSChannel } from "./mouse-channel";

export interface DeviceServiceListener {
  onConnected: () => void;
  onPairing: (pairingType: PairingType) => void;
  onRegistered: () => void;
  onError: (error: any) => void;
}

export class DeviceService {
  private listener: DeviceServiceListener;
  private keyStore = new ClientKeyStore('LG_WEBOS_CLIENT_KEYS');
  private serviceChannel = new ServiceWSChannel();
  private mouseChannel = new MouseWSChannel();

  get connectionState() { return this.serviceChannel.state; }

  constructor(_listener: DeviceServiceListener) {
    this.listener = _listener;
  }

  connect(uri: string) {
    this.serviceChannel.connect(uri);
  }

  register(pairingType: PairingType = PairingType.Prompt, clientKey?: string) {
    this.serviceChannel.register(pairingType, clientKey);
  }

  disconnect() {
    if (this.serviceChannel) this.serviceChannel.disconnect();
    if (this.mouseChannel) this.mouseChannel.disconnect();
  }
  
}