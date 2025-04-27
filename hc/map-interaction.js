/*  Handles:
    – Hover/click on UAE SVG map
    – Draws emirate-specific water network in Bootstrap modal
    – “Run” button highlights a hard-coded minimum-dominating-set (sensor) nodes
    – NEW: directed pipelines (arrowheads) + thicker gold outline for sensors        */

    document.addEventListener("DOMContentLoaded", () => {

      /* DOM refs */
      const info    = document.getElementById("info");
      const label   = document.getElementById("label-overlay");
      const mapObj  = document.getElementById("uae-map");
      const modalEl = document.getElementById("networkModal");
      const modal   = new bootstrap.Modal(modalEl);
      const runBtn  = document.getElementById("run-btn");
    
      /* SimpleMaps ID → slug used in waterNetworks */
      const idToSlug = {
        AEAZ:"abu-dhabi", AEDU:"dubai", AESH:"sharjah",
        AERK:"ras-al-khaimah", AEFU:"fujairah",
        AEUQ:"umm-al-quwain", AEAJ:"ajman"
      };
    
      /* Hard-coded sensor selections (MDS) */
      const sensorNodes = {
        "abu-dhabi":   ["tank1","tank3","tank6"],
        "dubai":       ["tank1","tank3","tank5"],
        "sharjah":     ["tank1","tank6","tank8"],
        "ras-al-khaimah":["tank1","tank4"],
        "fujairah":    ["tank1","tank4","tank6"],
        "umm-al-quwain":["tank1","tank4"],
        "ajman":       ["tank1","tank5"]
      };
    
      /*────────── 1. Map hover / click ──────────*/
      mapObj.addEventListener("load", () => {
        const svg = mapObj.contentDocument;
        svg.querySelectorAll("path[id]").forEach(path=>{
          const meta = simplemaps_countrymap_mapdata.state_specific[path.id] || {};
          path.style.fill   = meta.color;
          path.style.stroke = "#fff";
    
          path.addEventListener("mouseenter",e=>{ path.style.fill="#fff"; moveLabel(e,meta.name); });
          path.addEventListener("mousemove", e=> moveLabel(e,meta.name));
          path.addEventListener("mouseleave",   ()=>{ path.style.fill=meta.color; label.style.display="none"; });
    
          path.addEventListener("click", ()=>{
            const slug = idToSlug[path.id]; if(!slug) return;
            buildGraph(slug, meta.name);
            info.textContent = `Selected Emirate: ${meta.name}`;
          });
        });
      });
    
      function moveLabel(e,text){
        const b = mapObj.getBoundingClientRect();
        label.textContent = text; label.style.display = "block";
        label.style.left = (e.clientX - b.left + 5) + "px";
        label.style.top  = (e.clientY - b.top  + 5) + "px";
      }
    
      /*────────── 2. Graph drawing ──────────*/
      let sim=null, nodeSel=null, currentSlug=null;
    
      function buildGraph(slug,prettyName){
        currentSlug = slug;
        modalEl.addEventListener("shown.bs.modal", () => draw(waterNetworks[slug],prettyName), {once:true});
        modal.show();
      }
    
      function draw(net,prettyName){
        /* Title */
        document.getElementById("networkModalLabel").textContent =
          `Water Network • ${prettyName}`;
    
        /* Fresh SVG */
        const wrap = d3.select("#water-network").selectAll("*").remove().node()
          ? d3.select("#water-network") : d3.select("#water-network");
        const {width,height} = wrap.node().getBoundingClientRect();
    
        const svg = wrap
          .attr("width", width).attr("height", height)
          .attr("viewBox", [0,0,width,height])
          .style("overflow","visible");
    
        /* Arrowhead definition */
        const defs = svg.append("defs");
        defs.append("marker")
            .attr("id","arrow").attr("viewBox","0 -5 10 10")
            .attr("refX",10).attr("refY",0)
            .attr("markerWidth",6).attr("markerHeight",6)
            .attr("orient","auto")
          .append("path")
            .attr("d","M0,-5L10,0L0,5")
            .attr("fill","white");
    
        /* Node radii */
        net.nodes.forEach(d => d.r = Math.sqrt(d.capacity)/15 + 10);
    
        /* Stop any prior sim */
        sim?.stop();
    
        sim = d3.forceSimulation(net.nodes)
          .force("link", d3.forceLink(net.links).id(d=>d.id).distance(150))
          .force("charge", d3.forceManyBody().strength(-400))
          .force("center", d3.forceCenter(width/2,height/2));
    
        /* Links with arrowheads */
        svg.append("g").selectAll("line")
          .data(net.links).enter().append("line")
          .attr("stroke", d=>d.type==="primary"?"#0066cc":"#339933")
          .attr("stroke-width", d=>Math.sqrt(d.flow)/15+2)
          .attr("marker-end", "url(#arrow)");
    
        /* Nodes */
        nodeSel = svg.append("g").selectAll("circle")
          .data(net.nodes).enter().append("circle")
          .attr("r", d=>d.r)
          .attr("fill", d=>({
            desalination:"#4682B4",storage:"#6B8E23",
            distribution:"#CD853F",freshwater:"#20B2AA",industrial:"#8A2BE2"
          })[d.type])
          .attr("stroke","#fff").attr("stroke-width",2);
    
        /* Labels */
        const labels = svg.append("g").selectAll("text")
          .data(net.nodes).enter().append("text")
          .attr("class","node-label")
          .text(d=>d.name);
    
        /* Tick */
        sim.on("tick", ()=>{
          svg.selectAll("line")
            .attr("x1",d=>d.source.x).attr("y1",d=>d.source.y)
            .attr("x2",d=>d.target.x).attr("y2",d=>d.target.y);
    
          nodeSel.attr("cx",d=>d.x = Math.max(d.r, Math.min(width - d.r, d.x)))
                 .attr("cy",d=>d.y = Math.max(d.r, Math.min(height- d.r, d.y)));
    
          labels .attr("x",d=>d.x + d.r + 6).attr("y",d=>d.y + 4);
        });
      }
    
      /*────────── 3. Run button highlights sensors ──────────*/
      runBtn.addEventListener("click", ()=>{
        if(!currentSlug || !nodeSel) return;
        const sensors = new Set(sensorNodes[currentSlug] || []);
        nodeSel
          .attr("stroke", d=> sensors.has(d.id) ? "#FFD700" : "#fff")
          .attr("stroke-width", d=> sensors.has(d.id) ? 6 : 2)
          .attr("fill", d=>{
             const base=({
               desalination:"#4682B4",storage:"#6B8E23",
               distribution:"#CD853F",freshwater:"#20B2AA",industrial:"#8A2BE2"
             })[d.type];
             return sensors.has(d.id) ? d3.color(base).brighter(1) : base;
          });
      });
    });
    