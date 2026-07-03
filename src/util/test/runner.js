export const createTestRunner = (terminal) => {
  let activeSuite = '';
  const summary = { total: 0, passed: 0, failed: 0, errors: [] };

  const format = {
    // Clean, emoji-free text headers and status characters
    suite: (msg) => terminal.writeln(`\n\x1b[1;35m[Suite] ${msg}\x1b[0m`),
    pass: (msg) => terminal.writeln(`  \x1b[32m[PASS]\x1b[0m ${msg}`),
    fail: (msg) => terminal.writeln(`  \x1b[31m[FAIL]\x1b[0m ${msg}`),
    info: (msg) => terminal.writeln(`    \x1b[33m(i) ${msg}\x1b[0m`),
    summary: () => {
      terminal.writeln('\n\x1b[1;36mEXECUTION COMPLETE\x1b[0m');
      terminal.writeln(`  Passed:  \x1b[32m${String(summary.passed)}\x1b[0m`);
      terminal.writeln(`  Failed:  \x1b[31m${String(summary.failed)}\x1b[0m`);
      terminal.writeln('---------------------------------------');
    }
  };

  const assert = {
    equal: (actual, expected, message) => {
      summary.total++;
      if (actual === expected) {
        summary.passed++;
        format.pass(message);
      } else {
        summary.failed++;
        format.fail(message);
        format.info(`Expected: "${expected}" | Got: "${actual}"`);
        summary.errors.push({ suite: activeSuite, message, expected, actual });
      }
    },
    ok: (expression, message) => {
      assert.equal(!!expression, true, message);
    }
  };

  return {
    describe: async (suiteName, testFn) => {
      activeSuite = suiteName;
      format.suite(suiteName);
      try {
        await testFn(assert);
      } catch (err) {
        summary.failed++;
        format.fail(`Suite encountered a critical exception!`);
        format.info(`Error: ${err.message}`);
        summary.errors.push({ suite: activeSuite, message: err.message });
      }
    },
    getResults: () => {
      format.summary();
      return { success: summary.failed === 0, stats: summary };
    }
  };
};

