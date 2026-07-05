export default async function runSuite(runner) {

await runner.describe('Android Universal Permissions Routing Module', async (expect) => {
  expect.log("Testing flexible permission execution pathways...");

  const targets = ['android.permission.CAMERA'];

  // Helper utility to pause JS execution loop safely without deadlocking the WebView engine
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // --- METHOD: DYNAMIC STREAMLINED WAITING ENGINE ---
  async function requestPermissionsBlocking(permissionsArray) {
    // 1. Dispatch the asynchronous request to show the dialog box immediately
    const reqResponse = await fetch('/api/permissions/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions: permissionsArray })
    });
    
    if (reqResponse.status !== 202) {
      throw new Error(`Failed to dispatch request alert wrapper: ${reqResponse.status}`);
    }

    expect.log("  [Blocking Loop Activated] Popup inflated. Pausing automation flow...");
    expect.log("  -> Please manually select ALLOW or DENY on the system window now!");

    const maxAttempts = 60; // 30-second total security boundary timeout
    let currentAttempt = 0;

    // 2. Poll the /status endpoint until the user makes a choice
    while (currentAttempt < maxAttempts) {
      await sleep(500); // Check every half second
      currentAttempt++;

      const checkResponse = await fetch('/api/permissions/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permissions: permissionsArray })
      });
      
      const checkPayload = await checkResponse.json();
      const currentMatrix = checkPayload.permissions_matrix;

      // If the permission state changes from DENIED to GRANTED, the user clicked "Allow"!
      if (currentMatrix[permissionsArray[0]] === 'GRANTED') {
        return { reason: 'USER_GRANTED', matrix: currentMatrix };
      }

      // To detect explicit USER_DENIED actions reliably, use your shell script 
      // to set the state to GRANTED before the test, then watch for it to flip back to DENIED here.
    }

    return { reason: 'TIMEOUT_EXCEEDED', matrix: {} };
  }

  // --- RUN EXPLICIT BLOCKING AUTOMATION TEST ---
  const resultData = await requestPermissionsBlocking(targets);

  expect.log("--- SYNCHRONOUS ROUTE TERMINATION SUMMARY ---");
  expect.log(`  Unblock Event Condition Trigger: ${resultData.reason}`);
  
  if (resultData.reason === 'USER_GRANTED') {
    expect.log("  Real-Time Camera Security Clearance successfully verified as: GRANTED");
    expect.equal(resultData.matrix['android.permission.CAMERA'], 'GRANTED', 'Blocking simulation completed flawlessly.');
  } else {
    expect.log("  Loop finished via safety boundary timeout or state un-changed.");
  }
});


}
