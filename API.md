# Android WebView Native API Documentation

This document lists all intercepted native endpoints available to the WebView application running under the custom mock domain environment.

---

## 1. Application & System Services (`AppController`)

### `POST /api/app/export-localstorage`
*   **Description:** Serializes and dumps a raw string data packet or JSON string from the web environment directly into a backup file named `ahm-localstorage-dump.json` inside the shared public Android Downloads directory.
*   **Query Parameters:** None.
*   **Request Body:** `application/json` or raw text data packet strings (cannot be empty).
*   **Response Status:** 
    *   `200 OK` (On successful write)
    *   `400 Bad Request` (If payload packet is empty)
    *   `500 Internal Server Error` (If writing to external disk fails)
*   **Response Headers:** `Content-Type: text/plain`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Exported to downloads: ahm-localstorage-dump.json"
    }
    ```

### `GET /api/app/import-localstorage`
*   **Description:** Accesses the Android Downloads folder to locate and read back the raw bytes of the `ahm-localstorage-dump.json` storage file to restore state.
*   **Query Parameters:** None.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (On successful read)
    *   `404 Not Found` (If the backup file does not exist in Downloads)
    *   `500 Internal Server Error` (If file streaming hits an I/O exception)
*   **Response Headers:** `Cache-Control: no-cache`
*   **Response Body:** Returns raw byte contents or a serialized JSON string matching the original exported payload. If an error occurs:
    ```json
    {
      "status": "error",
      "message": "Backup file 'ahm-localstorage-dump.json' not found in Downloads folder."
    }
    ```

### `GET /api/app/device-status`
*   **Description:** Fetches structural diagnostic properties of the active environment wrapper context including user-agent strings, protocols, and mock tracking domain metadata.
*   **Query Parameters:**
    *   `id` (Optional) - Appends a requested client identifier into the JSON payload tracking tracking model.
*   **Request Body:** None.
*   **Response Status:** `200 OK`
*   **Response Headers:** `X-Powered-By: Android Native Framework Interceptor`
*   **Response Body:**
    ```json
    {
      "status": "active",
      "protocol": "HTTP/1.1",
      "userAgent": "Mozilla/5.0 ...",
      "domain": "your-mock-domain.local",
      "requestedId": "mobile_client"
    }
    ```

---

## 2. Persistent Local File System Storage (`FsController`)

### `GET /api/fs/list`
*   **Description:** Lists the explicit files and directory contents array for a targeted location relative to the storage environment root.
*   **Query Parameters:**
    *   `path` (Required) - Target directory subdirectory mapping string.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (Success)
    *   `400 Bad Request` (If path resolution or directory traversal rules fail)
*   **Response Headers:** `Content-Type: text/plain`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "files": ["manifest.json", "assets", "configurations"]
    }
    ```

### `GET /api/fs/read`
*   **Description:** Extracts the complete uncompressed file contents matching localized extensions (`.txt`, `.json`) into designated buffer outputs.
*   **Query Parameters:**
    *   `path` (Required) - Target local filesystem path to read.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (Success)
    *   `404 Not Found` (If file path processing throws structural file exceptions)
*   **Response Headers:** Dynamically converted depending on target extension:
    *   `.txt` → `Content-Type: text/plain`
    *   `.json` → `Content-Type: application/json`
    *   Default → `Content-Type: application/octet-stream`
*   **Response Body:** Raw uncompressed byte string array matching target payload.

## 2. Persistent Local File System Storage (`FsController` - Continued)

### `POST /api/fs/mkdir`
*   **Description:** Requests the native layer file service engine initialization helper to construct a directory path workspace.
*   **Query Parameters:**
    *   `path` (Required) - Path layout structure string to build.
    *   `recursive` (Optional) - Pass `"true"` to force-generate nested missing parents.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (Success matched or generated layout)
    *   `400 Bad Request` (Invalid path or safety violation check)
    *   `500 Internal Server Error` (Structural write block failure)
*   **Response Headers:** `Content-Type: text/plain`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Directory matched/created."
    }
    ```

### `POST /api/fs/write`
*   **Description:** Persists plain UTF-8 encoded text arguments into an explicitly targeted filesystem location.
*   **Query Parameters:**
    *   `path` (Required) - Destination file path relative to root directory.
    *   `content` (Optional) - URL-encoded string content to commit to the file.
*   **Request Body:** None (relies entirely on URL query mapping parameters).
*   **Response Status:**
    *   `200 OK` (Successfully saved to disk)
    *   `500 Internal Server Error` (File persisting runtime layer failures)
*   **Response Headers:** `Content-Type: text/plain`
*   **Response Body:**
    ```json
    {
      "status": "success"
    }
    ```

### `DELETE /api/fs/delete`
*   **Description:** Purges file targets or directory trees cleanly. Rejects requests targeting the absolute sandbox directory system root for protection.
*   **Query Parameters:**
    *   `path` (Required) - Asset directory file node targeted for removal.
    *   `recursive` (Optional) - Pass `"true"` to remove directories containing active structures.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (Clean deletion execution)
    *   `403 Forbidden` (If targeted path matches storage context environment root)
    *   `400 Bad Request` / `500 Internal Server Error` (Resource blocking errors)
*   **Response Headers:** `Content-Type: text/plain`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Deleted resource cleanly."
    }
    ```

