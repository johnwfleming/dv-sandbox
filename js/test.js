console.log("YODD")
Promise.all([

    d3.json("/dv-sandbox/data/us-states-abbrev-id-alt-dc.json")

]).then(function (data) {


    var dataAlbers = data[0];

    var albersWidth = 750;
    var albersHeight = 500;
    
    //Set zoom and extent
    let zoom=d3.zoom()
        .scaleExtent([1, 5])
        .translateExtent([[0, 0], [albersWidth, albersHeight]])
        .on('zoom', handleZoom);
    
    




    var myprojection = d3.geoAlbersUsa()
        .translate([albersWidth / 2, albersHeight / 2])
        .scale(1000);

    var path = d3.geoPath()
        .pointRadius(6)
        .projection(myprojection);

    var albersSVG = d3.select("#mapAlbers")
        .append("svg")
        .style("margin", "0px")
        .attr("viewBox", "0 0 " + albersWidth + " " + albersHeight)



    var statesG = albersSVG.append("g")

    statesG.selectAll("path")
        .data(dataAlbers.features)
        .enter()
        .append("path")
        .attr("d", path)


    //Initialize zoom
    albersSVG
        .call(zoom);


    function handleZoom(e) {

        //Get zoom factor
        // zoomFactor = d3.zoomTransform(this).k;



        d3.select("g")
            .attr('transform', e.transform);
        }


})