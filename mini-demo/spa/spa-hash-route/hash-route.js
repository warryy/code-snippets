class HashRoute {
  constructor() {
    this.routes = {};
    this.currentUrl = "";
  }
  route(url, callback) {
    this.routes[url] = callback || (() => {});
  }
  updateViews() {
    this.currentUrl = location.hash.slice(1) || "/";
    this.routes[this.currentUrl] && this.routes[this.currentUrl]();
  }
  init() {
    window.addEventListener(
      "load",
      () => {
        console.log("onload");
        this.updateViews();
      },
      false
    );
    window.addEventListener(
      "hashchange",
      () => {
        console.log("onhashchange");
        this.updateViews();
      },
      false
    );
  }
}