### `POST /api/fs/zip`
*   **Description:** Packs directory layout tree folders or standalone source documents recursively into a standalone ZIP file archive format. Includes an automatic media scanning broadcast if targeting designated download directories.
*   **Query Parameters:** None.
*   **Request Body:** `application/json` object containing file paths:
    ```json
    {
      "sourcePath": "sandbox_folder",
      "targetZipPath": "Download/integration_pack.zip"
    }
    ```
*   **Response Status:**
    *   `200 OK` (Successful compression pipeline execution)
    *   `433 Forbidden` (Directory traversal attack detection boundary violation)
    *   `500 Internal Server Error` (catastrophic filesystem zip engine crash)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Files compressed successfully into ZIP archive.",
      "archiveSize": 4096
    }
    ```

### `POST /api/fs/unzip`
*   **Description:** Extracts compressed file archives out into a designated workspace directory target path layout. Implements strict Zip Slip safety validation mapping routines.
*   **Query Parameters:** None.
*   **Request Body:** `application/json` mapping input payload instructions:
    ```json
    {
      "zipPath": "exports/package.zip",
      "targetDirectory": "extracted_suite"
    }
    ```
*   **Response Status:**
    *   `200 OK` (Extraction completed flawlessly)
    *   `403 Forbidden` (Zip Slip directory traversal execution block triggered)
    *   `404 Not Found` (Source archive source resource file not present)
    *   `500 Internal Server Error` (Fatal system extractor corruption exception)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Archive successfully extracted onto native filesystem.",
      "targetDirectory": "extracted_suite"
    }
    ```
## 3. Maintenance, Hot Deployments & Application Lifecycle (`MaintenanceController`)

### `GET /api/maintenance/config`
*   **Description:** Retrieves the dynamic JSON parameters string profile containing system maintenance constraints and active variable properties.
*   **Query Parameters:** None.
*   **Request Body:** None.
*   **Response Status:** `200 OK`
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:** String containing system configuration profiles.
    ```json
    {
      "autoUpdate": "false",
      "interval": "1800",
      "url": "https://server.com",
      "useAuth": "false"
    }
    ```

### `POST /api/maintenance/save`
*   **Description:** Overwrites and persists new tracking properties into the global application configurations module space.
*   **Query Parameters:**
    *   `autoUpdate`, `interval`, `url`, `useAuth`, `user`, `pass`, `subpath` (All optional configuration values matching tracking criteria)
*   **Request Body:** None.
*   **Response Status:** `200 OK`
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Settings saved cleanly."
    }
    ```

### `POST /api/maintenance/download`
*   **Description:** Launches a separate native background execution thread task block that communicates over standard networks to fetch remote updates, execute over-write configurations, unpack resources into the local browser sandbox (`www`), and duplicate copies into public documents partitions. Forces a UI-thread application Webview reload upon completion.
*   **Query Parameters:**
    *   `merge` (Optional) - Pass `"true"` to skip asset pre-purging; else cleanly overwrites older instances.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (Background worker thread successfully spawned)
    *   `500 Internal Server Error` (If context framework verification steps fail)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Asynchronous flattened execution thread processing pipeline launched successfully."
    }
    ```

### `POST /api/maintenance/sync-sd`
*   **Description:** Fires off programmatic calls into background system storage manager modules to execute sandbox backup copy commands onto an active SD card or secondary persistent partition context.
*   **Query Parameters:** None.
*   **Request Body:** None.
*   **Response Status:** `200 OK`
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "SD Card sync task spawned cleanly."
    }
    ```

### `POST /api/maintenance/close`
*   **Description:** Signals native runtime UI display containers to handle app visibility exit triggers or secondary interface execution routines.
*   **Query Parameters:** None.
*   **Request Body:** None.
*   **Response Status:** `200 OK`
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Teardown signal passed."
    }
    ```

### `GET /api/maintenance/status`
*   **Description:** Queries update manager states to retrieve active operation tags.
*   **Query Parameters:** None.
*   **Response Status:** `200 OK`
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "Idle"
    }
    ```

---

## 4. Cross-Origin Network Proxy Broker (`NetController`)

### `POST /api/net/proxy`
*   **Description:** Bypasses browser CORS constraints by forwarding a custom HTTP/HTTPS connection stream to a target server via the native Android Java layer network architecture. Returns remote response structures and headers.
*   **Query Parameters:** None.
*   **Request Body:** `application/json` object detailing connection requirements:
    ```json
    {
      "url": "https://external.com",
      "method": "POST",
      "headers": { "Accept": "application/json" },
      "body": "{\"param\": 123}"
    }
    ```
*   **Response Status:** `200 OK` (Standard operational proxy link container response wrapper status)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:** Container detailing the proxy result outcome profile:
    ```json
    {
      "status": 201,
      "headers": { "Server": "nginx", "Content-Type": "application/json" },
      "body": "{\n  \"received\": true\n}"
    }
    ```

### `GET /api/net/download`
*   **Description:** Streams files directly from remote web services onto a localized path location context path.
*   **Query Parameters:**
    *   `url` (Required) - Absolute target remote file link download location source.
    *   `path` (Required) - Destination local sandbox filename target path.
*   **Request Body:** None.
*   **Response Status:**
    *   `200 OK` (Download stream initialized correctly)
    *   `400 Bad Request` (Missing required url or path params)
*   **Response Headers:** `Content-Type: application/json` (or dynamic error string values)
*   **Response Body:** Stream buffers (or JSON string errors if validation parameters check breaks).

