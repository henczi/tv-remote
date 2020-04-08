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
    List
  } from "framework7-svelte";
  import remote from '../remote-controller';
  import AspectRatio from "./AspectRatio.svelte";
  import FlexFill from "./FlexFill.svelte";
  import IconButton from "./IconButton.svelte";
  let opened;

  let hostname = 'LGwebOSTV'

  function connect() {
    let uri = `ws://${hostname}:3000`;
    remote.connectTo(uri);
    close();
  }

  export function open() {
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
        <ListInput value={hostname} on:input={(e) => hostname = e.detail[0].target.value} type="text" placeholder="Connect to ... (192.168.0.100)" />
      </List>
      <Button on:click={connect}>Connect</Button>

      <BlockTitle>Saved items</BlockTitle>
      <List inset>
      </List>
      TODO
    </Block>
  </Page>
</Popup>
