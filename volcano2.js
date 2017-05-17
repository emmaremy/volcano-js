var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath();

var projection = d3.geoMercator()
    .rotate([-180,0]);

var path = d3.geoPath()
    .projection(projection);

var data = [38.964, -77.067];

var g = svg.append("g")

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
    if (error) throw error;

    svg.selectAll("path")
      .data(topojson.feature(world, world.objects.land).features)
        .enter()
      .append("path")
        .attr("class", "land")
        .attr("fill", "green")
        .attr("d", path);

    g.selectAll("circle")
        .datum(data)
        .enter()
      .append("circle")
        .attr("class", "eruption")
        .attr("cx", function(d) {
            return projection(d)[0];
        })
        .attr("cy", function(d) {
            return projection(d)[1];
        })
        .attr("r", 10)
        .style("fill", "red")


});
