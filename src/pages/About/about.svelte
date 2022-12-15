<script lang='ts'>
  import { state } from '@stores/Route/route';
  import { onMount } from 'svelte'

  const { route } = state;
  
  onMount(() => {
    route.set('/about');
  });
  
</script>

<div class="d-flex flex-column">
  <h1 class="display-1">This is just an example page</h1>
</div>