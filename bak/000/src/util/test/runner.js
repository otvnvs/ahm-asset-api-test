export const createTestRunner = (onLogEvent) => {
  let activeSuite = '';
  const summary = { total: 0, passed: 0, failed: 0, errors: [] };

  const emit = (eventPayload) => {
    if (typeof onLogEvent === 'function') {
      onLogEvent(eventPayload);
    }
  };

  const assert = {
    equal: (actual, expected, message) => {
      summary.total++;
      const isPassed = actual === expected;
      if (isPassed) {
        summary.passed++;
      } else {
        summary.failed++;
        summary.errors.push({ suite: activeSuite, message, expected, actual });
      }
      emit({ type: 'assertion', status: isPassed ? 'PASS' : 'FAIL', message, expected, actual });
    },
    ok: (expression, message) => {
      assert.equal(!!expression, true, message);
    },
    // New log method available inside tests
    log: (message, data = null) => {
      emit({
        type: 'log',
        suite: activeSuite,
        message,
        timestamp: new Date().toISOString(),
        data
      });
    }
  };

  return {
    describe: async (suiteName, testFn) => {
      activeSuite = suiteName;
      emit({ type: 'suite-start', name: suiteName });
      try {
        await testFn(assert);
      } catch (err) {
        summary.failed++;
        summary.errors.push({ suite: activeSuite, message: err.message });
        emit({ type: 'assertion', status: 'ERROR', message: 'Suite encountered a critical exception', error: err.message });
      }
    },
    getResults: () => {
      return { success: summary.failed === 0, stats: { ...summary } };
    }
  };
};

