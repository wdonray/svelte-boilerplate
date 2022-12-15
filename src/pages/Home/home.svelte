<script lang='ts'>
  import { state } from '@stores/Route/route';
  import { onMount } from 'svelte'

  const { route, isHome } = state;
  
  onMount(() => {
    route.set('');
    isHome.set(true);
  });

</script>

<div class="d-flex flex-column">
  <h1 class="display-1">Svelte Boilerplate</h1>
  <span class="lead">- Donray Williams</span> 
</div>