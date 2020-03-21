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
  import AspectRatio from "./components/AspectRatio.svelte";
  import FlexFill from "./components/FlexFill.svelte";
  import IconButton from "./components/IconButton.svelte";
  import NumpadModal from "./components/NumpadModal.svelte";
  import KeyboardModal from "./components/KeyboardModal.svelte";
  export let title;
  let numpad;
  let keyboard;
</script>

<style>
:global(.page-content) {
  display: flex;
  flex-direction: column;
}
:global(.page-content > .row) {
  margin-top: auto;
}
</style>

<App>
  <View>
    <Page>
      <Navbar {title}>
        <div slot="left">
          <IconButton color="red" icon="power" />
        </div>
        <div slot="right">
          <IconButton color="gray" icon="gear" />
        </div>
      </Navbar>
      <Row noGap>
        <Col width={66} large={33}>
          <Row>
            <Col width={100}>
              <AspectRatio ratio={1}>
                <FlexFill vertical>
                  <FlexFill>
                    <IconButton icon="house" secondaryBtn />
                    <IconButton icon="chevron_compact_up" />
                    <IconButton icon="globe" secondaryBtn />
                  </FlexFill>
                  <FlexFill>
                    <IconButton icon="chevron_compact_left" />
                    <IconButton icon="square" />
                    <IconButton icon="chevron_compact_right" />
                  </FlexFill>
                  <FlexFill>
                    <IconButton icon="arrow_turn_down_left" secondaryBtn />
                    <IconButton icon="chevron_compact_down" />
                    <IconButton icon="square_arrow_left" secondaryBtn />
                  </FlexFill>
                </FlexFill>
              </AspectRatio>
            </Col>
            <Col width={100}>
              <AspectRatio ratio={3}>
                <FlexFill>
                  <IconButton flexBasis={1} icon="tv" />
                  <IconButton
                    flexBasis={1}
                    icon="keyboard"
                    on:click={() => keyboard.open()} />
                  <IconButton flexBasis={1} icon="rocket" />
                </FlexFill>
              </AspectRatio>
            </Col>
          </Row>
        </Col>
        <Col width={33}>
          <Row>
            <Col width={100} large={50}>
              <AspectRatio ratio={1 / 2}>
                <FlexFill vertical>
                  <IconButton flexBasis={5} icon="chevron_up" />
                  <IconButton flexBasis={1} icon="info" secondaryBtn />
                  <IconButton flexBasis={5} icon="chevron_down" />
                </FlexFill>
              </AspectRatio>
            </Col>
            <Col width={100} large={50}>
              <AspectRatio ratio={1 / 2}>
                <FlexFill vertical>
                  <IconButton flexBasis={5} icon="plus" />
                  <IconButton flexBasis={1} icon="speaker_slash" secondaryBtn />
                  <IconButton flexBasis={5} icon="minus" />
                </FlexFill>
              </AspectRatio>
            </Col>
          </Row>
        </Col>
        <Col width={100}>
          <hr />
          <AspectRatio ratio={8}>
            <FlexFill>
              <IconButton
                flexBasis={1}
                icon="number"
                on:click={() => numpad.open()} />
              <IconButton flexBasis={1} icon="gear_alt" />
              <IconButton flexBasis={1} icon="star" />
              <IconButton flexBasis={1} icon="play_rectangle_fill" />
            </FlexFill>
          </AspectRatio>
        </Col>
      </Row>
    </Page>
    <NumpadModal bind:this={numpad} />
    <KeyboardModal bind:this={keyboard} />
  </View>
</App>
