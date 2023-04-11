let windTimeArray = [];
let windArray = [];

async function windSpeed() {
    const select = document.getElementById('interval');
    let option = select.value;
    const windSpeed = document.getElementById('windSpeed');
    const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/' + option);
    const data = await response.json();

    windSpeed.innerHTML = " ";
    windTimeArray.length = 0;
    windArray.length = 0;

    let length = (!option) ? 20:data.length;
    for (let i = 0; i < length; i++) {
        windTimeArray.push(new Date(data[i].date_time));
        windArray.push(data[i].wind_speed);
        let windTable =
            `<tr id="${i + 1}">
                <td>${i + 1}</td>
                <td>${new Date(data[i].date_time).toLocaleDateString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${new Date(data[i].date_time).toLocaleTimeString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${parseFloat(data[i].wind_speed).toFixed(2)}</td>
		    </tr>`;
        windSpeed.innerHTML += windTable;
    }
    //console.log(windTimeArray, windArray);
    windChart.update();
}

let windChart = new Chart('windSpeedChart', {
    type: "bar",
    data: {
        labels: windTimeArray,
        datasets: [{
            hoverBackgroundColor: "#ECEFF4",
            backgroundColor: "#D8DEE9",
            data: windArray
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {display: false},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }],
            xAxes: [{
                ticks: {
                    callback: function(value) {
                        return new Date(value).toLocaleString('en-GB', {timeZone: 'EET'});
                    },
                }
            }]
        }
    }
})

window.addEventListener('beforeprint', () => {
    windChart.resize(600, 600);
});
window.addEventListener('afterprint', () => {
    windChart.resize();
});

function sortTableNumerically(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("windSpeed");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < rows.length - 1 ; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir === "asc") {
                if (Number(x.innerHTML.toLowerCase()) > Number(y.innerHTML.toLowerCase())) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir === "desc") {
                if (Number(x.innerHTML.toLowerCase()) < Number(y.innerHTML.toLowerCase())) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

function sortTableAlphabetically(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("windSpeed");
    switching = true;
    dir = "asc";

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 0; i < rows.length - 1 ; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir === "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch= true;
                    break;
                }
            } else if (dir === "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;
        } else {
            if (switchcount === 0 && dir === "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}