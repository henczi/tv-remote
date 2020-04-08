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
    Tab,
    Block,
    BlockFooter
  } from "framework7-svelte";
  import { onMount } from "svelte";
  import remote from "./remote-controller";
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
  let settingsModal;
  let connectModal;
  let ok = false;

  let connected = false;
  let channels = [];
  let launchPoints = [];

  remote.onconnecting = function() {
    showLoading();
  };

  remote.ondisconnected = function() {
    connected = false;
    hideLoading();
    connectModal.open();
  };

  remote.onready = function() {
    connected = true;
    hideLoading();
    connectModal.close();
    init();
  };

  remote.onerror = function(err) {
    hideLoading();
    f7.toast
      .create({
        text: err.message || "Hiba!",
        position: "bottom",
        closeTimeout: 2000,
        closeButton: true
      })
      .open();
  };

  function showLoading() {
    f7.dialog.preloader("Connecting...");
  }

  function hideLoading() {
    f7.dialog.close();
  }

  function init() {
    remote.device.service.listChannels(x => (channels = x.channelList));
    remote.device.service.listLaunchPoints(
      x => (launchPoints = x.launchPoints)
    );
  }

  function powerOff() {
    f7.dialog.confirm(
      "Biztosan kikapcsolja a készüléket?",
      "Kikapcsolás",
      () => {
        remote.device.service.powerOff();
        remote.disconnect();
      },
      () => {}
    );
  }
  onMount(() => {
    f7ready(() => {
      remote.init();
    });
  });
</script>

<style>
  :global(.tabs-animated-wrap > .tabs > .tab) {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
</style>

<App>
  <View>
    <Page>
      <Navbar {title}>
        <div slot="left">
          <IconButton
            color="red"
            icon="power"
            on:click={powerOff}
            disabled={!connected} />
        </div>
        <div slot="right">
          <FlexFill>
            {#if connected}
              <IconButton
                icon="bolt_slash_fill"
                on:click={() => remote.disconnect()} />
            {:else}
              <IconButton
                icon="bolt_fill"
                on:click={() => connectModal.open()} />
            {/if}
            <IconButton
              color="gray"
              icon="gear"
              on:click={() => settingsModal.open()} />
          </FlexFill>
        </div>
      </Navbar>
      {#if connected}
        <Toolbar tabbar labels bottom>
          <Link tabLink="#tabHome" text="Home" iconF7="house" tabLinkActive />
          <Link tabLink="#tabNumpad" text="Numpad" iconF7="number" />
          <Link tabLink="#tabChannels" text="Channels" iconF7="tv" />
          <Link tabLink="#tabLaunch" text="Launch" iconF7="rocket" />
        </Toolbar>
        <Tabs animated>
          <Tab id="tabHome" tabActive>
            <TabHome />
          </Tab>
          <Tab id="tabNumpad">
            <TabNumpad />
          </Tab>
          <Tab id="tabChannels">
            <TabChannels {channels} />
          </Tab>
          <Tab id="tabLaunch">
            <TabLaunch {launchPoints} />
          </Tab>
        </Tabs>
      {/if}
    </Page>
    <KeyboardModal />
    <SettingsModal bind:this={settingsModal} />
    <ConnectModal bind:this={connectModal} />
  </View>
</App>
