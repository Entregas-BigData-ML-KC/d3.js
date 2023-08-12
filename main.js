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

fecha = d3.timeFormat("%Y/%m/%d")



let ManX = Date.parse('01/01/1970')
let ManY = 0
let MinX = Date.now()
let MinY = 999999999999999
data = d3.csv("data/ibex.csv").then(data => {
    data.map((d, index) => {

      const [dia, mes, año] = d.date.split('/');
      let dateObject = new Date(`${año}-${mes}-${dia}`)
      d.date = fecha(dateObject)
      dateObject = Date.parse(dateObject)
      
      console.log("DATE", dateObject)

      d.close = parseFloat(d.close)

      if(dateObject<MinX){
            MinX = dateObject
       }
       if(dateObject>ManX){
            ManX = dateObject
       }

       if(d.close<MinY){
            MinY = d.close
        }
        if(d.close>ManY){
            ManY = d.close
        }

        
        
        //return d.date  = formats.time.timeParse("%d%m%Y")
        // d.close    = d.close
        // d.n = +d.n
    })

const x = d3.scaleLinear()
    .domain([parseInt(MinX), parseInt(ManX)])
    // .range([rangeMin, rangeMax]);
    .range([0, width]);

const y = d3.scaleLinear()
    .domain([parseInt(MinY), parseInt(ManY)])
    // .range([rangeMin, rangeMax]);
    .range([0, height]);

let xAxis = d3.axisBottom().scale(x)
let yAxis = d3.axisLeft().scale(y)

 // scale domain:
 x.domain(d3.extent(data.map(d => d.date))) 
 y.domain(d3.extent(data.map(d => d.close)))
 // call axes
 xAxisGroup.call(xAxis)
 yAxisGroup.call(yAxis)


  console.log("data",data)


//  arr = data.map(a =>{console.log("type",typeof(a.close)) })
//  console.log("arr",arr)


 // datum!
//  elementGroup.enter().append('path')
//  .attr("d", d3.line()
//  .x(d => x(Date.parse(d.date)))
//  .y(d => y(parseInt(d.close)))
//  ) 

let elementGroup = svg.append("g").selectAll("path").attr("id", "elementGroup") .attr('transform', `translate(
    ${margin.left},
    ${margin.top})`)
    .data([data]).attr("id", "elementGroup")
elementGroup.enter().append("path")
    .attr("d", d3.line()
    .x(d => (Date.parse(d.date)))
    .y(d => (d.close)))
   
})

