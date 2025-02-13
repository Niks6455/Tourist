<template>
    <div class="layout">
        <main>
            <slot />
        </main>
    </div>
</template>
  
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1200px; /* Ограничение по ширине */
    margin: 0 auto; /* Центрирование */
    padding: 20px;
  }
  
  main {
    width: 100%;
  }
  </style>
  