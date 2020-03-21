<script>
  import {
    Navbar,
    Block,
    Link,
    Popup,
    Button,
    Icon
  } from "framework7-svelte";
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  export let opened;

  export function open() {
    opened = true;
  }
  export function close() {
    opened = false;
  }
</script>

<Popup push {opened}>
  <Navbar title="Numpad">
    <div slot="left">
    </div>
    <div slot="right">
      <Link on:click={close}>Close</Link>
    </div>
  </Navbar>
    <Block>
      <AspectRatio ratio={3 / 4}>
        <FlexFill vertical>
          <FlexFill>
            <IconButton content="1" />
            <IconButton content="2" />
            <IconButton content="3" />
          </FlexFill>
          <FlexFill>
            <IconButton content="4" />
            <IconButton content="5" />
            <IconButton content="6" />
          </FlexFill>
          <FlexFill>
            <IconButton content="7" />
            <IconButton content="8" />
            <IconButton content="9" />
          </FlexFill>
          <FlexFill>
            <IconButton icon="arrow_turn_down_left" />
            <IconButton content="0" />
            <IconButton icon="checkmark_alt" />
          </FlexFill>
        </FlexFill>
      </AspectRatio>
      <Button light large on:click={close}>
        <Icon f7="chevron_down" />
      </Button>
    </Block>
</Popup>
