export default async function runSuite(runner) {
    await runner.describe('ArcController API Lifecycle Verification', async (expect) => {
        // Define paths inside the native sandbox root
        const sourceDir = 'arc_test_source_dir';
        const targetExtractDir = 'arc_test_extracted_out';
        
        const file1Path = `${sourceDir}/note.txt`;
        const file2Path = `${sourceDir}/data.json`;
        const archiveZipPath = 'arc_test_payload.zip';

        const file1Content = 'Verification string inside an archival unit test matrix.';
        const file2Content = JSON.stringify({ integrationTest: true, layer: "arc" });

        // 1. Prepare environment: Setup directories and raw files using /api/fs
        expect.log(`[PREPARE] Creating source directory at: ${sourceDir}`);
        await fetch(`/api/fs/mkdir?path=${encodeURIComponent(sourceDir)}&recursive=true`, { method: 'POST' });
        
        expect.log(`[PREPARE] Writing source file 1: ${file1Path}`);
        await fetch(`/api/fs/write?path=${encodeURIComponent(file1Path)}`, { method: 'POST', body: file1Content });
        
        expect.log(`[PREPARE] Writing source file 2: ${file2Path}`);
        await fetch(`/api/fs/write?path=${encodeURIComponent(file2Path)}`, { method: 'POST', body: file2Content });

        // 2. Test ZIP compression (/api/arc/zip)
        const zipPayload = {
            sourcePath: sourceDir,
            targetZipPath: archiveZipPath
        };

        expect.log(`[EXECUTE] Compressing folder "${sourceDir}" into archive payload file: ${archiveZipPath}`);
        const zipResponse = await fetch('/api/arc/zip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(zipPayload)
        });

        expect.equal(zipResponse.status, 200, 'POST /api/arc/zip returns status 200 on safe source payload conversion');
        
        const zipJson = await zipResponse.json();
        expect.equal(zipJson.status, 'success', 'ZIP execution returns clear success payload schema indicator status string');
        expect.log(`[METADATA] Archive compression complete. Generated payload size: ${zipJson.archiveSize} bytes`);

        // 3. Test UNZIP extraction (/api/arc/unzip)
        const unzipPayload = {
            zipPath: archiveZipPath,
            targetDirectory: targetExtractDir
        };

        expect.log(`[EXECUTE] Extracting archive file "${archiveZipPath}" into directory destination: ${targetExtractDir}`);
        const unzipResponse = await fetch('/api/arc/unzip', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unzipPayload)
        });

        expect.equal(unzipResponse.status, 200, 'POST /api/arc/unzip unpacks archive resource binary layout block cleanly');
        
        const unzipJson = await unzipResponse.json();
        expect.equal(unzipJson.status, 'success', 'UNZIP response maps directly into successful state completion metadata');

        // 4. Content Integrity Verification via /api/fs endpoints
        const extractedFile1Path = `${targetExtractDir}/note.txt`;
        const extractedFile2Path = `${targetExtractDir}/data.json`;

        expect.log(`[VERIFY] Validating extracted target text file existence at: ${extractedFile1Path}`);
        const checkFile1Res = await fetch(`/api/fs/read?path=${encodeURIComponent(extractedFile1Path)}`);
        expect.equal(checkFile1Res.status, 200, 'Extracted text asset found directly in extraction directory tree root');
        if (checkFile1Res.ok) {
            const extractedText1 = await checkFile1Res.text();
            expect.equal(extractedText1, file1Content, 'Extracted plaintext stream content mirrors source layout block precisely');
        }

        expect.log(`[VERIFY] Validating extracted target JSON file existence at: ${extractedFile2Path}`);
        const checkFile2Res = await fetch(`/api/fs/read?path=${encodeURIComponent(extractedFile2Path)}`);
        expect.equal(checkFile2Res.status, 200, 'Extracted structured JSON payload asset readable on target disk root');
        if (checkFile2Res.ok) {
            const extractedText2 = await checkFile2Res.text();
            expect.equal(extractedText2, file2Content, 'Extracted JSON structural schema components verified as functional');
        }
        // 5. Cleanup environment lifecycle states
        expect.log(`[CLEANUP] Purging created testing layout assets from native storage stack`);
        await fetch(`/api/fs/delete?path=${encodeURIComponent(sourceDir)}&recursive=true`, { method: 'DELETE' });
        await fetch(`/api/fs/delete?path=${encodeURIComponent(targetExtractDir)}&recursive=true`, { method: 'DELETE' });
        await fetch(`/api/fs/delete?path=${encodeURIComponent(archiveZipPath)}&recursive=false`, { method: 'DELETE' });
    });
}

