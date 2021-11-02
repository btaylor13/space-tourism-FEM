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
  }

  // if the right key is pushed, move to the next tab on the right
  if (e.keyCode === keydownRight) {
    tabFocus++;
    if (tabFocus >= tabs.length) {
      tabFocus = 0;
    }
  }

  // if the left key is pushed, move to the next tab on the left
  if (e.keyCode === keydownLeft) {
    tabFocus--;
    if (tabFocus < 0) {
      tabFocus = tabs.length - 1;
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

  // hide all article elements with tabpanel role
  mainContainer
    .querySelectorAll("[role='tabpanel']")
    .forEach((panel) => panel.setAttribute("hidden", true));

  // display picture when tab is clicked - removes hidden attribute from picture
  mainContainer.querySelector([`#${targetPanel}`]).removeAttribute(["hidden"]);

  mainContainer
    .querySelectorAll("picture")
    .forEach((picture) => picture.setAttribute("hidden", true));

  // display appropriate picture when tab is clicked
  mainContainer
    .querySelector([`#${targetPicture}`])
    .removeAttribute(["hidden"]);
}
