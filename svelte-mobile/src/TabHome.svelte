<script>
  import {
    App,
    View,
    Page,
    Icon,
    Navbar,
    Block,
    Button,
    Row,
    Col
  } from "framework7-svelte";
  import { keyboard } from "./bridge";
  import remote from "./remote-controller";
  import AspectRatio from "./components/AspectRatio.svelte";
  import FlexFill from "./components/FlexFill.svelte";
  import IconButton from "./components/IconButton.svelte";
  import KeyboardModal from "./components/KeyboardModal.svelte";
  import MouseController from "./components/MouseController.svelte";
  let numpad;
</script>

<style>

</style>

<Row noGap>
  <Col width={75} large={25}>
    <Row>
      <Col width={100}>
        <AspectRatio ratio={1}>
          <FlexFill vertical>
            <FlexFill>
              <IconButton
                icon="house"
                secondaryBtn
                on:click={() => remote.device.buttons.home()} />
              <IconButton
                icon="chevron_compact_up"
                on:click={() => remote.device.buttons.up()} />
              <IconButton
                icon="globe"
                secondaryBtn
                on:click={() => remote.device.service.launchBrowser()} />
            </FlexFill>
            <FlexFill>
              <IconButton
                icon="chevron_compact_left"
                on:click={() => remote.device.buttons.left()} />
              <IconButton
                icon="square"
                on:click={() => remote.device.buttons.enter()} />
              <IconButton
                icon="chevron_compact_right"
                on:click={() => remote.device.buttons.right()} />
            </FlexFill>
            <FlexFill>
              <IconButton
                icon="arrow_turn_down_left"
                secondaryBtn
                on:click={() => remote.device.buttons.back()} />
              <IconButton
                icon="chevron_compact_down"
                on:click={() => remote.device.buttons.down()} />
              <IconButton
                icon="square_arrow_left"
                secondaryBtn
                on:click={() => remote.device.buttons.exit()} />
            </FlexFill>
          </FlexFill>
        </AspectRatio>
      </Col>
      <Col width={100}>
        <AspectRatio ratio={3}>
          <FlexFill>
            <IconButton
              flexBasis={1}
              icon="gear_alt"
              on:click={() => remote.device.buttons.menu()} />
            <IconButton
              flexBasis={1}
              icon="keyboard"
              on:click={() => keyboard.open()} />
            <IconButton
              flexBasis={1}
              icon="play_rectangle_fill"
              on:click={() => remote.device.service.launchYouTube()} />
          </FlexFill>
        </AspectRatio>
      </Col>
    </Row>
  </Col>
  <Col width={25}>
    <Row>
      <Col width={100} large={50}>
        <AspectRatio ratio={1 / 2}>
          <FlexFill vertical>
            <IconButton
              flexBasis={5}
              icon="chevron_up"
              on:click={() => remote.device.buttons.channelUp()} />
            <IconButton
              flexBasis={1}
              icon="info"
              secondaryBtn
              on:click={() => remote.device.buttons.info()} />
            <IconButton
              flexBasis={5}
              icon="chevron_down"
              on:click={() => remote.device.buttons.channelDown()} />
          </FlexFill>
        </AspectRatio>
      </Col>
      <Col width={100} large={50}>
        <AspectRatio ratio={1 / 2}>
          <FlexFill vertical>
            <IconButton
              flexBasis={5}
              icon="plus"
              on:click={() => remote.device.buttons.volumeUp()} />
            <IconButton
              flexBasis={1}
              icon="speaker_slash"
              secondaryBtn
              on:click={() => remote.device.buttons.mute()} />
            <IconButton
              flexBasis={5}
              icon="minus"
              on:click={() => remote.device.buttons.volumeDown()} />
          </FlexFill>
        </AspectRatio>
      </Col>
    </Row>
  </Col>
  <Col width={100}>
    <AspectRatio ratio={5 / 2}>
      <MouseController />
    </AspectRatio>
  </Col>
</Row>
