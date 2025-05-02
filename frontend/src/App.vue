<script setup>
import CopyWriter from './components/CopyWriter.vue'
</script>

<template>
  <header>
    <h1>✨ 智能文本生成器 ✨</h1>
  </header>

  <main>
    <CopyWriter />
  </main>

  <!-- <footer>
    <p>Powered by AI</p>
  </footer> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 1rem;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-heading);
}

main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

footer {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: var(--color-text-light);
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
}
</style> 