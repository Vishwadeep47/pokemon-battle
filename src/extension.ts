import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const cmd = vscode.commands.registerCommand('pokemon-battle.start', () => {
    const panel = vscode.window.createWebviewPanel(
      'pokemonBattle',
      '⚡ Pokémon Battle',
      vscode.ViewColumn.One,
      { enableScripts: true }
    );

    panel.webview.html = getBattleHTML();
  });

  context.subscriptions.push(cmd);
}

export function deactivate() {}

function getBattleHTML(): string {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: monospace; background: #1a1a2e; color: #eee; text-align: center; padding: 20px; }
    .battle-area { display: flex; justify-content: space-around; margin: 30px 0; }
    .pokemon-card { background: #16213e; border: 2px solid #0f3460; border-radius: 12px; padding: 20px; width: 200px; }
    .hp-bar { height: 12px; background: #2ecc71; border-radius: 6px; transition: width 0.5s; }
    .hp-bar.low { background: #e74c3c; }
    button { background: #e94560; color: white; border: none; padding: 10px 20px;
             border-radius: 8px; margin: 5px; cursor: pointer; font-size: 14px; }
    button:hover { background: #c0392b; }
    #log { background: #16213e; padding: 15px; border-radius: 8px;
           min-height: 100px; text-align: left; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>⚡ Pokémon Battle!</h1>

  <div class="battle-area">
    <div class="pokemon-card">
      <h2>🔥 Charizard</h2>
      <p>HP: <span id="p1-hp">100</span>/100</p>
      <div style="background:#333; border-radius:6px; overflow:hidden">
        <div class="hp-bar" id="p1-bar" style="width:100%"></div>
      </div>
    </div>
    <div style="font-size: 3em; align-self: center">⚔️</div>
    <div class="pokemon-card">
      <h2>💧 Blastoise</h2>
      <p>HP: <span id="p2-hp">100</span>/100</p>
      <div style="background:#333; border-radius:6px; overflow:hidden">
        <div class="hp-bar" id="p2-bar" style="width:100%"></div>
      </div>
    </div>
  </div>

  <div>
    <button onclick="attack('Charizard', 'Flamethrower', 25, 'p2')">🔥 Flamethrower</button>
    <button onclick="attack('Charizard', 'Dragon Claw', 20, 'p2')">🐉 Dragon Claw</button>
    <button onclick="attack('Blastoise', 'Hydro Pump', 30, 'p1')">💧 Hydro Pump</button>
    <button onclick="attack('Blastoise', 'Ice Beam', 20, 'p1')">❄️ Ice Beam</button>
  </div>

  <div id="log"><b>Battle Log:</b><br></div>

  <script>
    const hp = { p1: 100, p2: 100 };

    function attack(attacker, move, dmg, target) {
      if (hp.p1 <= 0 || hp.p2 <= 0) return;
      const actual = Math.floor(dmg * (0.8 + Math.random() * 0.4));
      hp[target] = Math.max(0, hp[target] - actual);

      const bar = document.getElementById(target + '-bar');
      const hpEl = document.getElementById(target + '-hp');
      bar.style.width = hp[target] + '%';
      bar.className = 'hp-bar' + (hp[target] < 25 ? ' low' : '');
      hpEl.textContent = hp[target];

      const log = document.getElementById('log');
      log.innerHTML += \`⚡ <b>\${attacker}</b> used <b>\${move}</b>! Dealt <b>\${actual}</b> damage!<br>\`;

      if (hp[target] <= 0) {
        const loser = target === 'p1' ? 'Charizard' : 'Blastoise';
        log.innerHTML += \`💀 <b>\${loser}</b> fainted! Battle over!<br>\`;
      }
      log.scrollTop = log.scrollHeight;
    }
  </script>
</body>
</html>`;
}