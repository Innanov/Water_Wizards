/* map-interaction.js
   Hover + click behaviour for the UAE SVG map            */

   document.addEventListener("DOMContentLoaded", () => {
    const info         = document.getElementById("info");
    const labelOverlay = document.getElementById("label-overlay");
    const mapContainer = document.getElementById("map-container");
    const mapObject    = document.getElementById("uae-map");
  
    // When the external SVG has finished loading
    mapObject.addEventListener("load", () => {
      const svgDoc       = mapObject.contentDocument;
      const emiratePaths = svgDoc.querySelectorAll("path[id]");
  
      emiratePaths.forEach(path => {
        const id   = path.id;
        const data = simplemaps_countrymap_mapdata.state_specific[id] || {};
  
        /* --------  INITIAL STYLE  -------- */
        path.style.fill        = data.color || "#88A4BC";
        path.style.stroke      = "#ffffff";
        path.style.strokeWidth = "1";
  
        /* --------  HOVER  -------- */
        path.addEventListener("mouseenter", () => {
          path.style.fill        = "#ffffff";   // bright hover fill
          path.style.stroke      = "#ffffff";   // white border
          path.style.strokeWidth = "2";
  
          labelOverlay.textContent = data.name || id;
          labelOverlay.style.display = "block";
        });
  
        path.addEventListener("mousemove", e => {
          const box = mapContainer.getBoundingClientRect();
          // offset +10 px from cursor
          labelOverlay.style.left = (e.clientX - box.left + 10) + "px";
          labelOverlay.style.top  = (e.clientY - box.top  + 10) + "px";
        });
  
        path.addEventListener("mouseleave", () => {
          path.style.fill        = data.color || "#88A4BC";
          path.style.stroke      = "#ffffff";
          path.style.strokeWidth = "1";
          labelOverlay.style.display = "none";
        });
  
        /* --------  CLICK  -------- */
        path.addEventListener("click", () => {
          info.textContent = `Selected Emirate: ${data.name || id}`;
          emiratePaths.forEach(p => p.classList.remove("selected"));
          path.classList.add("selected");
        });
      });
    });
  });
  