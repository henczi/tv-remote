import { ServiceWSChannel } from "./service-channel";
import { MouseWSChannel } from "./mouse-channel";

export class ButtonHelper {
  constructor(private service: ServiceWSChannel, private mouse: MouseWSChannel) {}

  channelUp() {
    this.service.request('ssap://tv/channelUp');
  }

  channelDown() {
    this.service.request('ssap://tv/channelDown');
  }

  volumeUp(){
    this.service.request('"ssap://audio/volumeUp');
  }

  volumeDown(){
    this.service.request('ssap://audio/volumeDown');
  }
  

}