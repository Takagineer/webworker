// main.js
const workerBtn = document.getElementById("workerBtn");
const normalBtn = document.getElementById("normalBtn");
const workerResult = document.getElementById("workerResult");
const normalResult = document.getElementById("normalResult");
const progressBar = document.getElementById("progressBar");
const resetBtn = document.getElementById("resetBtn");
const workerTime = document.getElementById("workerTime");
const normalTime = document.getElementById("normalTime");

workerBtn.addEventListener("click", () => {
  const start = performance.now();
  const worker = new Worker("/JavaScript/worker.js");
  worker.postMessage(1000000000); // より大きな数

  worker.onmessage = function (e) {
    const end = performance.now();
    const executionTime = (end - start) / 1000;
    if (e.data.type === "progress") {
      progressBar.value = e.data.value;
    } else {
      workerResult.textContent = `Worker計算結果: ${e.data.result}`;
      workerTime.textContent = `Worker秒数: ${executionTime}`;
    }
  };
});

normalBtn.addEventListener("click", () => {
  const start = performance.now();
  const num = 1000000000; // より大きな数
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += i;
    if (i % 10000000 === 0) {
      progressBar.value = (i / num) * 100;
      // 進捗を更新するためにUIをブロック
      const dummy = document.body.offsetHeight;
    }
  }
  const end = performance.now();
  const executionTime = (end - start) / 1000;
  normalResult.textContent = `通常計算結果: ${sum}`;
  normalTime.textContent = `通常秒数: ${executionTime}`;
});

resetBtn.addEventListener("click", () => {
  progressBar.value = 0;
});
