# Android Hybrid Mobile API Test Asset

# Developer Architecture Guide

This project is a hybrid Vue 3 / Vite web application optimized to run inside a sandboxed Android WebView container. It communicates with a native Android backend via intercepted HTTPS network boundaries (`/api/*`) and standardizes testing using an in-app console dashboard.

---

## Key System Files

*   **`./src/Main.vue`**  
    The application root layout. Handles initialization, environment checks, and binds the visual console view. It automatically injects the Service Worker proxy when debugging on desktop.
*   **`./src/components/TestTerminal.vue`**  
    A encapsulated text console module powered by `xterm.js`. Handles edge-to-edge canvas formatting on mobile device screens.
*   **`./src/util/test/runner.js`**  
    The core testing framework engine. Provides BDD-style layout primitives (`describe`, `expect`) and feeds formatted ANSI color messages back to the active console terminal instance.
*   **`./src/util/test/index.js`**  
    The integration test workspace. Orchestrates real functional verification tasks against your `App`, `Fs`, `Maintenance`, and `Net` native backend system paths.
*   **`./public/mock-worker.js`**  
    The desktop service worker proxy layer. Intercepts outbound browser network connections targeting `/api/*` on desktop to simulate Android data structures. It is completely bypassed on physical devices.
*   **`./vite.config.js`**  
    The project bundler configuration. Compiles Vue single-file components and enforces absolute relative assets pathing (`base: './'`) required for local storage execution.

---

## How to Modify and Extend the Code

### To Add a New API Test Case
Open `./src/util/test/index.js`, navigate to the relevant `describe` block, and use a standard `fetch` call paired with the assertion wrapper:

```javascript
export default async function runSuite(runner) {
  await runner.describe('Your API Module Title', async (expect) => {
    expect.log("informationa log: testing123");
    const response = await fetch('/api/your/new-route?param=value', { method: 'POST' });
    expect.equal(response.status, 200, 'POST /new-route returns operational status code');
    const payload = await response.json();
    expect.equal(payload.status, 'success', 'Payload state matches expected output criteria');
  });
}
```

### To Update a Desktop Response Stub
If your native Android Java controllers change, update the corresponding path interception block inside `./public/mock-worker.js`:

```javascript
if (path === '/api/your/new-route') {
  return jsonResponse({ status: 'success', customValue: 'your_mock_value' });
}
```

### To Run and Verify Changes
1.  **Local Desktop Browser Mode:** Execute `npm run dev`. Open `http://localhost:5173`. The Service Worker will boot up automatically, intercept your API routes, and execute the full test suite in your desktop browser.
2.  **Android Phone Production Build:** Run `npm run build`. Transfer the generated `dist/` directory contents directly into your Android native app production assets folder workspace (`www`).


## 7. SQLite Database File Inspection & Manipulation (`DatabaseController`)

Direct path-driven persistence layer inspection resources provide low-level management of SQLite database files on the local filesystem. This interface enforces safe transaction execution rules, type-safe column conversions, protection against accidental typo mutations, and performance-optimised prepared statements via parameterised arguments.

### Query Parameterization Flexibility
The interface completely supports both pure raw SQL strings and parameterized prepared queries. The `args` parameter array is optional. If `args` is omitted or left empty, the underlying backend engine falls back seamlessly to evaluate the `sql` string layout directly as an explicit raw script. 

*   **Pure Raw Style (No Arguments):** Best used for static setup queries or analytical operations that require no variable substitution (e.g., `CREATE TABLE...` or standard table selection scans).
*   **Prepared Style (With Placeholder Array):** Highly recommended when inserting or filtering dynamic string or numerical variables derived from runtime input data points to ensure maximum execution speed and prevent layout evaluation faults.

Example:

```json
{
  "path": "/data/user/0/com.example.app/databases/prepared_test.db",
  "sql": "SELECT * FROM device_faults WHERE id = 104;"
}
```


### `POST /api/database/create`
*   **Description:** Explicitly initializes a completely new, blank SQLite database container file at the exact requested location. If parent directory structures are missing, they are created automatically.
*   **Query Parameters:** None.
*   **Request Body:**
    ```json
    {
      "path": "/data/user/0/com.example.app/databases/prepared_test.db"
    }
    ```
*   **Response Status:**
    *   `201 Created` (Success; new file initialized on disk)
    *   `200 OK` (Success; target file already exists, skipping generation)
    *   `400 Bad Request` (If path parameter string is blank or missing)
    *   `500 Internal Server Error` (If file creation or transaction engine crashes)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "New empty SQLite database container initialized successfully",
      "created": true
    }
    ```

### `POST /api/database/query`
*   **Description:** Compiles and executes an analytical selection dataset read statement using optional data-bound parameter arguments. Maps SQLite native data type profiles seamlessly into structural JSON collections. Opens file streams in strict read-only isolation parameters.
*   **Query Parameters:** None.
*   **Request Body:**
    ```json
    {
      "path": "/data/user/0/com.example.app/databases/prepared_test.db",
      "sql": "SELECT id, error_tag, severity FROM device_faults WHERE error_tag = ? AND severity > ?;",
      "args": ["webview_crash_null_pointer", 50.0]
    }
    ```
*   **Response Status:**
    *   `200 OK` (Success)
    *   `400 Bad Request` (If path or query string parameters are missing)
    *   `404 Not Found` (If database target file does not exist on disk)
    *   `500 Internal Server Error` (If SQL query parsing or structure interpretation fails)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "rows": [
        {
          "id": 104,
          "error_tag": "webview_crash_null_pointer",
          "severity": 89.65
        }
      ],
      "row_count": 1
    }
    ```

### `POST /api/database/execute`
*   **Description:** Validates and executes mutating row statements (`INSERT`, `UPDATE`, `DELETE`) or physical schema definitions inside an existing target. Employs pre-compiled `SQLiteStatement` instances when parameter arrays are supplied for high-performance throughput. Blocks structural drop or vacuum actions to ensure safety.
*   **Query Parameters:** None.
*   **Request Body:**
    ```json
    {
      "path": "/data/user/0/com.example.app/databases/prepared_test.db",
      "sql": "INSERT INTO device_faults (id, error_tag, severity) VALUES (?, ?, ?);",
      "args": [104, "webview_crash_null_pointer", 89.65]
    }
    ```
*   **Response Status:**
    *   `200 OK` (Success)
    *   `400 Bad Request` (If mandatory payload parameters are absent)
    *   `403 Forbidden` (If structural queries like `DROP` or `ALTER` are intercepted)
    *   `404 Not Found` (If path is missing from storage, protecting against typo creation loops)
    *   `500 Internal Server Error` (If engine execution crashes)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Parameterized statement compiled and executed successfully"
    }
    ```

### `POST /api/database/delete`
*   **Description:** Purges a targeted database completely from storage. Safely tracks and deletes hidden peripheral transaction logs (`-wal`, `-journal`, `-shm`) created by the OS engine runtime layer.
*   **Query Parameters:** None.
*   **Request Body:**
    ```json
    {
      "path": "/data/user/0/com.example.app/databases/prepared_test.db"
    }
    ```
*   **Response Status:**
    *   `200 OK` (Success)
    *   `400 Bad Request` (If path layout parameter missing)
    *   `404 Not Found` (If target file does not exist on the file structure)
    *   `500 Internal Server Error` (If target file cannot be cleared or is locked by active thread connections)
*   **Response Headers:** `Content-Type: application/json`
*   **Response Body:**
    ```json
    {
      "status": "success",
      "message": "Database and peripheral structural journals purged completely"
    }
    ```

