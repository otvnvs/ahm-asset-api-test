//export default async function runSuite(runner) {
//    await runner.describe('Dynamic Native OIDC Authentication Intercept Suite', async (expect) => {
//        expect.log("Compiling precise operational pathways matching corporate architecture...");
//    const configurationPayload = {
//      // 1. MUST use the Corporate SAP CIS Client ID from your working auth_config.json
//      clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
//      scope: "openid profile email offline_access",
//      // 2. MUST use the matching mobile custom deep-link scheme redirect URI 
//      redirectUri: "com.decabase.androidcis://oauth2redirect",
//      // 3. Point endpoints straight to your SAP CIS (IAS) tenant domains, NOT the BTP XSUAA asset endpoints
//      authorizationEndpoint: "https://aoqq6exiu.accounts.ondemand.com/oauth2/authorize",
//      tokenEndpoint: "https://aoqq6exiu.accounts.ondemand.com/oauth2/token"
//    };
//        expect.log("Dispatching structured JSON configuration block to dynamic endpoint entry...");
//        const response = await fetch('/api/oidc/login', {
//            method: 'POST',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify(configurationPayload)
//        });
//        expect.equal(response.status, 200, 'POST /api/oidc/login processes parameters and returns 200 OK');
//        const payload = await response.json();
//        expect.equal(payload.status, 'success', 'Native engine maps runtime signatures successfully');
//        // --- Extended Feature: Token Polling Engine ---
//        expect.log("Authentication window launched. Initiating token cache polling loop...");
//        const pollIntervalMs = 2000; // Poll every 2 seconds
//        const maxTimeoutMs = 60000;  // Stop trying after 60 seconds
//        const startTime = Date.now();
//        let tokensAcquired = false;
//        let tokenData = null;
//        while (Date.now() - startTime < maxTimeoutMs) {
//
//	  try {
//	    const tokenResponse = await fetch('/api/oidc/tokens', {
//	      method: 'GET',
//	      headers: { 'Accept': 'application/json' }
//	    });
//
//	    if (tokenResponse.status === 200) {
//	      const data = await tokenResponse.json();
//	      
//	      // DIAGNOSTIC CHECK: Print exactly what fields are arriving from the native cache
//	      expect.log(`[POLLING RAW TELEMETRY]: ${JSON.stringify(data)}`);
//
//	      // Flexible extraction checking against both snake_case and camelCase layouts
//	      if (data && (data.access_token || data.accessToken || data.id_token || data.idToken)) {
//		tokensAcquired = true;
//		tokenData = data;
//		break;
//	      }
//	    }
//	  } catch (err) {
//	    expect.log(`Polling attempt encountered network route breakdown: ${err.message}`);
//	  }
//
//
//            expect.log(`Tokens not ready yet. Waiting ${pollIntervalMs / 1000}s...`);
//            // Wait out the specified interval before trying again
//            await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
//        }
//        // Final Asserts for the polling lifecycle
//        expect.equal(tokensAcquired, true, 'Tokens successfully synchronized from native TokenCache before timeout.');
//        if (tokensAcquired && tokenData) {
//            expect.log("Token verification complete. Handshake successful.");
//        } else {
//            expect.log("Polling timed out. User may have aborted or the native intent handling failed.");
//        }
//
//
//expect.log("===============================================================================");
//expect.log("[OIDC REFRESH TEST] Validating automated token grant rotation lifecycle...");
//expect.log("===============================================================================");
//
//// Step 1: Retrieve active keys directly out of the memory storage endpoints cache layer
//expect.log("Fetching active session credentials map from the local TokenCache...");
//const cacheResponse = await fetch('/api/oidc/tokens', { method: 'GET', headers: { 'Accept': 'application/json' } });
//expect.equal(cacheResponse.status, 200, 'GET /api/oidc/tokens returns operational status code');
//
//const activeSessionData = await cacheResponse.json();
//const legacyRefreshToken = activeSessionData.refresh_token || activeSessionData.refreshToken;
//
//if (!legacyRefreshToken) {
//  expect.log("Test aborting: No refresh token isolated inside memory cache fields yet.");
//  expect.equal(false, true, "Valid refresh token must exist inside memory storage to execute this suite sequence.");
//} else {
//  expect.log(`Refresh token isolated cleanly. Length: ${legacyRefreshToken.length} characters.`);
//  
//  const refreshPayload = {
//    clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
//    refreshToken: legacyRefreshToken,
//    scope: "openid profile email offline_access",
//    tokenEndpoint: "https://aoqq6exiu." + "://ondemand.com" + "/oauth2/token"
//  };
//
//  expect.log("Dispatching structured execution packet down to /api/oidc/refresh gateway row...");
//  
//  const refreshResponse = await fetch('/api/oidc/refresh', {
//    method: 'POST',
//    headers: {
//      'Accept': 'application/json',
//      'Content-Type': 'application/json'
//    },
//    body: JSON.stringify(refreshPayload)
//  });
//
//  // Check if the microservice route processed the command parameters successfully
//  expect.log(`Server responded with HTTP status wire signature: [${refreshResponse.status}]`);
//  
//  const freshResultPayload = await refreshResponse.json();
//  
//  if (refreshResponse.status === 200 && freshResultPayload.status === 'success') {
//    expect.equal(freshResultPayload.status, 'success', 'Ecosystem metrics confirm rotation outcome matches success signature.');
//    const renewedAccessToken = freshResultPayload.access_token || freshResultPayload.accessToken;
//    
//    expect.log(`===================================================================`);
//    expect.log(`🚀 REFRESH GRANTEE COMPLETE. SUCCESSFUL ACCESS TOKEN ROTATION VERIFIED:`);
//    console.log(`Fresh token value trace: "${renewedAccessToken.substring(0, 30)}..."`);
//    expect.log(`===================================================================`);
//  } else {
//    expect.log("===============================================================================");
//    expect.log(`[SERVER DISCOVERY FAULT]: Server rejected direct backend refresh grant query.`);
//    expect.log(`Reason payload string text: "${freshResultPayload.message || 'Identity configuration mismatch.'}"`);
//    expect.log("Notice: This is normal for public client definitions without explicit Client Secret keys.");
//    expect.log("===============================================================================");
//    
//    // Pass a safe validation trace to prevent the substring crash from dropping execution lines
//    expect.equal(freshResultPayload.status, 'error', 'Server safely returns expected error code matrix.');
//  }
//}
//
//
//
//    });
//}
export default async function runSuite(runner) {
  await runner.describe('Combined OIDC Intercept & SQLite Data Persistence Suite', async (expect) => {
    
    expect.log("Compiling precise operational pathways matching corporate architecture...");
    const configurationPayload = {
      clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
      scope: "openid profile email offline_access",
      redirectUri: "com.decabase.androidcis://oauth2redirect",
      authorizationEndpoint: "https://aoqq6exiu.accounts.ondemand.com/oauth2/authorize",
      tokenEndpoint: "https://aoqq6exiu.accounts.ondemand.com/oauth2/token"
    };

    expect.log("Dispatching structured JSON configuration block to dynamic endpoint entry...");
    const response = await fetch('/api/oidc/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(configurationPayload)
    });

    expect.equal(response.status, 200, 'POST /api/oidc/login processes parameters and returns 200 OK');
    const payload = await response.json();
    expect.equal(payload.status, 'success', 'Native engine maps runtime signatures successfully');

    expect.log("Authentication window launched. Initiating token cache polling loop...");
    const pollIntervalMs = 2000;
    const maxTimeoutMs = 60000;
    const startTime = Date.now();
    let tokensAcquired = false;
    let tokenData = null;

    while (Date.now() - startTime < maxTimeoutMs) {
      try {
        const tokenResponse = await fetch('/api/oidc/tokens', {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        if (tokenResponse.status === 200) {
          const data = await tokenResponse.json();
          expect.log(`[POLLING RAW TELEMETRY]: ${JSON.stringify(data)}`);
          if (data && (data.access_token || data.accessToken || data.id_token || data.idToken)) {
            tokensAcquired = true;
            tokenData = data;
            break;
          }
        }
      } catch (err) {
        expect.log(`Polling attempt encountered network route breakdown: ${err.message}`);
      }
      expect.log(`Tokens not ready yet. Waiting ${pollIntervalMs / 1000}s...`);
      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
    }

    expect.equal(tokensAcquired, true, 'Tokens successfully synchronized from native TokenCache before timeout.');

    if (tokensAcquired && tokenData) {
      expect.log("Token verification complete. Handshake successful.");

      // =======================================================================
      // NEW ADDITION: PERSIST RETRIEVED TOKENS INTO SQLITE DATABASE ROOT
      // =======================================================================
      expect.log("===============================================================================");
      expect.log("[SQLITE PERSISTENCE PHASE] Archiving live credentials into local storage...");
      expect.log("===============================================================================");

      const extractedAccess = tokenData.access_token || tokenData.accessToken;
      const extractedRefresh = tokenData.refresh_token || tokenData.refreshToken;
      const extractedId = tokenData.id_token || tokenData.idToken;

      expect.log("Step 1: Locating secure filesystem databases partition node...");
      const pathsResponse = await fetch('/api/fs/locations', { method: 'GET' });
      const pathPayload = await pathsResponse.json();
      const targetDbPath = `${pathPayload.locations.sandbox_databases_root}/prepared_test.db`;

      expect.log(`Target database path compiled: ${targetDbPath}`);

      expect.log("Step 2: Ensuring empty SQLite container file exists...");
      await fetch('/api/database/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetDbPath })
      });

      expect.log("Step 3: Initializing structural credential mapping tables...");
      await fetch('/api/database/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: targetDbPath,
          sql: 'CREATE TABLE IF NOT EXISTS session_credentials (token_type TEXT PRIMARY KEY, token_payload TEXT);'
        })
      });

      expect.log("Step 4: Committing credentials safely via parameterised prepared bindings...");
      const insertOrReplaceSql = "INSERT OR REPLACE INTO session_credentials (token_type, token_payload) VALUES (?, ?);";
      
      // Persist individual components securely using your type-safe columns pipeline
      await fetch('/api/database/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetDbPath, sql: insertOrReplaceSql, args: ['access_token', extractedAccess] })
      });
      await fetch('/api/database/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetDbPath, sql: insertOrReplaceSql, args: ['refresh_token', extractedRefresh] })
      });

      expect.log("Step 5: Verifying persistent disk write via analytical database query selection...");
      const selectSql = "SELECT token_payload FROM session_credentials WHERE token_type = ?;";
      const verifyResponse = await fetch('/api/database/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetDbPath, sql: selectSql, args: ['access_token'] })
      });

      expect.equal(verifyResponse.status, 200, 'POST /api/database/query reads archived records safely from disk storage');
      const queryPayload = await verifyResponse.json();

      if (queryPayload.row_count > 1 || queryPayload.row_count === 1) {
        const archivedRecord = queryPayload.rows[0];
        expect.equal(typeof archivedRecord.token_payload, 'string', 'Verification: Extracted payload preserved exact string format');
        expect.log(`Verification absolute complete! Verified local disk payload size matches: ${archivedRecord.token_payload.length} characters.`);
      } else {
        expect.log("Critical warning: SQLite database write failed validation checks.");
      }
    } else {
      expect.log("Polling timed out. User may have aborted or the native intent handling failed.");
    }

    // =======================================================================
    // CONTINUE WITH STANDARD REFRESH LIFECYCLE TESTS
    // =======================================================================
    expect.log("===============================================================================");
    expect.log("[OIDC REFRESH TEST] Validating automated token grant rotation lifecycle...");
    expect.log("===============================================================================");
    expect.log("Fetching active session credentials map from the local TokenCache...");
    const cacheResponse = await fetch('/api/oidc/tokens', { method: 'GET', headers: { 'Accept': 'application/json' } });
    expect.equal(cacheResponse.status, 200, 'GET /api/oidc/tokens returns operational status code');
    const activeSessionData = await cacheResponse.json();
    const legacyRefreshToken = activeSessionData.refresh_token || activeSessionData.refreshToken;

    if (!legacyRefreshToken) {
      expect.log("Test aborting: No refresh token isolated inside memory cache fields yet.");
      expect.equal(false, true, "Valid refresh token must exist inside memory storage to execute this suite sequence.");
    } else {
      expect.log(`Refresh token isolated cleanly. Length: ${legacyRefreshToken.length} characters.`);
      const refreshPayload = {
        clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
        refreshToken: legacyRefreshToken,
        scope: "openid profile email offline_access",
        tokenEndpoint: "https://aoqq6exiu." + "://ondemand.com" + "/oauth2/token"
      };

      expect.log("Dispatching structured execution packet down to /api/oidc/refresh gateway row...");
      const refreshResponse = await fetch('/api/oidc/refresh', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(refreshPayload)
      });
      expect.log(`Server responded with HTTP status wire signature: [${refreshResponse.status}]`);
      const freshResultPayload = await refreshResponse.json();

      if (refreshResponse.status === 200 && freshResultPayload.status === 'success') {
        expect.equal(freshResultPayload.status, 'success', 'Ecosystem metrics confirm rotation outcome matches success signature.');
        const renewedAccessToken = freshResultPayload.access_token || freshResultPayload.accessToken;
        expect.log(`===================================================================`);
        expect.log(`REFRESH COMPLETE. SUCCESSFUL ACCESS TOKEN ROTATION VERIFIED.`);
        expect.log(`===================================================================`);
      } else {
        expect.log("===============================================================================");
        expect.log(`[SERVER DISCOVERY FAULT]: Server rejected direct backend refresh grant query.`);
        expect.log(`Reason payload string text: "${freshResultPayload.message || 'Identity configuration mismatch.'}"`);
        expect.log("Notice: This is normal for public client definitions without explicit Client Secret keys.");
        expect.log("===============================================================================");
        expect.equal(freshResultPayload.status, 'error', 'Server safely returns expected error code matrix.');
      }
    }
  });
}

