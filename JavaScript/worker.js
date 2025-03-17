self.onmessage = function (e) {
  const num = e.data;
  let sum = 0;
  for (let i = 0; i < num; i++) {
    sum += i;
    if (i % 10000000 === 0) {
      self.postMessage({ type: "progress", value: (i / num) * 100 });
    }
  }
  self.postMessage({ type: "result", result: sum });
};
