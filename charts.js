
var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var yValues = [55, 49, 44, 24, 15];


var barColor = "purple";

new Chart("barChart", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColor,
        data: yValues
      }]
    },
    options: { legend: {display: false},
        title: {
        display: true,
        text: "Crime Statistics"
        }
    }
    });

var pieColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145"
];

new Chart("doughnutChart", {
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