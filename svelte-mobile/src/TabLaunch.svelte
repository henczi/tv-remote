<script>
  import { List, ListItem } from "framework7-svelte";
  import remote from "./remote-controller";


  export let launchPoints;
  // launchPointId, id, icon, title
</script>

<style>

</style>

{#if launchPoints && launchPoints.length}
  <List>
  {#each launchPoints as lp}
    <ListItem title={lp.title} footer={lp.systemApp ? 'System' : 'Custom'} on:click={() => remote.device.service.launchApp(lp.id)} >
      <img width="60" height="60" src={lp.icon} alt="Icon" slot="media">
    </ListItem>
  {/each}
  </List>
{:else}
  <List>
    <ListItem title="Nothing found" />
  </List>
{/if}
