<script>
  import {
    Navbar,
    Page,
    Block,
    Link,
    Popup,
    Button,
    Icon,
    ListInput,
    List
  } from "framework7-svelte";
  import remote from '../remote-controller'
  import { keyboard } from "../bridge";
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  let input;

  function keydown(event) {
    const keyCode = event.keyCode;
    remote.device.keyboard.fromKeyCode(event.keyCode);
    if (keyCode == 13) {
      input.value = '';
    }
  }

  keyboard.open = function() {
    opened = true;
  };
  keyboard.close = function() {
    opened = false;
  };
</script>

<Popup push {opened} on:popupOpened={input.focus()} on:popupClose={input.blur()}>
  <Page>
    <Navbar title="Keyboard">
      <div slot="left" />
      <div slot="right">
        <Link on:click={keyboard.close}>Close</Link>
      </div>
    </Navbar>
    <Block>
      <List inset>
        <ListInput input={false} type="text" placeholder="Text" >
          <input slot="input" type="text" bind:this={input} on:keydown={keydown} />
        </ListInput>
      </List>
      <Button light large on:click={keyboard.close}>
        <Icon f7="chevron_down" />
      </Button>
    </Block>
  </Page>
</Popup>
