let timeArray = [];
let valueArray = [];

async function search() {
    const selectTime = document.getElementById('interval');
    let timeOption = selectTime.value;
    const selectData = document.getElementById('data');
    let dataOption = selectData.value;
    const search = document.getElementById('foundData');
    const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/' + dataOption + '/' + timeOption);
    const data = await response.json();

    const responseLatest = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/');
    const dataLatest = await responseLatest.json();

    search.innerHTML = " ";
    timeArray.length = 0;
    valueArray.length = 0;

    let timeArrayTemp = [];
    let valueArrayTemp = [];

    let length;
    if (!timeOption) {
        for (let i = 0; i < dataLatest.length; i++) {
            if (dataOption === Object.keys(dataLatest[i].data).toString()) {
                timeArrayTemp.push(new Date(dataLatest[i].date_time));
                valueArrayTemp.push(Object.values(dataLatest[i].data).toString());
            }
        }

        if (valueArrayTemp.length >= 25) {
            length = 25;
        } else {
            length = valueArrayTemp.length;
        }

        timeArrayTemp = timeArrayTemp.slice(0, length).reverse();
        valueArrayTemp = valueArrayTemp.slice(0, length).reverse();

        for (let i = 0; i < length; i++) {
            timeArray.push(timeArrayTemp[i]);
            valueArray.push(valueArrayTemp[i]);

            let searchTable =
                `<tr id="${i + 1}">
                <td>${i + 1}</td>
                <td>${new Date(timeArray[i]).toLocaleDateString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${new Date(timeArray[i]).toLocaleTimeString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${parseFloat(valueArray[i]).toFixed(2)}</td>
		    </tr>`;
            search.innerHTML += searchTable;
        }
    } else {
        length = data.length;

        for (let i = 0; i < length; i++) {
            timeArray.push(new Date(data[i].date_time));
            valueArray.push(data[i][dataOption]);

            let searchTable =
                `<tr id="${i + 1}">
                <td>${i + 1}</td>
                <td>${new Date(data[i].date_time).toLocaleDateString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${new Date(data[i].date_time).toLocaleTimeString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${parseFloat(data[i][dataOption]).toFixed(2)}</td>
		    </tr>`;
            search.innerHTML += searchTable;
        }
    }
    //console.log(timeArray, valueArray);
    searchChart.update();
}

let searchChart = new Chart('searchChart', {
    type: "line",
    data: {
        labels: timeArray,
        datasets: [{
            borderColor: "#D8DEE9",
            data: valueArray
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
    searchChart.resize(600, 600);
});
window.addEventListener('afterprint', () => {
    searchChart.resize();
});

function sortTableNumerically(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("foundData");
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
    table = document.getElementById("foundData");
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