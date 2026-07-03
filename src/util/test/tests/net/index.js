export default async function runSuite(runner) {
  await runner.describe('Native Layer Network Broker Proxy', async (expect) => {
    
    // Target a lightweight remote validation asset to verify phone internet capabilities
    const remoteUrl = 'https://raw.githubusercontent.com/otvnvs/ahm-asset-api-test/refs/heads/main/dist/mock-worker.js';
    const targetLocalPath = 'Download/proxy_network_probe.txt';

    // We pass parameters via queries, which WebViews never strip out
    const urlCheck = `/api/net/download?url=${encodeURIComponent(remoteUrl)}&path=${encodeURIComponent(targetLocalPath)}`;

    const response = await fetch(urlCheck);
    
    expect.equal(response.status, 200, 'GET /net/download handles remote network transfers cleanly');
  });
}
