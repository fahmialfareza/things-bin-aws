// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var data = []
var pieChart = []

if ("WebSocket" in window) {
    // console.log('WebSocket is supported by your Browser!')
    // Let us open a web socket
    var ws = new WebSocket("wss://dx0c751wng.execute-api.ap-southeast-1.amazonaws.com/prod");
    ws.onopen = function () {
        // Web Socket is connected, send data using send()
        // console.log('Web Socket is connected')
    };
    ws.onmessage = function (evt) {
        // console.log('success Receive Data')
        // console.log(JSON.parse(evt.data).M)
        // data.push(JSON.parse(evt.data).M)
        let dataTemp = JSON.parse(evt.data).M
        // console.log(dataTemp)
        if (data.length == 0) {
            data.push(dataTemp)
        } else {
            if (data.some(item => item.ID.S === dataTemp.ID.S)) {
                for (var i in data) {
                    if (data[i].ID.S == dataTemp.ID.S) {
                        data[i].Filled.N = dataTemp.Filled.N
                        data[i].Percent.N = dataTemp.Percent.N
                        data[i].Timestamp.N = dataTemp.Timestamp.N
                    }
                }
            } else {
                data.push(dataTemp)
            }
        }
        for (let i = 0; i < data.length; i++) {
            createChart("piechart" + [i], data[i])
        }
        // console.log(data)
        $('#numberThings').text(data.length)
    };
    ws.onclose = function () {
        // websocket is closed.
        // console.log('Web Socket is disconnected')
    };
} else {
    // The browser doesn't support WebSocket
    alert("WebSocket NOT supported by your Browser!");
}

function createChart(pieChart, data) {
    if ($('#' + pieChart).length == 0) {
        var templateStr = '<div class="col-xl-4 col-lg-5 col-md-6"><div class="card shadow mb-4"><div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"><h6 class="m-0 font-weight-bold text-primary">' + data.ID.S + '</h6></div><div class="card-body"><div class="chart-pie pt-4 pb-2"> <canvas id="' + pieChart + '"></canvas></div><div class="mt-4 text-center small"> <span class="mr-2"> <i class="fas fa-circle text-danger"></i> Filled </span> <span class="mr-2"> <i class="fas fa-circle text-success"></i> Empty </span></div></div></div></div>';
        $('#pieChartArea').append(templateStr)
    }
    var ctx = document.getElementById(pieChart);
    pieChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Filled", "Empty"],
            datasets: [{
                data: [parseFloat(data.Percent.N), 100.00 - parseFloat(data.Percent.N)],
                backgroundColor: ['#dd1d1d', '#1cc88a'],
                hoverBackgroundColor: ['#b01717', '#17a673'],
                hoverBorderColor: "rgba(234, 236, 244, 1)",
            }],
        },
        options: {
            maintainAspectRatio: false,
            tooltips: {
                backgroundColor: "rgb(255,255,255)",
                bodyFontColor: "#858796",
                borderColor: '#dddfeb',
                borderWidth: 1,
                xPadding: 15,
                yPadding: 15,
                displayColors: false,
                caretPadding: 10,
            },
            legend: {
                display: false
            },
            cutoutPercentage: 80,
        },
    });
}