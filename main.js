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


let ManX = Date.parse('31/12/1970')
let ManY = 0
let MinX = Date.now()
let MinY = 999999999999999
data = d3.csv("data/ibex.csv").then(data => {
    data.map((d, index) => {

      seconds_date = Date.parse(d.date)  

      if(d.date<MinX){
            MinX = seconds_date
       }
       if(d.date>ManX){
            ManX = seconds_date
       }

       if(d.close<MinY){
            MinY = d.close
        }
        if(d.close>ManY){
            ManY = d.close
        }

        // d.date     = d.date
        // d.close    = d.close
        // d.n = +d.n
    })

const x = d3.scaleLinear()
    .domain([MinX, ManX])
    // .range([rangeMin, rangeMax]);
    .range([0, parseInt(ManX)]);

const y = d3.scaleLinear()
    .domain([parseInt(MinY), parseInt(ManY)])
    // .range([rangeMin, rangeMax]);
    .range([0, parseInt(ManY)]);

let xAxis = d3.axisBottom().scale(x)
let yAxis = d3.axisLeft().scale(y)

 // scale domain:
 x.domain(d3.extent(data.map(d => d.date))); 
 y.domain(d3.extent(data.map(d => d.close)))
 // call axes
 xAxisGroup.call(xAxis)
 yAxisGroup.call(yAxis)


//  console.log("data",data)

//  arr = data.map(a =>{return Date.parse(a.date) })
//  console.log("arr",arr)


 // datum!
//  elementGroup.enter().append('path')
//  .attr("d", d3.line()
//  .x(d => x(Date.parse(d.date)))
//  .y(d => y(parseInt(d.close)))
//  ) 

let elementGroup = svg.append("g").selectAll("path")
.data([data]).attr("id", "elementGroup")
elementGroup.enter().append("path")
    .attr("d", d3.line()
    .x(d => (Date.parse(d.date)))
    .y(d => (d.close)))
    .attr("fill", "none")
    .attr("stroke", "blue")
})

