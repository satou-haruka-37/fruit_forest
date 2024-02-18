import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["character", "gameArea", "score"]
  static values = {
    score: Number,
    timeLimit: Number
  }

  startGame() {
    this.resetGameArea();
    this.fallIntervals = [];
    this.scoreValue = 0; // 得点をリセット
    this.timeLimitValue = 30; // 制限時間を30秒にセット
    this.dropFruits();

    // タイマーを設定して、30秒後にゲームを終了する
    setTimeout(() => {
      this.endGame();
    }, this.timeLimitValue * 1000);
  }

  moveCharacter(event) {
    // キーボード操作でキャラクターを動かす
    switch(event.key) {
      case "ArrowLeft":
      case "h":
        // 左に移動
        this.characterTarget.style.left = `${this.characterTarget.offsetLeft - 10}px`;
        break;
      case "ArrowRight":
      case "l":
        // 右に移動
        this.characterTarget.style.left = `${this.characterTarget.offsetLeft + 10}px`;
        break;
    }
  }

  dropFruits() {
    this.dropFruitsInterval = setInterval(() => {
      const fruit = document.createElement("div");
      fruit.classList.add("fruit");
      fruit.style.left = `${Math.random() * this.gameAreaTarget.offsetWidth}px`;
      this.gameAreaTarget.appendChild(fruit);

      const fallInterval = setInterval(() => {
        fruit.style.top = `${fruit.offsetTop + 5}px`;

        // 果物が床またはキャラクターに接触したかチェック
        if (fruit.offsetTop + fruit.offsetHeight >= this.gameAreaTarget.offsetHeight || this.checkCatch(fruit)) {
          clearInterval(fallInterval);
          fruit.remove();
        }
      }, 50);

      this.fallIntervals.push(fallInterval);
    }, 1000);
  }

  checkCatch(fruit) {
    // キャラクターと果物の位置をチェックしてキャッチ判定
    const characterLeft = this.characterTarget.offsetLeft;
    const characterRight = this.characterTarget.offsetLeft + this.characterTarget.offsetWidth;
    const fruitLeft = fruit.offsetLeft;
    const fruitRight = fruit.offsetLeft + fruit.offsetWidth;

    if (fruit.offsetTop + fruit.offsetHeight >= this.characterTarget.offsetTop &&
        fruitRight >= characterLeft && fruitLeft <= characterRight) {
      console.log("キャッチした！");
      this.scoreValue += 1; // 得点を加算
      this.scoreTarget.textContent = `とくてん: ${this.scoreValue}`; // スコアを表示
      return true;
    }
    return false;
  }

  endGame() {
    clearInterval(this.dropFruitsInterval); // 全ての果物の生成を停止
    this.fallIntervals.forEach(interval => clearInterval(interval)); // 各果物の落下を停止

    alert(`ゲーム終了！ あなたの得点は${this.scoreValue}点です。`);
  }

  resetGameArea() {
    // ゲームエリア内の果物を全て削除
    this.gameAreaTarget.querySelectorAll('.fruit').forEach(fruit => fruit.remove());
    // キャラクターを初期位置に戻す
    this.characterTarget.style.left = "50%";
  }
}