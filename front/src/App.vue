<template>
  <header>
    <nav>
      <a href="/">Home</a>
      <a href="/login">Login</a>
    </nav>
  </header>
  <main>
    <router-view :key="$route.path" />
  </main>
</template>