<script>
  export let vertical = false;
</script>

<style>
.flex-container {
  height: 100%;
  display: flex;
  flex-direction: var(--flex-direction);
}
.flex-container > :global(*) {
  flex-grow: 1;
  flex-shrink: 1;
}
</style>

<div class="flex-container" style="--flex-direction: {vertical ? 'column' : 'row'}">
  <slot></slot>
</div>