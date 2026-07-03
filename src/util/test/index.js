import { createTestRunner } from './runner.js';

export const runApiTests = async (terminal) => {
  terminal.clear();
  const runner = createTestRunner(terminal);

  const isIntercepted = !!navigator.serviceWorker.controller;
  terminal.writeln(`\x1b[1;33mMode: ${isIntercepted ? 'Mock Engine Active' : 'Native Hardware Connected'}\x1b[0m`);

  // Vite dynamic module glob loader. Finds all index.js files inside the tests/ subfolders.
  // eager: true ensures they load synchronously during compilation.
  const testModules = import.meta.glob('./tests/**/index.js', { eager: true });

  // Iterate over every auto-discovered test suite module dynamically
  for (const path in testModules) {
    const suiteModule = testModules[path];
    
    // Ensure the test file exports a default execution function
    if (typeof suiteModule.default === 'function') {
      try {
        // Run the specific isolated suite, injecting the shared runner and terminal
        await suiteModule.default(runner, terminal);
      } catch (err) {
        terminal.writeln(`\x1b[31m[CRITICAL] Error executing suite at ${path}: ${err.message}\x1b[0m`);
      }
    }
  }

  // Compile final totals
  const outcomes = runner.getResults();

  if (window.AndroidInterface && typeof window.AndroidInterface.onTestsComplete === 'function') {
    window.AndroidInterface.onTestsComplete(JSON.stringify(outcomes));
  }
};

