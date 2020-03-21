<script>
  import {
    Navbar,
    Block,
    Link,
    Popup,
    Button,
    Icon,
    ListInput,
    List
  } from "framework7-svelte";
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  export function open() {
    opened = true;
  }
  export function close() {
    opened = false;
  }
</script>

<Popup push {opened}>
  <Navbar title="Keyboard">
    <div slot="left">
    </div>
    <div slot="right">
      <Link on:click={close}>Close</Link>
    </div>
  </Navbar>
    <Block>
      <List inset>
        <ListInput type="text" placeholder="Text" />
      </List>
      <Button light large on:click={close}>
        <Icon f7="chevron_down" />
      </Button>
    </Block>
</Popup>
