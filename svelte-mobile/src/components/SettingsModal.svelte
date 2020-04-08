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
    List,
    ListItem,
    Toggle,
    BlockTitle,
    ListItemCell,
    Range
  } from "framework7-svelte";
  import remote from "../remote-controller";
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  let autoReconnect = false;

  function forceReload() {
    location.reload(true);
  }

  function update() {
    autoReconnect = remote.autoReconnect.get();
  }

  export function open() {
    update();
    opened = true;
  }
  export function close() {
    opened = false;
  }
</script>

<Popup push {opened}>
  <Page>
    <Navbar title="Options">
      <div slot="left" />
      <div slot="right">
        <Link on:click={close}>Close</Link>
      </div>
    </Navbar>
    <List>
      <ListItem title="Force reload" on:click={forceReload}>
        <span slot="media">
          <Icon f7="arrow_clockwise" />
        </span>
      </ListItem>
    </List>

    <BlockTitle>Settings</BlockTitle>
    <List>
      <ListItem>
        <span>Auto connect</span>
        <Toggle
          checked={autoReconnect}
          on:toggleChange={e => remote.autoReconnect.set(e.detail[0])} />
      </ListItem>
    </List>

    <BlockTitle>TODO: Mouse sensitivity</BlockTitle>
    <List>
      <ListItem>
        <ListItemCell class="width-auto flex-shrink-0">
          <Icon color="gray" f7="move" />
        </ListItemCell>
        <ListItemCell>
          <Range min={0} max={100} step={1} value={10} />
        </ListItemCell>
      </ListItem>
      <ListItem>
        <ListItemCell class="width-auto flex-shrink-0">
          <Icon color="gray" f7="chevron_up_chevron_down" />
        </ListItemCell>
        <ListItemCell>
          <Range min={0} max={100} step={1} value={10} />
        </ListItemCell>
      </ListItem>
    </List>
  </Page>
</Popup>
