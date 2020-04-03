<script>
  import {
    f7,
    f7ready,
    App,
    View,
    Page,
    Navbar,
    Link,
    Toolbar,
    Tabs,
    Tab
  } from "framework7-svelte";
  import { onMount } from "svelte";
  import remote from './remote-controller';
  import AspectRatio from "./components/AspectRatio.svelte";
  import FlexFill from "./components/FlexFill.svelte";
  import IconButton from "./components/IconButton.svelte";
  import KeyboardModal from "./components/KeyboardModal.svelte";
  import SettingsModal from "./components/SettingsModal.svelte";
  import ConnectModal from "./components/ConnectModal.svelte";
  import MouseController from "./components/MouseController.svelte";
  import TabHome from "./TabHome.svelte";
  import TabNumpad from "./TabNumpad.svelte";
  import TabChannels from "./TabChannels.svelte";
  import TabLaunch from "./TabLaunch.svelte";
  export let title;
  let settings;
  let connect;
  let ok = false;

  remote.onconnecting = function() {
    showLoading();
  }

  remote.ondisconnected = function() {
    hideLoading();
    connect.open();
  }

  remote.onready = function() {
    hideLoading();
    connect.close();
  }

  remote.onerror = function(err) {
    f7.toast.create({
      text: err.message || 'Hiba!',
      position: 'bottom',
      closeTimeout: 2000,
      closeButton: true,
    }).open();
  }

  function showLoading() {
    f7.dialog.preloader('Connecting...')
  }

  function hideLoading() {
    f7.dialog.close()
  }

  function powerOff() {
    f7.dialog.confirm(
      'Biztosan kikapcsolja a készüléket?',
      'Kikapcsolás',
      () => { console.log('OFF') },
      () => {}
    )
  }
  onMount(() => {
    f7ready(() => {
      remote.init();
    })
  })
</script>

<style>

</style>

<App>
  <View>
    <Page>
      <Navbar {title}>
        <div slot="left">
          <IconButton color="red" icon="power" on:click={powerOff} />
        </div>
        <div slot="right">
          <FlexFill>
            <IconButton icon="bolt_slash_fill" on:click={() => remote.disconnect()} />
            <IconButton color="gray" icon="gear" on:click={() => settings.open()} />
          </FlexFill>
        </div>
      </Navbar>
      <Toolbar tabbar labels bottom>
        <Link tabLink="#tabHome" text="Home" iconF7="house" tabLinkActive />
        <Link tabLink="#tabNumpad" text="Numpad" iconF7="number" />
        <Link tabLink="#tabChannels" text="Channels" iconF7="tv" />
        <Link tabLink="#tabLaunch" text="Launch" iconF7="rocket" />
      </Toolbar>
      <Tabs>
        <Tab id="tabHome" tabActive>
          <TabHome />
        </Tab>
        <Tab id="tabNumpad">
          <TabNumpad />
        </Tab>
        <Tab id="tabChannels">
          <TabChannels />
        </Tab>
        <Tab id="tabLaunch">
          <TabLaunch />
        </Tab>
      </Tabs>
    </Page>
    <KeyboardModal />
    <SettingsModal bind:this={settings} />
    <ConnectModal bind:this={connect} />
  </View>
</App>
