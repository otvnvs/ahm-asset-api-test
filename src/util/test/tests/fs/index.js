export default async function runSuite(runner, terminal) {
  await runner.describe('Native Sandbox Comprehensive Lifecycle', async (expect) => {
    const tempDir = 'comprehensive_lifecycle_test';
    const file1 = `${tempDir}/first_document.txt`;
    const file2 = `${tempDir}/second_document.json`;

    // 1. List the root directory
    const rootListRes = await fetch(`/api/fs/list?path=`);
    expect.equal(rootListRes.status, 200, 'GET /list reads storage environment root context');
    if (rootListRes.ok) {
      const data = await rootListRes.json();
      terminal.writeln(`    \x1b[90m-> Initial Root Files: ${JSON.stringify(data.files)}\x1b[0m`);
    }

    // 2. Create a temp directory
    const mkdirRes = await fetch(`/api/fs/mkdir?path=${encodeURIComponent(tempDir)}&recursive=true`, { method: 'POST' });
    expect.equal(mkdirRes.status, 200, 'POST /mkdir generates runtime layout folder');

    // 3. Create a file in the temp directory
    const content1 = 'Hello from the first file asset chunk';
    const write1Res = await fetch(`/api/fs/write?path=${encodeURIComponent(file1)}&content=${encodeURIComponent(content1)}`, { method: 'POST' });
    expect.equal(write1Res.status, 200, 'POST /write commits file1 buffer data successfully');

    // 4. Get the contents of the file in the temp directory
    const read1Res = await fetch(`/api/fs/read?path=${encodeURIComponent(file1)}`);
    expect.equal(read1Res.status, 200, 'GET /read extracts file1 text arrays cleanly');
    if (read1Res.ok) {
      const text1 = await read1Res.text();
      expect.equal(text1, content1, 'File1 data validation integrity matches input signature');
      terminal.writeln(`    \x1b[90m-> Verified File1 Content: "${text1}"\x1b[0m`);
    }

    // 5. Create another file in the temp directory
    const content2 = JSON.stringify({ status: "active", index: 2 });
    const write2Res = await fetch(`/api/fs/write?path=${encodeURIComponent(file2)}&content=${encodeURIComponent(content2)}`, { method: 'POST' });
    expect.equal(write2Res.status, 200, 'POST /write commits file2 json payload buffer to disk');

    // 6. Get the contents of the file created
    const read2Res = await fetch(`/api/fs/read?path=${encodeURIComponent(file2)}`);
    expect.equal(read2Res.status, 200, 'GET /read extracts file2 json buffers dynamically');
    if (read2Res.ok) {
      const text2 = await read2Res.text();
      expect.equal(text2, content2, 'File2 data validation integrity confirms raw match');
      terminal.writeln(`    \x1b[90m-> Verified File2 Content: ${text2}\x1b[0m`);
    }

    // Intermediate step: Output directory state to prove both files exist concurrently
    const midListRes = await fetch(`/api/fs/list?path=${encodeURIComponent(tempDir)}`);
    if (midListRes.ok) {
      const midListData = await midListRes.json();
      terminal.writeln(`    \x1b[94m-> Active Sandbox Directory Listing: ${JSON.stringify(midListData.files)}\x1b[0m`);
    }

    // 7. Remove the file created (file2)
    const deleteFileRes = await fetch(`/api/fs/delete?path=${encodeURIComponent(file2)}&recursive=false`, { method: 'DELETE' });
    expect.equal(deleteFileRes.status, 200, 'DELETE /delete purges localized file2 asset cleanly');

    // Post-deletion step: Verify file2 is missing but file1 remains
    const postFileDeleteListRes = await fetch(`/api/fs/list?path=${encodeURIComponent(tempDir)}`);
    if (postFileDeleteListRes.ok) {
      const listData = await postFileDeleteListRes.json();
      expect.equal(listData.files.includes('second_document.json'), false, 'Target document file2 footprint removed from folder trace');
      terminal.writeln(`    \x1b[90m-> Directory state post file2 purge: ${JSON.stringify(listData.files)}\x1b[0m`);
    }

    // 8. Remove the temp directory
    // Note: Since file1 is still inside, we pass recursive=true to allow storageService.deletePath to wipe the tree
    const deleteDirRes = await fetch(`/api/fs/delete?path=${encodeURIComponent(tempDir)}&recursive=true`, { method: 'DELETE' });
    expect.equal(deleteDirRes.status, 200, 'DELETE /delete executes recursive purge of root testing directory context');

    // Final Validation: Verify root directory no longer contains the temp directory
    const finalRootListRes = await fetch(`/api/fs/list?path=`);
    if (finalRootListRes.ok) {
      const finalData = await finalRootListRes.json();
      expect.equal(finalData.files.includes(tempDir), false, 'Lifecycle verification complete: Temporary directory erased from phone filesystem');
    }
  });
}

