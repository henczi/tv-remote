import { ServiceWSChannel } from "./service-channel";

export class ServiceHelper {
  constructor(private service: ServiceWSChannel) {}

  powerOff() {
    this.service.request('ssap://system/turnOff');
  }

  enter() {
    this.service.request('ssap://com.webos.service.ime/sendEnterKey');
  }
  
  channelUp() {
    this.service.request('ssap://tv/channelUp');
  }

  channelDown() {
    this.service.request('ssap://tv/channelDown'); 
  }

  volumeUp() {
    this.service.request('"ssap://audio/volumeUp');
  }

  volumeDown() {
    this.service.request('ssap://audio/volumeDown');
  }

  getVolume(callback) {
    this.service.request('ssap://audio/setVolume', undefined, (response) => callback(response.payload));
  }

  setVolume(volume: number) {
    this.service.request('ssap://audio/setVolume', { volume });
  }

  getMute(callback) {
    this.service.request('ssap://audio/getMute', undefined, (response) => callback(response.payload));
  }

  setMute(mute: boolean) {
    this.service.request('ssap://audio/setMute', { mute });
  }

  set3DOn() {
    this.service.request('ssap://com.webos.service.tv.display/set3DOn');
  }

  set3DOff() {
    this.service.request('ssap://com.webos.service.tv.display/set3DOff');
  }

  openUrl(target: string) {
    this.service.request('ssap://system.launcher/open', { target });
  }

  createToast(message: string) {
    this.service.request('ssap://system.notifications/createToast', { message });
  }

  listChannels(callback: (payload: any) => void) {
    this.service.request('ssap://tv/getChannelList', undefined, (response) => callback(response.payload));
  }

  openChannel(channelId: number) {
    this.service.request('ssap://tv/openChannel', { channelId });
  }

  listLaunchPoints(callback: (payload: any) => void) {
    this.service.request('ssap://com.webos.applicationManager/listLaunchPoints', undefined, (response) => callback(response.payload));
  }

  launchApp(id: string) {
    this.service.request('ssap://system.launcher/launch', { id });
  }

  launchTV() {
    this.launchApp('com.webos.app.livetv');
  }

  launchYouTube() {
    this.launchApp('youtube.leanback.v4');
  }

  launchBrowser() {
    this.launchApp('com.webos.app.browser');
  }

  getChannelProgramInfo(channelId, callback: (payload: any) => void) {
    this.service.request('ssap://tv/getChannelProgramInfo', { channelId }, (response) => callback(response.payload));
  }

  getCurrentChannelProgramInfo(callback: (payload: any) => void) {
    this.service.request('ssap://tv/getChannelProgramInfo', undefined, (response) => callback(response.payload));
  }

  subscribeKeyboard(callback: (payload: any) => void) {
    this.service.subscibe('ssap://com.webos.service.ime/registerRemoteKeyboard', (response) => callback(response.payload))
  }

  unsubscribeKeyboard() {
    // TODO
  }
}