import "./style.css";

const searchInput = document.querySelector(
  "[data-searchbar]"
) as HTMLInputElement;

const searchClearButton = document.querySelector(
  "[data-clear-button]"
) as HTMLButtonElement;

searchClearButton.addEventListener("click", () => {
  searchInput.value = "";
  console.log("clicked");
});
