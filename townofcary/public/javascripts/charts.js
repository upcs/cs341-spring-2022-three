
var xValues = [];
var yValues = [];
var pieColors = [];


function removeData(chart) {
  chart.data.datasets.pop();
  chart.update();
}

//updates bar chart
function addBarData(label, value) {
  //set bar color
  var barColor = "rgba(64,144,121, 1.0)";
  
  const newDataset = {
    label: label,
    data: value,
    backgroundColor: barColor,
  };
  barChart.data.datasets.push(newDataset);
  barChart.update();
}

//updates donut chart
function addDonutData(label, value) {
  //assign crimes a random color in the color range of page
  for(var i = 0; i < tableData.length; i++){
    var randomR = Math.floor(Math.random()*8 + 88);
    var randomG = Math.floor(Math.random()*60 + 191);
    var randomB = Math.floor(Math.random()*120 + 118);
    pieColors[i] = "rgba(" + randomR + ", " + randomG + ", " + randomB + ", 1.0)";
  }

  const newDataset = {
    label: label,
    data: value,
    backgroundColor: pieColors,
  };
  donutChart.data.datasets.push(newDataset);
  donutChart.update();
}

//updates data to be added
function updateChart(){
  removeData(barChart);
  removeData(donutChart);

  for(var i = 0; i < tableData.length; i++){
    xValues[i] = tableData[i].crime;
    yValues[i] = tableData[i].quantity;
  }

  addBarData(xValues, yValues);
  addDonutData(xValues, yValues);
}

for(var i = 0; i < tableData.length; i++){
  xValues[i] = tableData[i].crime;
  yValues[i] = tableData[i].quantity;
}

//assign crimes a random color in the color range of page
for(var i = 0; i < tableData.length; i++){
  var randomR = Math.floor(Math.random()*8 + 88);
  var randomG = Math.floor(Math.random()*60 + 191);
  var randomB = Math.floor(Math.random()*120 + 118);
  pieColors[i] = "rgba(" + randomR + ", " + randomG + ", " + randomB + ", 1.0)";
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
        data: [3 ,4, 5]
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
