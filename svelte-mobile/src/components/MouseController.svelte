<script>
  import nipplejs from "nipplejs";
  import remote from '../remote-controller'
  import { onMount } from "svelte";
  import { Icon } from "framework7-svelte";

  let scrollJoystickContainer;
  let moveJoystickContainer;
  let scrollJoystick;
  let moveJoystick;

  onMount(() => {
    scrollJoystick = nipplejs.create({
      zone: scrollJoystickContainer,
      color: "red",
      size: 50,
      lockY: true
    });
    let sendScroll = false;
    let scrollData = null;
    function doSendScroll() {
      if (!sendScroll || !scrollData) return; 
      remote.device.mouse.scroll(scrollData.vector.x * 100, scrollData.vector.y * 100);
      setTimeout(doSendScroll, 100);
    }
    scrollJoystick.on('end', () => sendScroll = false);
    scrollJoystick.on('move', (event, data) => (scrollData = data, sendScroll || doSendScroll(sendScroll = true)));

    moveJoystick = nipplejs.create({
      zone: moveJoystickContainer,
      color: "red",
      size: 75
    });
    let sendMove = false;
    let moveData = null;
    let moveStartTS = 0;
    function doSendMove() {
      if (!sendMove || !moveData) return;
      const dx = moveData.vector.x * 2.5 * moveData.force;
      const dy = moveData.vector.y * 2.5 * moveData.force;
      remote.device.mouse.move(dx, -dy);
      setTimeout(doSendMove, 20);
    }
    function moveEnd() {
      const now = (new Date()).getTime();
      if (now - moveStartTS < 100) {
        remote.device.mouse.click();
      }
    }
    moveJoystick.on('end', () => (sendMove = false, moveEnd()));
    moveJoystick.on('move', (event, data) => (moveData = data, sendMove || (sendMove = true, setTimeout(() => doSendMove()))));
    moveJoystick.on('start', () => moveStartTS = (new Date()).getTime());
  });
</script>

<style>
  .mouse-control-area {
    height: 100%;
    display: flex;
    -webkit-user-select: none;
  }
  .joystick-container {
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(0,0,0,0.15);
  }
  .joystick-container:nth-child(1) {
    width: 30%;
  }
  .joystick-container:nth-child(2) {
    width: 70%;
  }
</style>

<div class="mouse-control-area">
  <div bind:this={scrollJoystickContainer} class="joystick-container">
    <Icon f7="chevron_up_chevron_down" />
  </div>
  <div bind:this={moveJoystickContainer} class="joystick-container">
    <Icon f7="move" />
  </div>
</div>
