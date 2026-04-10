function loadComponent(id, file) {
  fetch(file)
    .then(response => {
      if (!response.ok) {
        throw new Error("File not found: " + file);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(error => {
      console.error("Error loading component:", error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("header", "partials/header.html");
  loadComponent("footer", "partials/footer.html");
});
