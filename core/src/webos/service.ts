import { PairingType } from "./models/pairing-type";
import { ServiceWSChannel, MessageHandler } from "./service-channel";
import { MouseWSChannel, MouseInterface } from "./mouse-channel";
import { ButtonHelper } from "./button-helper";

export interface DeviceServiceListener {
  onConnected?: () => void;
  onDisconnected?: () => void;
  onPairing?: (pairingType: PairingType, setPin: (pin: string) => void) => void;
  onRegistered?: (clientKey?: string) => void;
  onError?: (error: any) => void;
}

export class DeviceService {
  private listener: DeviceServiceListener;
  private serviceChannel = new ServiceWSChannel({
    onConnected: () => this.listener?.onConnected(),
    onClosed: () => this.listener?.onDisconnected(),
    onError: (error) => this.listener?.onError(error),
  });
  private mouseChannel = new MouseWSChannel({
    onError: (error) => this.listener?.onError(error),
  });
  private buttonHelper = new ButtonHelper(this.serviceChannel, this.mouseChannel);

  get connectionState() { return this.serviceChannel.state; }

  get mouse(): MouseInterface { return this.mouseChannel; }
  get buttons() { return this.buttonHelper; }

  constructor(_listener: DeviceServiceListener) {
    this.listener = _listener;
  }

  connect(uri: string) {
    this.serviceChannel.connect(uri);
  }

  register(pairingType: PairingType, clientKey: string) {
    // pin, response
    this.serviceChannel.register(pairingType, clientKey, (response) => {
      if (response.payload.pairingType != null) {
        this.listener.onPairing(response.payload.pairingType, (pin) => {
          this.serviceChannel.registerPin(pin);
        });
      } else {
        this.listener.onRegistered();
      }
    });
  }

  connectMouse() {
    this.serviceChannel.getPointerInputSocket((response) => {
      this.mouseChannel.connect(response.payload.socketPath);
    })
  }

  disconnectMouse() {
    this.mouseChannel.disconnect();
  }

  disconnect() {
    this.serviceChannel.disconnect();
    this.mouseChannel.disconnect();
  }
  
}