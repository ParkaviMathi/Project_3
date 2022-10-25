
var data = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      gauge: { shape: "bullet" },
      delta: { reference: 300 },
      value: 220,
      domain: { x: [0, 1], y: [0, 1] },
      title: { text: "Profit" }
    }
  ];
  
  var layout = { width: 600, height: 250 };
  Plotly.newPlot('myDiv', data, layout);