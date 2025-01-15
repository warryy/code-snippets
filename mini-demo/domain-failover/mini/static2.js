(() => {
  const text = "我是页面要加载的脚本2";
  console.log(text);
  const h1 = window.document.createElement("h1", {});
  h1.innerText = text;
  document.querySelector("body").appendChild(h1);
})();
