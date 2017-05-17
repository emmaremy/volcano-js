var svg = d3.select("svg");

var path = d3.geoPath();

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "land")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.land).features)
      .enter().append("path")
        .attr("d", path);
});
