import { WSChannel, WSChannelListener } from "./channel";

export interface MouseInterface {
  click(): void;
  button(keyName: string): void;
  move(dx: number, dy: number, drag: boolean): void;
  scroll(dx: number, dy: number): void;
}

export class MouseWSChannel extends WSChannel implements MouseInterface {

  constructor(listener?: WSChannelListener) {
    super(listener);
  }

  protected messageEvent(m: any) {
    super.messageEvent(m);
    console.log('message', m)
  }

  protected reset() {
    super.reset();
  }

  click(){
    this.send(`type:click\n\n`);
  }
  
  button(keyName: string){
    this.send(`type:button\nname:${ keyName }\n\n`);
  }

  move(dx: number, dy: number, drag: boolean = false){
    this.send(`type:move\ndx:${ dx }\ndy:${ dy }\ndown:${ drag ? 1 : 0 }\n\n`);
  }

  scroll(dx: number, dy: number){
    this.send(`type:scroll\ndx:${ dx }\ndy:${ dy }\n\n`);
  }

}