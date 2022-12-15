<script lang='ts'>
  import { Router, Route, link } from 'svelte-routing';
  import About from '@pages/About/about.svelte';
  import Home from '@pages/Home/home.svelte';
  import { state } from '@stores/Route/route';
  import { onDestroy } from 'svelte';

  const { route } = state;

  let url = '';

  const routeUnsubscribe = route.subscribe((value) => {
    return url = value
  });

  onDestroy(routeUnsubscribe);

  export { url };
</script>

<!-- svelte-ignore missing-declaration -->
<div class="min-vh-100 d-flex flex-column justify-content-between">
  <Router {url}>
    <nav class='navbar navbar-expand-lg'>
      <div class='container-fluid'>
        <div class='collapse navbar-collapse' id='navbarNav'>
          <ul class='navbar-nav'>
            <li class='nav-item'>
              <a style:color={url === '' ? 'red' : ''} href='/' use:link>Home</a>
            </li>
            <li class='nav-item'>
              <a style:color={url === '/about' ? 'red' : ''} href='/about' use:link>About</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class='container py-4 px-3 mx-auto'>
      <Route path='/' component={Home} />
      <Route path='/about' component={About} />
    </div>
    <footer>
      <div>
        <a href='https://github.com/wdonray' target="_blank" rel="noreferrer">Github</a>
        <a href='https://www.linkedin.com/in/donrayxwilliams/' target="_blank" rel="noreferrer">LinkedIn</a>
      </div>

      <div>
        <span>Donray Williams</span>
      </div>

      <div>
        <span>Have fun!</span>
      </div>
    </footer>
  </Router>
</div>

<style lang='scss'>
  .navbar {
    a {
      color: #bdc1c6;
      &:first-of-type {
        margin-right: 10px;
      }
    }
  }
</style>
