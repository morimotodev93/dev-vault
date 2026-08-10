## Native dependencies

Some dependencies may require native compilation during installation.

If `pnpm install` fails while building `better-sqlite3`,
install the required Windows C++ build tools and Python
according to the current `node-gyp` requirements.

After installing the tools, restart your terminal and run:

```bash
pnpm install
```
