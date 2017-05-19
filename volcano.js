var base = d3.select("#area2");

var svg2 = base.append("svg");

var canvas = base.append("canvas")
    .attr("width", 960)
    .attr("height", 600);

    context = canvas.node().getContext("2d");
    width = canvas.property("width");
    height = canvas.property("height");

var projection = d3.geoOrthographic()
    .scale((height - 10) / 2)
    .translate([width / 2, height / 2])
    .precision(0.1);

var path = d3.geoPath()
    .projection(projection)
    .context(context);

canvas.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged));

var render = function() {},
    v0, // Mouse position in Cartesian coordinates at start of drag gesture.
    r0, // Projection rotation as Euler angles at start.
    q0; // Projection rotation as versor at start.

function dragstarted() {
    v0 = versor.cartesian(projection.invert(d3.mouse(this)));
    r0 = projection.rotate();
    q0 = versor(r0);
}

function dragged() {
    var v1 = versor.cartesian(projection.rotate(r0).invert(d3.mouse(this))),
        q1 = versor.multiply(q0, versor.delta(v0, v1)),
        r1 = versor.rotation(q1);
    projection.rotate(r1);
    render();
}


d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
    if (error) throw error;

    var sphere = {type: "Sphere"},
    land = topojson.feature(world, world.objects.land);

    render = function() {
        context.clearRect(0, 0, width, height);
        context.beginPath(), path(sphere), context.fillStyle = "#fff", context.fill();
        context.beginPath(), path(land), context.fillStyle = "#000", context.fill();
        context.beginPath(), path(sphere), context.stroke();

    };

var indicatices = d3.merge(d3.range(-180,181,30).map(function(lon) { 
    return d3.range(-60,61,30).map(function(lat) { 
        return d3.geoCircle().origin([ lon, lat ]).angle(7.0)();
    }); 
}));

svg2.selectAll("path.tissot")
    .data(indicatices)
    .enter().append("path")
    .attr("class", "tissot")
    .attr("d", path);


render();
});


//d3.csv("volcano_comb.csv", function(error, data) {
//    if (error) throw error;
//
//    var circle = d3.geoCircle();
//
//    console.log("I got here!");
//
//    console.log(path);
//
//    svg2.append("path.circle")
//        .attr("class", "circle")
//        .data(data)
//      .enter().append("path")
//        .attr("fill", "red")
//        .attr("d", path);
//
//});
