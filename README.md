# ⚡ Pokémon Battle — VS Code Extension

A Pokémon battle simulator built as a VS Code extension, featuring animated Gen 5 sprites, move animations, HP bars, and battle logging.

---

## Prerequisites

Make sure these are installed before anything else:

- [Node.js (LTS)](https://nodejs.org) — verify with `node -v` and `npm -v`
- [Visual Studio Code](https://code.visualstudio.com)

---

## 1. Install Scaffolding Tools

```bash
npm install -g yo generator-code
```

Verify it worked:
```bash
yo --version
```

---

## 2. Scaffold the Project

```bash
yo code
```

Answer the prompts like this:

```
? What type of extension?     → New Extension (TypeScript)
? Name?                       → pokemon-battle
? Identifier?                 → pokemon-battle
? Description?                → A Pokemon battle simulator for VS Code
? Initialize git?             → Yes
? Which bundler to use?       → unbundled
? Package manager?            → npm
```

---

## 3. Open the Project

```bash
cd pokemon-battle
code .
```

> ⚠️ Always open VS Code from **inside** the `pokemon-battle` folder, not the parent folder. Otherwise the debugger won't work.

---

## 4. Fix `package.json`

If the `scripts` section is missing or incomplete, replace it entirely with this in `package.json`:

```json
{
  "name": "pokemon-battle",
  "displayName": "Pokemon Battle",
  "description": "A Pokemon battle simulator for VS Code",
  "version": "0.0.1",
  "engines": { "vscode": "^1.85.0" },
  "categories": ["Other"],
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "pokemon-battle.start",
        "title": "⚡ Start Pokémon Battle!"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "lint": "eslint src"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0"
  }
}
```

Or write it directly from the terminal (bypasses any save issues):

```bash
cat > package.json << 'EOF'
{
  "name": "pokemon-battle",
  "displayName": "Pokemon Battle",
  "description": "A Pokemon battle simulator for VS Code",
  "version": "0.0.1",
  "engines": { "vscode": "^1.85.0" },
  "categories": ["Other"],
  "activationEvents": [],
  "main": "./out/extension.js",
  "contributes": {
    "commands": [
      {
        "command": "pokemon-battle.start",
        "title": "⚡ Start Pokémon Battle!"
      }
    ]
  },
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "lint": "eslint src"
  },
  "devDependencies": {
    "@types/vscode": "^1.85.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.3.0"
  }
}
EOF
```

---

## 5. Fix `.vscode/launch.json`

Replace the entire contents of `.vscode/launch.json` with:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Run Extension",
      "type": "extensionHost",
      "request": "launch",
      "args": [
        "--extensionDevelopmentPath=${workspaceFolder}"
      ],
      "outFiles": [
        "${workspaceFolder}/out/**/*.js"
      ],
      "preLaunchTask": "${defaultBuildTask}"
    }
  ]
}
```

> ⚠️ The `"type": "extensionHost"` line is critical. Without it VS Code runs your extension in plain Node.js which doesn't have the `vscode` module, causing a crash.

---

## 6. Fix `tsconfig.json`

If the file is missing or broken, paste this in:

```json
{
  "compilerOptions": {
    "module": "Node16",
    "target": "ES2020",
    "outDir": "out",
    "lib": ["ES2020"],
    "sourceMap": true,
    "rootDir": "src",
    "strict": true
  },
  "exclude": ["node_modules", ".vscode-test"]
}
```

---

## 7. Install Dependencies

```bash
npm install
```

Also install TypeScript if it's missing:

```bash
npm install --save-dev typescript @types/vscode @types/node
```

---

## 8. Compile the Extension

```bash
npm run compile
```

After this succeeds you'll see an `out/` folder with `extension.js` inside it. That means it worked.

---

## 9. Run the Extension (Development Mode)

1. Click on `src/extension.ts` in the file explorer to make it the **active tab**
2. Go to the **Run & Debug panel** (left sidebar bug icon 🐛)
3. Make sure the dropdown says **"Run Extension"**
4. Click ▶️ or press **F5**

A second VS Code window opens — this is the **Extension Development Host**.

In that new window:
1. Press `Ctrl+Shift+P`
2. Type `Start Pokémon Battle`
3. Hit **Enter**

---

## 10. Auto-Compile on Save (Recommended)

Instead of running `npm run compile` every time you make a change, run:

```bash
npm run watch
```

Keep this running in the background. Now every time you save `extension.ts` it compiles automatically. Then just press `Ctrl+R` in the dev host window to reload.

---

## 11. Package & Share with Friends

Install the packaging tool:

```bash
npm install -g vsce
```

Create the installable file:

```bash
vsce package
```

This outputs `pokemon-battle-0.0.1.vsix` in your project folder. Your friends install it like this:

```
Extensions panel (Ctrl+Shift+X)
→ Click the ··· menu (top right)
→ Install from VSIX
→ Select the .vsix file
```

---

## Project Structure

```
pokemon-battle/
├── .vscode/
│   ├── launch.json       ← F5 debug config
│   └── tasks.json        ← build tasks
├── src/
│   └── extension.ts      ← All your code lives here
├── out/                  ← Compiled JS (auto-generated)
├── package.json          ← Commands & scripts
├── tsconfig.json         ← TypeScript config
└── .gitignore
```

---

## Common Errors & Fixes

| Error | Fix |
|---|---|
| `yo: command not found` | Run `npm install -g yo generator-code` again, restart terminal |
| `code .` doesn't open VS Code | In VS Code: `Ctrl+Shift+P` → `Shell Command: Install 'code' in PATH` |
| `Missing script: "compile"` | Replace `package.json` scripts section as shown in Step 4 |
| `Cannot find module 'vscode'` | Fix `launch.json` as shown in Step 5, make sure `type` is `extensionHost` |
| F5 opens wrong window / crashes instantly | Make sure you opened VS Code from **inside** `pokemon-battle/`, not the parent folder |
| Sprites not loading | Check the Content-Security-Policy meta tag allows `raw.githubusercontent.com` |

---

## Animated Sprite URLs (Gen 5 Black & White)

Base URL:
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/NUMBER.gif
```

| Pokémon | ID |
|---|---|
| Bulbasaur | 1 |
| Charmander | 4 |
| Charizard | 6 |
| Squirtle | 7 |
| Blastoise | 9 |
| Pikachu | 25 |
| Gengar | 94 |
| Gyarados | 130 |
| Mewtwo | 150 |
