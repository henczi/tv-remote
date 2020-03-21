<script>
  import { Button, Icon } from 'framework7-svelte';
  export let icon = '';
  export let content = '';
  export let color = "blue";
  export let secondaryBtn = false;
  export let flexBasis = 1;
</script>

<style>
.btn {
  flex-basis: var(--flex-basis);
}
.btn :global(.button-element) {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn :global(.secondary-btn-icon) {
  opacity: 30%;;
}
</style>

<div class="btn" style="--flex-basis: {flexBasis}rem">
  <Button class="button-element {secondaryBtn ? 'secondary-btn-icon' : ''}" iconF7={icon} iconColor={color} light on:click>
    {content}
  </Button>
</div>
