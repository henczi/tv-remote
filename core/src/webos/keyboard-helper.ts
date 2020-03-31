import { ServiceWSChannel } from "./service-channel";

export class KeyboardHelper {
  constructor(private service: ServiceWSChannel) {}

  enter() {
    this.service.request('ssap://com.webos.service.ime/sendEnterKey');
  }

  insertReplace(text: string, replace: number) {
    this.service.request('ssap://com.webos.service.ime/insertText', { text, replace });
  }

  deleteCharacters(count: number) {
    this.service.request('ssap://com.webos.service.ime/deleteCharacters', { count });
  }

  insert(text: string) {
    this.insertReplace(text, 0);
  }

  backspace() {
    this.deleteCharacters(1);
  }

  fromKeyCode(keyCode: number) {
    if (13 /* ENTER */ === keyCode) {
      this.enter();
    } else if(8 /* BACKSPACE */ === keyCode) {
      this.backspace();
    } else {
      // TODO: whitelist
      this.insert(String.fromCharCode(keyCode));
    }
  }
}