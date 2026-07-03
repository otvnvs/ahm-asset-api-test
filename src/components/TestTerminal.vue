<template>
  <div ref="terminalContainer" class="terminal-container"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const props = defineProps({
  theme: {
    type: Object,
    default: () => ({
      background: '#000000', // Pure pitch dark
      foreground: '#f3f4f6',
      cursor: '#9ca3af'
    })
  }
});

const emit = defineEmits(['ready']);
const terminalContainer = ref(null);
let term = null;
let fitAddon = null;

onMounted(() => {
  term = new Terminal({
    cursorBlink: true,
    fontSize: 12, // Compact size for smaller screens
    fontFamily: 'SFMono-Regular, Consolas, Monaco, monospace',
    theme: props.theme,
    convertEol: true
  });

  fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminalContainer.value);
  
  // Double-call fit to prevent layout calculation glitches on fast renders
  setTimeout(() => fitAddon.fit(), 50);

  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);

  emit('ready', term);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('orientationchange', handleResize);
  if (term) term.dispose();
});

const handleResize = () => {
  if (fitAddon) fitAddon.fit();
};
</script>

<style scoped>
.terminal-container {
  width: 100%;
  height: 100%;
  background: #000000;
  box-sizing: border-box;
  touch-action: pan-y; /* Prevents unwanted browser horizontal swiping */
}
:deep(.xterm) {
  padding: 4px; /* Minimal padding just so text is not flush against edge */
}
:deep(.xterm-viewport) {
  background-color: #000000 !important;
}
</style>

