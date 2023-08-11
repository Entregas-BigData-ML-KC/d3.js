// const
const width = 800
const height = 600
const margin = {
top: 10,
bottom: 20,
left: 40,
right: 40
}

// svg
const svg = d3.select("#chart")
       .append('svg')
          .attr("id", "svg")
          .attr("width", width)
          .attr("height", height)
let elementGroup = svg .append("g").attr("id", "elementGroup").attr('transform', `translate(
             ${margin.left},
             ${margin.top})`)



let axisGroup = svg.append("g")
       .attr("id", "axisGroup")
let xAxisGroup = axisGroup
       .append("g").attr("id", "xAxisGroup")
       .attr('transform', `translate(
             ${margin.left},
             ${height - margin.bottom})`)

let yAxisGroup = axisGroup
       .append("g")
             .attr("id", "yAxisGroup")
             .attr('transform', `translate(
                ${margin.left},
                ${margin.top}
             )`)


// let xAxis = d3.axisBottom().scale(x)
// let yAxis = d3.axisLeft().scale(y)


let ManX = ""
let ManY = 0
let MinX = Date.now()
let MinY = 999999999999999
d3.csv("data/ibex.csv").then(data => {
    data.map((d, index) => {

      d.date = Date.parse(d.date)  

      if(d.date<MinX){
            MinX = d.date
       }
       if(d.date>ManX){
            ManX = d.date
       }

       if(d.close<MinY){
            MinY = d.close
        }
        if(d.close>ManY){
            ManY = d.close
        }

        d.date     = +d.date
        d.close    = +d.close
        // d.n = +d.n
 })

const x = d3.scaleLinear()
    .domain([MinX, ManX])
    // .range([rangeMin, rangeMax]);
    .range([0, 9999999999]);

const y = d3.scaleLinear()
    .domain([parseInt(MinY), parseInt(ManY)])
    // .range([rangeMin, rangeMax]);
    .range([0, parseInt(ManY)]);

let xAxis = d3.axisBottom().scale(x)
let yAxis = d3.axisLeft().scale(y)

 // scale domain:
 x.domain(d3.extent(data.map(d => d.date))); y.domain(d3.extent(data.map(d => d.close)))
 // call axes
 xAxisGroup.call(xAxis)
 yAxisGroup.call(yAxis)
 let valueClose = data.filter(d => d.close == "Valor al cierre")
 // datum!
 elementGroup.datum(valueClose).append('path') .attr("id", "Valor al cierre")
 .attr("d", d3.line()
 .x(d => x(d.date))
    .y(d => y(d.close))
 ) })