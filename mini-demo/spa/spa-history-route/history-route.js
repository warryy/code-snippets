class HistoryRoute {
  constructor() {
    this.routes = {};
    this.currentUrl = "";
  }
  route(url, callback) {
    this.routes[url] = callback || (() => {});
  }
  updateViews(href) {
    this.currentUrl = href;
    console.log("updateViews", this.currentUrl, this.routes);
    this.routes[this.currentUrl] && this.routes[this.currentUrl]();
  }

  proxyAEvent() {
    console.log("proxyAEvent");
    document.querySelectorAll('a[href]').forEach(a => {
      a.addEventListener('click', (e) => {
        console.log("on a click", a.getAttribute("href"));
        e.preventDefault();
        let href = a.getAttribute("href");
        if (href.startsWith("#")) {
          href = href.slice(1);
        }

        if (!href.startsWith("/")) {
          href = window.__custom_spa_history_base_route__ + "/" + href;
        }
        window.history.pushState({}, "", href);
        this.updateViews(href);
      });
    });
  }
  
  init() {
    window.addEventListener(
      "load",
      () => {
        console.log("onload");
        this.updateViews(location.pathname);
      },
      false
    );
    this.proxyAEvent();
    window.addEventListener("popstate", () => {
      console.log("onpopstate");
      this.updateViews(window.location.pathname);
    });
  }
}
