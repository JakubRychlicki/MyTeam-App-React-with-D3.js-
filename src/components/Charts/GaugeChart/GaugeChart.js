import React, { useRef, useEffect } from "react";
import { select, arc, pie } from "d3";
import useResizeObserver from "use-resize-observer";
import "./GaugeChart.css";

function GaugeChart({ data, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const { width, height } = useResizeObserver({ ref: wrapperRef });

  useEffect(() => {
    const svg = select(svgRef.current);
    if (!width && !height) return;

    const arcGenerator = arc().innerRadius(50).outerRadius(100);

    const pieGenerator = pie()
      .startAngle(0) // 0 degree
      .endAngle(4 * Math.PI); // 360 degree
    const instructions = pieGenerator(data.map((d) => d.numberOfGoals)); //convert data

    svg
      .selectAll(".slice")
      .data(instructions)
      .join("path")
      .attr("class", "slice")
      .attr("fill", (instruction, index) => colors[index])
      .style("transform", `translate(${width / 2}px,${height / 2}px)`)
      .attr("d", (instruction) => arcGenerator(instruction));
  }, [data, width, height, colors]);

  return (
    <div className="gaugeChart" ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default GaugeChart;
