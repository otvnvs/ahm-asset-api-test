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
      background: '#000000',
      foreground: '#f3f4f6',
      cursor: '#9ca3af'
    })
  }
});

const emit = defineEmits(['ready', 'command']);
const terminalContainer = ref(null);
let term = null;
let fitAddon = null;
let commandBuffer = '';

onMounted(() => {
  term = new Terminal({
    cursorBlink: true,
    fontSize: 12,
    fontFamily: 'SFMono-Regular, Consolas, Monaco, monospace',
    theme: props.theme,
    convertEol: true,
    scrollSensitivity: 5,
    touchAction: 'pan-y'
  });

  fitAddon = new FitAddon();
  term.loadAddon(fitAddon);
  term.open(terminalContainer.value);
  
  setTimeout(() => fitAddon.fit(), 50);

  // ==========================================
  // INSTANT KEYBOARD FOCUS ENFORCEMENT
  // ==========================================
  setTimeout(() => {
    if (term) {
      // 1. Force the engine's core input framework to claim focus
      term.focus();
      
      // 2. Locate and forcefully activate the underlying browser text area node
      const internalTextArea = terminalContainer.value?.querySelector('.xterm-helper-textarea');
      if (internalTextArea) {
        internalTextArea.focus();
        internalTextArea.click(); // Fires a virtual tap to trick WebView security gates
      }
    }
  }, 100);

  term.onData((data) => {
    const code = data.charCodeAt(0);
    if (code === 13) {
      const cleanCommandInput = commandBuffer.trim();
      commandBuffer = '';
      emit('command', cleanCommandInput);
      return;
    }
    if (code === 127 || code === 8) {
      if (commandBuffer.length > 0) {
        commandBuffer = commandBuffer.slice(0, -1);
        term.write('\b \b');
      }
      return;
    }
    if (code >= 32 && code <= 126) {
      commandBuffer += data;
      term.write(data);
    }
  });

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
  touch-action: pan-y !important; 
  -webkit-overflow-scrolling: touch !important;
}
:deep(.xterm) {
  padding: 4px;
}
:deep(.xterm-viewport) {
  background-color: #000000 !important;
  pointer-events: auto !important; 
}
</style>

