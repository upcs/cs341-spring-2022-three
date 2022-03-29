var tempX = [];
var xValues = [];
var uniqXValues = [];
var yValues = [];

//counts the number of occurences in an array
function countOccurrences(arr, len, str){
  var count = 0;
  for (var i = 0; i < len; i++){
    if (str == arr[i]) count++;
  }
  return count;
}

//pull data from table
$("table#table tr").each(function() {
    var arrayOfThisRow = [];
    var tableData = $(this).find('td');
    if (tableData.length > 0) {
        tableData.each(function() { 
          arrayOfThisRow.push($(this).text()); 
        });
        tempX.push(arrayOfThisRow);
    }
});

var tableArray = [];
//pull data from table
/*
for(var i = 0; i < tableArray.length; i++){
  xValues[i] = tableArray[i].name;
}
*/

//only get the name of crime
for(var i = 0; i < tempX.length; i++){
  xValues[i] = tempX[i][0];
}

//remove all duplicates
uniqXValues = [...new Set(xValues)];

//count number of occurences
for(var i = 0; i < uniqXValues.length; i++){
  yValues[i] = countOccurrences(xValues, xValues.length, uniqXValues[i]);
}

//set bar color
var barColor = "rgba(64,144,121, 1.0)";

//create actual bar chart
new Chart("barChart", {
    type: "bar",
    data: {
      labels: uniqXValues,
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

var pieColors = [];

//assign crimes a random color

for(var i = 0; i < uniqXValues.length; i++){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  pieColors[i] = "#" + randomColor;
}



new Chart("doughnutChart", {
  type: "doughnut",
  data: {
    labels: uniqXValues,
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

