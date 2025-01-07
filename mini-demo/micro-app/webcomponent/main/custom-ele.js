// 基于HTMLElement自定义组件元素
class CustomElement extends HTMLElement {
  // 在构造器中生成shadow节点
  constructor() {
    super();

    this.counter = 0;

    // 打开影子节点
    // 影子节点是为了隔离外部元素的影响
    const shadowRoot = this.attachShadow({ mode: "open" });

    // 定义组件内嵌样式
    const styles = `
          .btn {
              width: 60px;
              height: 30px;
              margin: 20px;
              background: none;
              border: 1px solid black;
          }
      `;

    // 定义组件HTMl结构
    shadowRoot.innerHTML = `
          <style>${styles}</style>
          <h3>Counter</h3>
          <slot name='counter-content'>Button</slot>
          <span id='counter-value'>; 0 </span>;
          <button id='counter-increment' class='btn'> +1 </button>
          <button id='counter-decrement' class='btn'> -1 </button>
      `;

    // 获取+号按钮及数值内容
    this.incrementButton = this.shadowRoot.querySelector("#counter-increment");
    this.decrementButton = this.shadowRoot.querySelector("#counter-decrement");
    this.counterValue = this.shadowRoot.querySelector("#counter-value");

    // 实现点击组件内事件驱动
    this.incrementButton.addEventListener("click", this.increment.bind(this));
    this.decrementButton.addEventListener("click", this.decrement.bind(this));
  }

  decrement() {
    this.counter--;
    this.updateValue();
  }

  increment() {
    this.counter++;
    this.updateValue();
  }

  // 替换counter节点内容，达到更新数值的效果
  updateValue() {
    this.counterValue.innerHTML = this.counter;
  }
}

// 在真实dom上，生成自定义组件元素
customElements.define("custom-element", CustomElement);
