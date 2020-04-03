<script>
  import {
    Navbar,
    Block,
    Link,
    Popup,
    Button,
    Icon,
    ListInput,
    List,
    ListItem,
    Toggle,
    BlockTitle
  } from "framework7-svelte";
  import remote from '../remote-controller'
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  function forceReload() {
    location.reload(true);
  }

  export function open() {
    opened = true;
  }
  export function close() {
    opened = false;
  }
</script>

<Popup push {opened}>
  <Navbar title="Options">
    <div slot="left" />
    <div slot="right">
      <Link on:click={close}>Close</Link>
    </div>
  </Navbar>
  <Block>
    <List>
      <ListItem title="Force reload" on:click={forceReload}>
        <div slot="media">
          <Icon f7="arrow_clockwise" />
        </div>
      </ListItem>
    </List>

    <BlockTitle>Settings</BlockTitle>
    <List>
      <ListItem>
        <span>Auto connect</span>
        <Toggle checked={remote.autoReconnect.get()} on:toggleChange={e => remote.autoReconnect.set(e.detail[0])} />
      </ListItem>
    </List>
    WIP
  </Block>
</Popup>
