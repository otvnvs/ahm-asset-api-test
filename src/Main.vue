<template>
  <div class="app-layout">
    <header class="app-header">
      <span class="app-title">Android API Test Engine</span>
      <div class="action-bar">
        <button 
          @click="handleCopyLogs" 
          :disabled="!terminalInstance"
          class="action-btn copy-btn"
        >
          {{ isCopying ? 'Copied' : 'Copy Logs' }}
        </button>
        <button 
          @click="handleRunTests" 
          :disabled="isRunning || !terminalInstance"
          class="action-btn run-btn"
        >
          {{ isRunning ? 'Running' : 'Rerun Suite' }}
        </button>
      </div>
    </header>

    <main class="console-wrapper">
      <TestTerminal @ready="onTerminalReady" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TestTerminal from './components/TestTerminal.vue';
import { runApiTests } from './util/test/index.js';

// --- MANUAL SWITCH CONFIGURATION ---
const USE_MOCKS = true; 

const terminalInstance = ref(null);
const isRunning = ref(false);
const isCopying = ref(false);

const onTerminalReady = (term) => {
  terminalInstance.value = term;
};

onMounted(async () => {
  const isAndroidEnv = /Android/i.test(navigator.userAgent);

  if ('serviceWorker' in navigator) {
    if (USE_MOCKS) {
      try {
        const registration = await navigator.serviceWorker.register('/mock-worker.js');
        console.log('Service Worker mock environment active.');

        if (!navigator.serviceWorker.controller) {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                window.location.reload();
              }
            });
          });
        }
      } catch (err) {
        console.error('Service Worker registration failed:', err);
      }
    } else {
      const activeRegistrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of activeRegistrations) {
        await reg.unregister();
      }
      console.log('Mock Service Worker deactivated and cleared.');
    }
  }

  // Auto-run terminal attachment loop
  const checkInterval = setInterval(async () => {
    if (terminalInstance.value) {
      clearInterval(checkInterval);
      await handleRunTests();
    }
  }, 50);
});

const handleRunTests = async () => {
  if (!terminalInstance.value || isRunning.value) return;
  isRunning.value = true;
  await runApiTests(terminalInstance.value);
  isRunning.value = false;
};

// Clipboard extraction mechanism
const handleCopyLogs = async () => {
  if (!terminalInstance.value || isCopying.value) return;

  try {
    // 1. Select all buffer rows present inside the xterm viewport
    terminalInstance.value.selectAll();
    
    // 2. Extract selected buffer data as pure plain text string lines
    const logBufferText = terminalInstance.value.getSelection();
    
    // 3. Force clean deselection layout immediately to avoid stuck highlighting states
    terminalInstance.value.clearSelection();

    if (!logBufferText) return;

    // 4. Stream data to system clipboard
    await navigator.clipboard.writeText(logBufferText);
    
    // 5. Fire visual feedback interaction states
    isCopying.value = true;
    setTimeout(() => {
      isCopying.value = false;
    }, 2000);

  } catch (err) {
    console.error('Failed to copy active console text strings to clipboard:', err);
  }
};
</script>

<style>
html, body {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: #000000 !important;
  color: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  overflow: hidden !important;
  overscroll-behavior: none !important;
}
#app {
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  height: 100% !important;
  background-color: #000000 !important;
}
::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}
</style>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  box-sizing: border-box;
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  background-color: #0c0c0c;
  border-bottom: 1px solid #1a1a1a;
  box-sizing: border-box;
  height: 48px;
  flex-shrink: 0;
}
.app-title {
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: -0.01em;
  color: #a3a3a3;
}
.action-bar {
  display: flex;
  gap: 8px;
}
.action-btn {
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s ease, color 0.15s ease;
  -webkit-tap-highlight-color: transparent;
}
.copy-btn {
  background-color: #1c1917;
  color: #d6d3d1;
  border: 1px solid #2e2a24;
}
.copy-btn:active {
  background-color: #26221f;
}
.run-btn {
  background-color: #2563eb;
  color: #ffffff;
}
.run-btn:active {
  background-color: #1d4ed8;
}
.action-btn:disabled {
  background-color: #171717;
  color: #525252;
  border-color: transparent;
  cursor: not-allowed;
}
.console-wrapper {
  flex: 1;
  width: 100%;
  background-color: #000000;
  overflow: hidden;
  box-sizing: border-box;
}
</style>

