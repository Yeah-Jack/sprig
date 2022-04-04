export function exportHTML(name, saveJSON) {
  const string = `
    <style>
      html, body {
        margin: 0px;
      }

      .outer-container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: blue;
      }

      .inner-container {
        width: min-content;
        height: min-content;
        position: relative;
      }

      .text-container {
        position: absolute;
        left: 0px;
        top: 0px;
        overflow: show;
      }
    </style>
    <script defer type="module">
      import { createEval } from "https://gamelab.hackclub.com/evalGameScript.js";

      const evalGameScript = createEval();

      const saveObj = ${saveJSON};

      const { assets, prog } = saveObj;

      const gameCanvas = document.querySelector(".game-canvas");

      console.log(gameCanvas)

      const err = evalGameScript({ assets, prog, gameCanvas });

      console.log(err);
    </script>
    <div class="outer-container">
      <div class="inner-container">
        <canvas class="game-canvas"></canvas>
        <div class="text-container"></div>
      </div>
    </div>
  `;

  const blob = new Blob([string], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${name}.html`;

  link.click();
  URL.revokeObjectURL(link);
}
