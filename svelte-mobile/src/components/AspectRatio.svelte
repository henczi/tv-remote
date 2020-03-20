<script>
	export let ratio = 1;
</script>

<div class="outer" style="--aspect-ratio: {1 / ratio * 100}%">
	<div class="inner">
		<slot/>
	</div>
</div>

<style>
.outer {
	position: relative;
  width: 100%;
  height: 0;
  padding-bottom: var(--aspect-ratio);
}
.inner {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>