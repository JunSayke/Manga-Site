document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.getElementById("content");

  const routes = {
    "/index": "/src/templates/home.html",
    "/read": "/src/templates/read.html",
  };

  async function fetchContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.text();
    } catch (error) {
      console.error("Fetch error:", error);
      return "<p>Error loading content.</p>";
    }
  }

  async function handleLocation() {
    const path = window.location.pathname;
    const route = routes[path] || routes["/index"];
    const content = await fetchContent(route);
    contentDiv.innerHTML = content;
  }

  window.addEventListener("popstate", handleLocation);

  handleLocation(); // Initial call to display the correct page
});
