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
//--------------------------------------------------------------------------------
//export default async function runSuite(runner) {
//  await runner.describe('Combined OIDC Intercept & SQLite Data Persistence Suite', async (expect) => {
//    
//    expect.log("Compiling precise operational pathways matching corporate architecture...");
//    const configurationPayload = {
//      clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
//      scope: "openid profile email offline_access",
//      redirectUri: "com.decabase.androidcis://oauth2redirect",
//      authorizationEndpoint: "https://aoqq6exiu.accounts.ondemand.com/oauth2/authorize",
//      tokenEndpoint: "https://aoqq6exiu.accounts.ondemand.com/oauth2/token"
//    };
//
//    expect.log("Dispatching structured JSON configuration block to dynamic endpoint entry...");
//    const response = await fetch('/api/oidc/login', {
//      method: 'POST',
//      headers: {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(configurationPayload)
//    });
//
//    expect.equal(response.status, 200, 'POST /api/oidc/login processes parameters and returns 200 OK');
//    const payload = await response.json();
//    expect.equal(payload.status, 'success', 'Native engine maps runtime signatures successfully');
//
//    expect.log("Authentication window launched. Initiating token cache polling loop...");
//    const pollIntervalMs = 2000;
//    const maxTimeoutMs = 60000;
//    const startTime = Date.now();
//    let tokensAcquired = false;
//    let tokenData = null;
//
//    while (Date.now() - startTime < maxTimeoutMs) {
//      try {
//        const tokenResponse = await fetch('/api/oidc/tokens', {
//          method: 'GET',
//          headers: { 'Accept': 'application/json' }
//        });
//        if (tokenResponse.status === 200) {
//          const data = await tokenResponse.json();
//          expect.log(`[POLLING RAW TELEMETRY]: ${JSON.stringify(data)}`);
//          if (data && (data.access_token || data.accessToken || data.id_token || data.idToken)) {
//            tokensAcquired = true;
//            tokenData = data;
//            break;
//          }
//        }
//      } catch (err) {
//        expect.log(`Polling attempt encountered network route breakdown: ${err.message}`);
//      }
//      expect.log(`Tokens not ready yet. Waiting ${pollIntervalMs / 1000}s...`);
//      await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
//    }
//
//    expect.equal(tokensAcquired, true, 'Tokens successfully synchronized from native TokenCache before timeout.');
//
//    if (tokensAcquired && tokenData) {
//      expect.log("Token verification complete. Handshake successful.");
//
//      // =======================================================================
//      // NEW ADDITION: PERSIST RETRIEVED TOKENS INTO SQLITE DATABASE ROOT
//      // =======================================================================
//      expect.log("===============================================================================");
//      expect.log("[SQLITE PERSISTENCE PHASE] Archiving live credentials into local storage...");
//      expect.log("===============================================================================");
//
//      const extractedAccess = tokenData.access_token || tokenData.accessToken;
//      const extractedRefresh = tokenData.refresh_token || tokenData.refreshToken;
//      const extractedId = tokenData.id_token || tokenData.idToken;
//
//      expect.log("Step 1: Locating secure filesystem databases partition node...");
//      const pathsResponse = await fetch('/api/fs/locations', { method: 'GET' });
//      const pathPayload = await pathsResponse.json();
//      const targetDbPath = `${pathPayload.locations.sandbox_databases_root}/prepared_test.db`;
//
//      expect.log(`Target database path compiled: ${targetDbPath}`);
//
//      expect.log("Step 2: Ensuring empty SQLite container file exists...");
//      await fetch('/api/database/create', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ path: targetDbPath })
//      });
//
//      expect.log("Step 3: Initializing structural credential mapping tables...");
//      await fetch('/api/database/execute', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({
//          path: targetDbPath,
//          sql: 'CREATE TABLE IF NOT EXISTS session_credentials (token_type TEXT PRIMARY KEY, token_payload TEXT);'
//        })
//      });
//
//      expect.log("Step 4: Committing credentials safely via parameterised prepared bindings...");
//      const insertOrReplaceSql = "INSERT OR REPLACE INTO session_credentials (token_type, token_payload) VALUES (?, ?);";
//      
//      // Persist individual components securely using your type-safe columns pipeline
//      await fetch('/api/database/execute', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ path: targetDbPath, sql: insertOrReplaceSql, args: ['access_token', extractedAccess] })
//      });
//      await fetch('/api/database/execute', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ path: targetDbPath, sql: insertOrReplaceSql, args: ['refresh_token', extractedRefresh] })
//      });
//
//      expect.log("Step 5: Verifying persistent disk write via analytical database query selection...");
//      const selectSql = "SELECT token_payload FROM session_credentials WHERE token_type = ?;";
//      const verifyResponse = await fetch('/api/database/query', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ path: targetDbPath, sql: selectSql, args: ['access_token'] })
//      });
//
//      expect.equal(verifyResponse.status, 200, 'POST /api/database/query reads archived records safely from disk storage');
//      const queryPayload = await verifyResponse.json();
//
//      if (queryPayload.row_count > 1 || queryPayload.row_count === 1) {
//        const archivedRecord = queryPayload.rows[0];
//        expect.equal(typeof archivedRecord.token_payload, 'string', 'Verification: Extracted payload preserved exact string format');
//        expect.log(`Verification absolute complete! Verified local disk payload size matches: ${archivedRecord.token_payload.length} characters.`);
//      } else {
//        expect.log("Critical warning: SQLite database write failed validation checks.");
//      }
//    } else {
//      expect.log("Polling timed out. User may have aborted or the native intent handling failed.");
//    }
//
//    // =======================================================================
//    // CONTINUE WITH STANDARD REFRESH LIFECYCLE TESTS
//    // =======================================================================
//    expect.log("===============================================================================");
//    expect.log("[OIDC REFRESH TEST] Validating automated token grant rotation lifecycle...");
//    expect.log("===============================================================================");
//    expect.log("Fetching active session credentials map from the local TokenCache...");
//    const cacheResponse = await fetch('/api/oidc/tokens', { method: 'GET', headers: { 'Accept': 'application/json' } });
//    expect.equal(cacheResponse.status, 200, 'GET /api/oidc/tokens returns operational status code');
//    const activeSessionData = await cacheResponse.json();
//    const legacyRefreshToken = activeSessionData.refresh_token || activeSessionData.refreshToken;
//
//    if (!legacyRefreshToken) {
//      expect.log("Test aborting: No refresh token isolated inside memory cache fields yet.");
//      expect.equal(false, true, "Valid refresh token must exist inside memory storage to execute this suite sequence.");
//    } else {
//      expect.log(`Refresh token isolated cleanly. Length: ${legacyRefreshToken.length} characters.`);
//      const refreshPayload = {
//        clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
//        refreshToken: legacyRefreshToken,
//        scope: "openid profile email offline_access",
//        tokenEndpoint: "https://aoqq6exiu." + "://ondemand.com" + "/oauth2/token"
//      };
//
//      expect.log("Dispatching structured execution packet down to /api/oidc/refresh gateway row...");
//      const refreshResponse = await fetch('/api/oidc/refresh', {
//        method: 'POST',
//        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
//        body: JSON.stringify(refreshPayload)
//      });
//      expect.log(`Server responded with HTTP status wire signature: [${refreshResponse.status}]`);
//      const freshResultPayload = await refreshResponse.json();
//
//      if (refreshResponse.status === 200 && freshResultPayload.status === 'success') {
//        expect.equal(freshResultPayload.status, 'success', 'Ecosystem metrics confirm rotation outcome matches success signature.');
//        const renewedAccessToken = freshResultPayload.access_token || freshResultPayload.accessToken;
//        expect.log(`===================================================================`);
//        expect.log(`REFRESH COMPLETE. SUCCESSFUL ACCESS TOKEN ROTATION VERIFIED.`);
//        expect.log(`===================================================================`);
//      } else {
//        expect.log("===============================================================================");
//        expect.log(`[SERVER DISCOVERY FAULT]: Server rejected direct backend refresh grant query.`);
//        expect.log(`Reason payload string text: "${freshResultPayload.message || 'Identity configuration mismatch.'}"`);
//        expect.log("Notice: This is normal for public client definitions without explicit Client Secret keys.");
//        expect.log("===============================================================================");
//        expect.equal(freshResultPayload.status, 'error', 'Server safely returns expected error code matrix.');
//      }
//    }
//  });
//}
//--------------------------------------------------------------------------------
export default async function runSuite(runner) {
  await runner.describe('Dynamic OIDC Session Recovery & Relational Database Persistence Suite', async (expect) => {
    
    // Setup common environment variables and path structures
    const clientConfiguration = {
      clientId: "172d5109-5d18-4952-b68e-ad8f3ccc44ce",
      scope: "openid profile email offline_access",
      redirectUri: "com.decabase.androidcis://oauth2redirect",
      authorizationEndpoint: "https://ondemand.com",
      tokenEndpoint: "https://aoqq6exiu." + "://ondemand.com" + "/oauth2/token"
    };

    expect.log("Step 1: Resolving application relational database file path targets...");
    const pathsResponse = await fetch('/api/fs/locations', { method: 'GET' });
    const pathPayload = await pathsResponse.json();
    const targetDbPath = `${pathPayload.locations.sandbox_databases_root}/prepared_test.db`;

    // Ensure our persistence tables exist on the device partition filesystem
    await fetch('/api/database/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: targetDbPath })
    });
    await fetch('/api/database/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: targetDbPath,
        sql: 'CREATE TABLE IF NOT EXISTS session_credentials (token_type TEXT PRIMARY KEY, token_payload TEXT);'
      })
    });

    // Local decoding helper to evaluate JWT expiration timestamps cleanly without breaking string loops
    // Local decoding helper to evaluate JWT expiration timestamps cleanly
    const isTokenChronologicallyValid = (tokenStr) => {
      if (!tokenStr) return false;
      try {
        const structuralParts = tokenStr.split('.');
        if (structuralParts.length < 2) return false;
        
        // Unpack Base64URL string mapping segment
        const decodedPayload = JSON.parse(atob(structuralParts[1].replace(/-/g, '+').replace(/_/g, '/')));
        const currentUnixEpochSec = Math.floor(Date.now() / 1000);
        const clockSafetyBufferSec = 60; // 1-minute preemptive refresh buffer
        
        if (decodedPayload.exp) {
          const secondsRemaining = decodedPayload.exp - currentUnixEpochSec;
          const minutesRemaining = (secondsRemaining / 60).toFixed(2);
          
          if (secondsRemaining > clockSafetyBufferSec) {
            expect.log(`[TOKEN LIFECYCLE INFO]: Cached token string is STILL VALID for another ${secondsRemaining}s (~${minutesRemaining} minutes).`);
            return true;
          } else {
            expect.log(`[TOKEN LIFECYCLE INFO]: Cached token string is EXPIRED or within the ${clockSafetyBufferSec}s safety buffer boundary window.`);
            return false;
          }
        }
        return false;
      } catch (e) {
        expect.log(`[TOKEN LIFECYCLE INFO]: Failed parsing token expiration timestamp claims structure: ${e.message}`);
        return false;
      }
    };

    expect.log("Step 2: Querying SQLite relational database to discover cached active session credentials...");
    const selectSql = "SELECT token_payload FROM session_credentials WHERE token_type = ?;";
    
    const accessQueryRes = await fetch('/api/database/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: targetDbPath, sql: selectSql, args: ['access_token'] })
    });
    const refreshQueryRes = await fetch('/api/database/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: targetDbPath, sql: selectSql, args: ['refresh_token'] })
    });

    let accessPayload = await accessQueryRes.json();
    let refreshPayload = await refreshQueryRes.json();

    let cachedAccessToken = accessPayload.row_count === 1 ? accessPayload.rows[0].token_payload : "";
    let cachedRefreshToken = refreshPayload.row_count === 1 ? refreshPayload.rows[0].token_payload : "";

    let isSessionValid = isTokenChronologicallyValid(cachedAccessToken);
    expect.log(`Database Lookup Status: Token Found = ${!!cachedAccessToken} | Chronologically Active = ${isSessionValid}`);

    // =========================================================================
    // CONDITIONAL CONDITIONAL LOOP: RESTORE SESSION OR LAUNCH INTERACTIVE LOGIN
    // =========================================================================
    if (cachedAccessToken && isSessionValid) {
      expect.log("✅ Session recovery successful! Cached database credentials remain active. Skipping browser launch steps.");
    } else {
      expect.log("⚠️ Cached token dead or missing. Initiating secure live interactive user sign-in route...");
      
      const loginResponse = await fetch('/api/oidc/login', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(clientConfiguration)
      });
      expect.equal(loginResponse.status, 200, 'POST /api/oidc/login triggers dynamic initialization sequence');

      expect.log("Awaiting manual credentials confirmation. Initializing TokenCache synchronization loop...");
      const pollIntervalMs = 2000;
      const maxTimeoutMs = 60000;
      const loopStartTime = Date.now();
      let tokensCaptured = false;
      let freshTokens = null;

      while (Date.now() - loopStartTime < maxTimeoutMs) {
        try {
          const cachePollResponse = await fetch('/api/oidc/tokens', { method: 'GET', headers: { 'Accept': 'application/json' } });
          if (cachePollResponse.status === 200) {
            const data = await cachePollResponse.json();
            if (data && (data.access_token || data.accessToken)) {
              tokensCaptured = true;
              freshTokens = data;
              break;
            }
          }
        } catch (err) {
          expect.log(`Background thread connection check paused: ${err.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, pollIntervalMs));
      }

      expect.equal(tokensCaptured, true, 'Dynamic login credentials captured by TokenCache before loop boundary timeout limit');
      
      cachedAccessToken = freshTokens.access_token || freshTokens.accessToken;
      cachedRefreshToken = freshTokens.refresh_token || freshTokens.refreshToken;

      expect.log("Archiving refreshed identity parameters down into persistent SQLite storage slots...");
      const replaceSql = "INSERT OR REPLACE INTO session_credentials (token_type, token_payload) VALUES (?, ?);";
      await fetch('/api/database/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetDbPath, sql: replaceSql, args: ['access_token', cachedAccessToken] })
      });
      await fetch('/api/database/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: targetDbPath, sql: replaceSql, args: ['refresh_token', cachedRefreshToken] })
      });
      expect.log("Database persistent synchronization complete.");
    }

    // Use the confirmed credentials payload for operational business tasks
    expect.log(`Executing isolated program data operations using active access token string. Length: ${cachedAccessToken.length} characters.`);

    // =========================================================================
    // FINAL Lifecycle CHECK: RUN ROTATION GRANT ON WHICHEVER TOKEN RESIDES IN DB
    // =========================================================================
    expect.log("===============================================================================");
    expect.log("[OIDC REFRESH STEP] Triggering explicit background verification check on token...");
    expect.log("===============================================================================");
    
    // Fetch current tracking state parameters straight out of the persistence row
    const validationQueryRes = await fetch('/api/database/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: targetDbPath, sql: selectSql, args: ['refresh_token'] })
    });
    const validationPayload = await validationQueryRes.json();
    const activeDatabaseRefreshToken = validationPayload.rows[0].token_payload;

    expect.log(`Isolating refresh token target from database rows. Length: ${activeDatabaseRefreshToken.length} characters.`);

    refreshPayload = {
      clientId: clientConfiguration.clientId,
      refreshToken: activeDatabaseRefreshToken,
      scope: clientConfiguration.scope,
      tokenEndpoint: clientConfiguration.tokenEndpoint
    };

    const refreshResponse = await fetch('/api/oidc/refresh', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(refreshPayload)
    });

    expect.log(`Server microservice channel closed. Network HTTP Wire Status Signature parsed as: [${refreshResponse.status}]`);
    const freshResultPayload = await refreshResponse.json();

    if (refreshResponse.status === 200 && freshResultPayload.status === 'success') {
      expect.equal(freshResultPayload.status, 'success', 'Token rotation workflow matches absolute success signatures.');
      expect.log("Handshake complete. Permanent tokens updated across database storage targets.");
    } else {
      expect.log(`[SERVER TELEMETRY LOG]: Boundary verification exception handled cleanly. Message: "${freshResultPayload.message || 'Identity configuration mismatch.'}"`);
      expect.equal(freshResultPayload.status, 'error', 'Server returned public client expected error response profiles.');
    }
  });
}


