<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');

  :root {
    --border: 3px;
    --shadow: 2px 2px 0px var(--black);
    --space: 1.25rem;
    --half-space: calc(var(--space) / 2);
    --double-space: calc(var(--space) * 2);
    --black: hsl(0, 0%, 15%);
    --white: hsl(0, 0%, 94%);
    --gray: hsl(0, 0%, 85%);
    --font: 'Montserrat', sans-serif;
    --font-larger: 3.5rem;
    --font-large: 2rem;
    --font-small: 0.9rem;
    --letter-space: 0.125em;
    --form-width: 40rem;
    --list-width: 30rem;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background: var(--white);
    color: var(--black);
    font-family: var(--font);
    margin: 0;
  }
</style>
