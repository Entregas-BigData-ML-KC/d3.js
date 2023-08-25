// const
const diCaprioBirthYear = 1974;
const age   = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = age(today)

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

const elementGroup = svg.append("g")
        .attr('id', "elementGroup")
        .attr("transform", `translate(
            ${margin.left}, ${margin.top})`)

let x = d3.scaleBand()
    .range([0, width - margin.left - margin.right]) .padding(0.2)
let y = d3.scaleLinear()
    .range([height - margin.top - margin.bottom, 0])

const axisGroup = svg.append("g")
        .attr('id', "axisGroup")
const xAxisGroup = axisGroup.append("g")
        .attr("id", "xAxisGroup")
        .attr("transform", `translate(
        ${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = axisGroup.append("g")
        .attr("id", "yAxisGroup")
        .attr("transform",
        `translate(${margin.left}, ${margin.top})`)
const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

dataMap = d3.csv("data/data.csv").then(data => {
    let linearData = []
    data.forEach((element,index) => {
        linearData.push({age:age(element.year), year:element.year})
        // console.log("LINEAR PUSH",linearData)
    });
    

    //console.log(data)
    // const yLineal = d3.scaleLinear()
    //     .domain([d3.min(data, d => age(d.year)), d3.max(data, d => age(d.year))])  // Dominio desde 0 hasta el valor máximo en "value"
    //     // .range([height - margin.bottom, margin.top]);  // Rango desde el borde inferior hasta el borde superior
    //     .range([height - margin.top - margin.bottom, 0])

    x.domain(data.map(d => d.year))
    y.domain([15,d3.max(data, d => age(d.year))])

    //console.log("LINEAR DATA", linearData)
    xAxisGroup.call(xAxis) 
    yAxisGroup.call(yAxis.ticks(5).tickSize(-width)) 
    yAxisGroup.select('.domain').remove()
    let bars = elementGroup.selectAll('rect').data(data) 
    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.year))
        .attr('y', d => y((d.age)))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y((d.age))) - margin.bottom - margin.top
    
    const line = d3.line()
        .x(d => x(d.year))
        .y(d => y((d.age)))
    
    elementGroup.append("path")
        .datum(linearData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line)
})



