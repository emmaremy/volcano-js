var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geoPath();

var projection = d3.geoMercator()
    .center([0,0])
    .rotate([-180,0]);

var path = d3.geoPath()
    .projection(projection);

d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
    if (error) throw error;

    // must be long, lat
    point = [6.8, 50];

    svg.selectAll("path")
      .data(topojson.feature(world, world.objects.land).features)
        .enter()
      .append("path")
        .attr("class", "land")
        .attr("d", path);

d3.csv("volcano_comb.csv", function(error, data) {
    if (error) throw error;

    console.log(data.longitude, data.latitude);

    svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
      .append("circle")
        .attr("cx", function(d) {
            console.log(projection([d.longitude, d.latitude])[0]);
            return projection([d.longitude, d.latitude])[0];
        })
        .attr("cy", function(d) {
            console.log(projection([d.longitude, d.latitude])[1]);
            return projection([d.longitude, d.latitude])[1];
        })
        .attr("r", 3)
        .style("fill", "red")

});
});
