import { WSChannel } from "./channel";
import { WSChannelState } from "./models/channel-state";

export class MouseWSChannel extends WSChannel {

  constructor() {
    super();
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
  }

  click(){
    this.send(`type:click\n\n`);
  }
  
  button(keyName){
    this.send(`type:button\nname:${ keyName }\n\n`);
  }

  move(dx: number, dy: number, drag: boolean = false){
    this.send(`type:move\ndx:${ dx }\ndy:${ dy }\ndown:${ drag ? 1 : 0 }\n\n`);
  }

  scroll(dx: number, dy: number){
    this.send(`type:scroll\ndx:${ dx }\ndy:${ dy }\n\n`);
  }

}