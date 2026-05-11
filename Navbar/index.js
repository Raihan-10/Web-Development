const menu = document.getElementById("menu");
const ul = document.getElementById("menu-for-lg");

console.log("hello");
menu.addEventListener("click", function display() {
  ul.classList.toggle("hidden");
  ul.classList.toggle("flex");
  if (ul.classList.contains("flex")) {
    menu.classList.replace("fa-bars", "fa-xmark");
  } else {
    menu.classList.replace("fa-xmark", "fa-bars");
  }
});
