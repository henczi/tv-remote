import { MouseWSChannel } from "./mouse-channel";

export class ButtonHelper {
  constructor(private mouse: MouseWSChannel) {}

  num0() { this.mouse.button('0'); }
  num1() { this.mouse.button('1'); }
  num2() { this.mouse.button('2'); }
  num3() { this.mouse.button('3'); }
  num4() { this.mouse.button('4'); }
  num5() { this.mouse.button('5'); }
  num6() { this.mouse.button('6'); }
  num7() { this.mouse.button('7'); }
  num8() { this.mouse.button('8'); }
  num9() { this.mouse.button('9'); }

  up() { this.mouse.button('UP'); }
  down() { this.mouse.button('DOWN'); }
  left() { this.mouse.button('LEFT'); }
  right() { this.mouse.button('RIGHT'); }

  red() { this.mouse.button('RED'); }
  blue() { this.mouse.button('BLUE'); }
  yellow() { this.mouse.button('YELLOW'); }
  green() { this.mouse.button('GREEN'); }

  back() { this.mouse.button('BACK'); }
  home() { this.mouse.button('HOME'); }
  dash() { this.mouse.button('DASH'); }
  enter() { this.mouse.button('ENTER'); }

  volumeUp() { this.mouse.button('VOLUMEUP'); }
  volumeDown() { this.mouse.button('VOLUMEDOWN'); }
  channelUp() { this.mouse.button('CHANNELUP'); }
  channelDown() { this.mouse.button('CHANNELDOWN'); }

  mute() { this.mouse.button('MUTE'); }

  info() { this.mouse.button('INFO'); }
  list() { this.mouse.button('LIST'); }
  menu() { this.mouse.button('MENU'); }
  qmenu() { this.mouse.button('QMENU'); }

  ad() { this.mouse.button('AD'); }
  guide() { this.mouse.button('GUIDE'); }

  exit() { this.mouse.button('EXIT'); }

}