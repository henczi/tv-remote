<script>
  import remote from './remote-controller';
  import AspectRatio from "./components/AspectRatio.svelte";
  import FlexFill from "./components/FlexFill.svelte";
  import IconButton from "./components/IconButton.svelte";
</script>

<style>

</style>

<AspectRatio ratio={3 / 4}>
  <FlexFill vertical>
    <FlexFill>
      <IconButton content="1" on:click={() => remote.device.buttons.num1()} />
      <IconButton content="2" on:click={() => remote.device.buttons.num2()} />
      <IconButton content="3" on:click={() => remote.device.buttons.num3()} />
    </FlexFill>
    <FlexFill>
      <IconButton content="4" on:click={() => remote.device.buttons.num4()} />
      <IconButton content="5" on:click={() => remote.device.buttons.num5()} />
      <IconButton content="6" on:click={() => remote.device.buttons.num6()} />
    </FlexFill>
    <FlexFill>
      <IconButton content="7" on:click={() => remote.device.buttons.num7()} />
      <IconButton content="8" on:click={() => remote.device.buttons.num8()} />
      <IconButton content="9" on:click={() => remote.device.buttons.num9()} />
    </FlexFill>
    <FlexFill>
      <IconButton icon="arrow_turn_down_left" on:click={() => remote.device.buttons.back()} />
      <IconButton content="0" on:click={() => remote.device.buttons.num0()} />
      <IconButton icon="checkmark_alt" on:click={() => remote.device.buttons.enter()} />
    </FlexFill>
  </FlexFill>
</AspectRatio>

<AspectRatio ratio={8 / 1}>
  <FlexFill>
    <IconButton icon="minus" color="red" on:click={() => remote.device.buttons.red()}  />
    <IconButton icon="minus" color="green" on:click={() => remote.device.buttons.green()}  />
    <IconButton icon="minus" color="yellow" on:click={() => remote.device.buttons.yellow()}  />
    <IconButton icon="minus" color="blue" on:click={() => remote.device.buttons.blue()}  />
  </FlexFill>
</AspectRatio>
