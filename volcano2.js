var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath();

var projection = d3.geo.mercator()
    .center([0, 5 ])
    .scale(200)
    .rotate([-180,0]);

var path = d3.geoPath()
    .projection(projection)

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
    if (error) throw error;

    svg.append("g")
        .attr("class", "land")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.land).features)
      .enter().append("path")
        .attr("d", path);
});
