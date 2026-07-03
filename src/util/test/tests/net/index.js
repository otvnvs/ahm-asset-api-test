export default async function runSuite(runner, terminal) {
  await runner.describe('Native Layer Network Broker Proxy', async (expect) => {
    const proxyPayload = {
      url: `${window.location.origin}/api/app/device-status`,
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    };

    const proxyRes = await fetch('/api/net/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(proxyPayload)
    });
    expect.equal(proxyRes.status, 200, 'POST /net/proxy processes outbound connections');
  });
}

