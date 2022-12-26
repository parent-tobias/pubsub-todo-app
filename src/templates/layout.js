import toHtml from '../util/toHtml';

const Layout = {
  el: toHtml(`<main class='container'>
  <header class="border-b-2 border-purple-500">
    <h1 class='title text-3xl font-black text-purple-500'></h1>
  </header>
  <section class='sidebar border-r-2 border-purple-500 py-2 px-3'></section>
  <section class='content-pane p-2'></section>
  <footer>
  </footer>
</main>`)
}

export default Layout;