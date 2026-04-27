// function to show selected page in page body
function showPage(id) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
  // document.querySelectorAll("button").classList.remove("selected")
  document.querySelectorAll("button").forEach(p =>
    p.classList.remove("selected")
  );
  document.getElementById("nav_"+id).classList.add("selected");
}

