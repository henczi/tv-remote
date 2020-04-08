<script>
  import { Block, Searchbar, List, ListItem, Icon } from "framework7-svelte";
  import remote from "./remote-controller";


  export let channels;
  // channelName, channelId
</script>

<style>

</style>

{#if channels && channels.length}
  <!-- <Block>
      <Searchbar inline searchContainer=".search-list" searchIn=".item-title" />
  </Block>
  <List class="searchbar-not-found">
    <ListItem title="Nothing found" />
  </List> -->
  <List class="search-list">
    {#each channels as ch}
      <ListItem title={ch.channelName} after={ch.channelNumber} footer={ch.channelType} on:click={() => remote.device.service.openChannel(ch.channelId)} >
        <span slot="media">
          <Icon f7={ch.TV ? 'tv' : 'antenna_radiowaves_left_right'} />
        </span>
      </ListItem>
    {/each}
  </List>
{:else}
  <List>
    <ListItem title="Empty ..." />
  </List>
{/if}
