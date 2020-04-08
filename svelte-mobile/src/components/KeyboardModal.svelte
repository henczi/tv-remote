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
  import { keyboard } from "../bridge";
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  keyboard.open = function() {
    opened = true;
  };
  keyboard.close = function() {
    opened = false;
  };
</script>

<Popup push {opened}>
  <Page>
    <Navbar title="Keyboard">
      <div slot="left" />
      <div slot="right">
        <Link on:click={keyboard.close}>Close</Link>
      </div>
    </Navbar>
    <Block>
      <List inset>
        <ListInput type="text" placeholder="Text" />
      </List>
      <Button light large on:click={keyboard.close}>
        <Icon f7="chevron_down" />
      </Button>
    </Block>
  </Page>
</Popup>
