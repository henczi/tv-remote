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
  <Navbar title="Connect">
    <div slot="left" />
    <div slot="right">
      <Link on:click={close}>Close</Link>
    </div>
  </Navbar>
  <Block>
    WIP
  </Block>
</Popup>
