export default async function runSuite(runner, terminal) {
  await runner.describe('Native Layer Network Broker Proxy', async (expect) => {
    
    // Target a lightweight remote validation asset to verify phone internet capabilities
    const remoteUrl = 'https://raw.githubusercontent.com/otvnvs/ahm-asset-api-test/refs/heads/main/dist/mock-worker.js';
    const targetLocalPath = 'Download/proxy_network_probe.txt';

    // We pass parameters via queries, which WebViews never strip out
    const urlCheck = `/api/net/download?url=${encodeURIComponent(remoteUrl)}&path=${encodeURIComponent(targetLocalPath)}`;

    const response = await fetch(urlCheck);
    
    expect.equal(response.status, 200, 'GET /net/download handles remote network transfers cleanly');
    
    if (response.ok) {
      const data = await response.json();
      terminal.writeln(`    \x1b[90m-> Download Result: ${data.message}\x1b[0m`);
      terminal.writeln(`    \x1b[90m-> Local File Allocated: ${data.local_path} (${data.file_size_bytes} bytes)\x1b[0m`);
    } else {
      terminal.writeln(`    \x1b[31m[DIAGNOSTIC] Network transfer failed: ${await response.text()}\x1b[0m`);
    }
  });
}

