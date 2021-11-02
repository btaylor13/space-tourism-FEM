const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // change the tabindex of the current tab to -1
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
  }

  // change next tab index so it can be selected/focused
  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetPicture = targetTab.getAttribute("data-image");
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  // hide all article elements with tabpanel role
  hideContent(mainContainer, "[role='tabpanel']");
  // mainContainer
  //   .querySelectorAll("[role='tabpanel']")
  //   .forEach((panel) => panel.setAttribute("hidden", true));

  // display appropriate article when tab is clicked - removes hidden attribute from article
  showContent(mainContainer, [`#${targetPanel}`]);
  // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute(["hidden"]);

  // hide all picture elements
  hideContent(mainContainer, "picture");
  // mainContainer
  //   .querySelectorAll("picture")
  //   .forEach((picture) => picture.setAttribute("hidden", true));

  // display appropriate picture when tab is clicked
  showContent(mainContainer, [`#${targetPicture}`]);
  // mainContainer
  //   .querySelector([`#${targetPicture}`])
  //   .removeAttribute(["hidden"]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute(["hidden"]);
}
