
var xValues = [];
var yValues = [];
var pieColors = [];


function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}

//FIX ME -- chart currently updates but adds an extra column for some reason
//will ask about it in class

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
  chart.update();
}

function updateChart(){
  for(var i = 0; i < tableData.length; i++){
    xValues[i] = tableData[i].crime;
    yValues[i] = tableData[i].quantity;
  }
  //assign crimes a random color
  for(var i = 0; i < tableData.length; i++){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    pieColors[i] = "#" + randomColor;
  }

  addData(barChart, xValues, yValues);
  addData(donutChart, xValues, yValues);

}

  for(var i = 0; i < tableData.length; i++){
    xValues[i] = tableData[i].crime;
    yValues[i] = tableData[i].quantity;
  }
  //assign crimes a random color
  for(var i = 0; i < tableData.length; i++){
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    pieColors[i] = "#" + randomColor;
  }
  //set bar color
  var barColor = "rgba(64,144,121, 1.0)";

  //create actual bar chart
  const barChart = new Chart("barChart", {
      type: "bar",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColor,
          data: yValues
          
        }]
      },
      options: { 
        legend: {display: false},
        title: {
          display: true,
          text: "Crime Statistics"
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              },
              scaleLabel: {
                display: true,
                labelString: 'Number of Cases'
              }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Types of Crime'
            }
        }]
        }
      }
    });

  const donutChart = new Chart("doughnutChart", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: pieColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Crime Statistics"
      }
    }
  });
