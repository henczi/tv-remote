<script>
  import {
    Navbar,
    Page,
    Block,
    BlockTitle,
    Link,
    Popup,
    Button,
    Icon,
    ListInput,
    List,
    ListItem,
    Toggle
  } from "framework7-svelte";
  import remote from "../remote-controller";
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  let saveConnection = false;
  let hostname = "LGwebOSTV";
  let name = "";

  let list = [];

  function connect() {
    let uri = `ws://${hostname}:3000`;
    remote.connectTo(uri, (saveConnection && name) || undefined);
    close();
  }

  function removeElement(name) {
    remote.removeSelected(name);
    updateList();
  }

  function updateList() {
    list = remote.listConnections();
  }

  export function open() {
    updateList();
    opened = true;
  }
  export function close() {
    opened = false;
  }
</script>

<Popup push {opened}>
  <Page>
    <Navbar title="Connect">
      <div slot="left" />
      <div slot="right">
        <Link on:click={close}>Close</Link>
      </div>
    </Navbar>
    <Block>
      <List inset>
        <ListInput input={false}>
          <input
            slot="input"
            type="text"
            bind:value={hostname}
            placeholder="Connect to ... (192.168.0.100)" />
        </ListInput>
        <ListItem textColor="gray">
          <span>Save connection</span>
          <Toggle
            checked={saveConnection}
            on:change={() => (saveConnection = !saveConnection)} />
        </ListItem>
        {#if saveConnection}
          <ListInput input={false}>
            <input
              slot="input"
              type="text"
              bind:value={name}
              placeholder="Name (Home)" />
          </ListInput>
        {/if}
      </List>
      <Button on:click={connect}>Connect</Button>

      <BlockTitle>Saved connections</BlockTitle>
      <List inset>
        {#each list as item}
          <ListItem title={item.name} footer={item.uri}>
            <span slot="before-title">
              <IconButton
                icon="smallcircle_fill_circle_fill"
                on:click={() => remote.connectToSelected(item.name)} />
            </span>
            <span slot="after">
              <IconButton
                icon="trash"
                color="red"
                on:click={() => removeElement(item.name)} />
            </span>
          </ListItem>
        {/each}
      </List>
    </Block>
  </Page>
</Popup>
