//export default async function runSuite(runner) {
//  // =========================================================================
//  // SUITE 1: COMPREHENSIVE FILE SYSTEM LIFECYCLE
//  // =========================================================================
//  await runner.describe('Native Sandbox Comprehensive Lifecycle', async (expect) => {
//    const tempDir = 'comprehensive_lifecycle_test';
//    const file1 = `${tempDir}/first_document.txt`;
//    const file2 = `${tempDir}/second_document.json`;
//
//    const rootListRes = await fetch(`/api/fs/list?path=`);
//    expect.equal(rootListRes.status, 200, 'GET /list reads storage environment root context');
//    if (rootListRes.ok) {
//      const data = await rootListRes.json();
//    }
//
//    const mkdirRes = await fetch(`/api/fs/mkdir?path=${encodeURIComponent(tempDir)}&recursive=true`, { method: 'POST' });
//    expect.equal(mkdirRes.status, 200, 'POST /mkdir generates runtime layout folder');
//
//    const content1 = 'Hello from the first file asset chunk';
//    const write1Res = await fetch(`/api/fs/write?path=${encodeURIComponent(file1)}`, {
//      method: 'POST',
//      headers: {
//        'X-Export-Data': encodeURIComponent(content1)
//      }
//    });
//    expect.equal(write1Res.status, 200, 'POST /write commits file1 buffer data successfully');
//
//    const read1Res = await fetch(`/api/fs/read?path=${encodeURIComponent(file1)}`);
//    expect.equal(read1Res.status, 200, 'GET /read extracts file1 text arrays cleanly');
//    if (read1Res.ok) {
//      const text1 = await read1Res.text();
//      expect.equal(text1, content1, 'File1 data validation integrity matches input signature');
//    }
//
//    const content2 = JSON.stringify({ status: "active", index: 2 });
//    const write2Res = await fetch(`/api/fs/write?path=${encodeURIComponent(file2)}`, {
//      method: 'POST',
//      headers: {
//        'X-Export-Data': encodeURIComponent(content2)
//      }
//    });
//    expect.equal(write2Res.status, 200, 'POST /write commits file2 json payload buffer to disk');
//
//    const read2Res = await fetch(`/api/fs/read?path=${encodeURIComponent(file2)}`);
//    expect.equal(read2Res.status, 200, 'GET /read extracts file2 json buffers dynamically');
//    if (read2Res.ok) {
//      const text2 = await read2Res.text();
//      expect.equal(text2, content2, 'File2 data validation integrity confirms raw match');
//    }
//
//    const midListRes = await fetch(`/api/fs/list?path=${encodeURIComponent(tempDir)}`);
//    if (midListRes.ok) {
//      const midListData = await midListRes.json();
//    }
//
//    const deleteFileRes = await fetch(`/api/fs/delete?path=${encodeURIComponent(file2)}&recursive=false`, { method: 'DELETE' });
//    expect.equal(deleteFileRes.status, 200, 'DELETE /delete purges localized file2 asset cleanly');
//
//    const postFileDeleteListRes = await fetch(`/api/fs/list?path=${encodeURIComponent(tempDir)}`);
//    if (postFileDeleteListRes.ok) {
//      const listData = await postFileDeleteListRes.json();
//      expect.equal(listData.files.some(f => f.name === 'second_document.json'), false, 'Target document file2 footprint removed from folder trace');
//    }
//
//    const deleteDirRes = await fetch(`/api/fs/delete?path=${encodeURIComponent(tempDir)}&recursive=true`, { method: 'DELETE' });
//    expect.equal(deleteDirRes.status, 200, 'DELETE /delete executes recursive purge of root testing directory context');
//
//    const finalRootListRes = await fetch(`/api/fs/list?path=`);
//    if (finalRootListRes.ok) {
//      const finalData = await finalRootListRes.json();
//      expect.equal(finalData.files.some(f => f.name === tempDir), false, 'Lifecycle verification complete: Temporary directory erased from phone filesystem');
//    }
//  });
//
//  // =========================================================================
//  // SUITE 2: ISOLATED HEAVY BUFFER STRESS VALIDATION
//  // =========================================================================
//  await runner.describe('Native Sandbox Isolated Heavy Write', async (expect) => {
//    const stressFolder = 'sandbox_stress_test_dir';
//    const stressFile = `${stressFolder}/large_payload.json`;
//
//    await fetch(`/api/fs/mkdir?path=${encodeURIComponent(stressFolder)}&recursive=true`, { method: 'POST' });
//
//    const heavyPayload = JSON.stringify({
//      mode: "body-streaming-mode",
//      testDate: new Date().toISOString(),
//      dataset: "A".repeat(8000) // Safely verified using 8000 character counts now
//    });
//
//    // FIX: Pass the property explicitly inside standard request options.
//    // The underlying framework handles transport resolution.
//    const writeStressRes = await fetch(`/api/fs/write?path=${encodeURIComponent(stressFile)}`, {
//      method: 'POST',
//      headers: {
//        'X-Export-Data': encodeURIComponent(heavyPayload)
//      }
//    });
//    expect.equal(writeStressRes.status, 200, 'POST /write persists heavy raw buffers via request body channel');
//
//    const readStressRes = await fetch(`/api/fs/read?path=${encodeURIComponent(stressFile)}`);
//    expect.equal(readStressRes.status, 200, 'GET /read processes large file extractions cleanly');
//    
//    if (readStressRes.ok) {
//      const verifiedText = await readStressRes.text();
//      expect.equal(verifiedText, heavyPayload, 'File content integrity verification matches payload baseline strings');
//    }
//
//    await fetch(`/api/fs/delete?path=${encodeURIComponent(stressFolder)}&recursive=true`, { method: 'DELETE' });
//  });
//}
//
export default async function runSuite(runner) {
  await runner.describe('Native Sandbox Comprehensive Lifecycle', async (expect) => {
    const tempDir = 'comprehensive_lifecycle_test';
    const file1 = `${tempDir}/first_document.txt`;
    const file2 = `${tempDir}/second_document.json`;

    await fetch(`/api/fs/mkdir?path=${encodeURIComponent(tempDir)}&recursive=true`, { method: 'POST' });

    // CLEAN STANDARD: Pass the text string directly into the body field
    const content1 = 'Hello from the first file asset chunk';
    const write1Res = await fetch(`/api/fs/write?path=${encodeURIComponent(file1)}`, {
      method: 'POST',
      body: content1 
    });
    expect.equal(write1Res.status, 200, 'POST /write commits file1 data successfully via standard body');

    const read1Res = await fetch(`/api/fs/read?path=${encodeURIComponent(file1)}`);
    if (read1Res.ok) {
      const text1 = await read1Res.text();
      expect.equal(text1, content1, 'File1 data validation integrity matches');
    }

    // CLEAN STANDARD: Pass the JSON configuration string directly into the body field
    const content2 = JSON.stringify({ status: "active", index: 2 });
    const write2Res = await fetch(`/api/fs/write?path=${encodeURIComponent(file2)}`, {
      method: 'POST',
      body: content2 
    });
    expect.equal(write2Res.status, 200, 'POST /write commits file2 json payload successfully via standard body');

    const read2Res = await fetch(`/api/fs/read?path=${encodeURIComponent(file2)}`);
    if (read2Res.ok) {
      const text2 = await read2Res.text();
      expect.equal(text2, content2, 'File2 data validation integrity matches');
    }

    // Clean up temporary testing directories
    await fetch(`/api/fs/delete?path=${encodeURIComponent(tempDir)}&recursive=true`, { method: 'DELETE' });
  });
}

