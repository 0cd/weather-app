async function latest30() {
    const latest30 = document.getElementById('latest30');
    const response = await fetch('https://webapi19sa-1.course.tamk.cloud/v1/weather/');
    const data = await response.json();

    for (let i = 29; i >= 0; i--) {
        let latest30data =
            `<tr id="${30 - i}">
                <td>${30 - i}</td>
                <td>${new Date(data[i].date_time).toLocaleDateString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${new Date(data[i].date_time).toLocaleTimeString('en-GB', {timeZone: 'EET'})}</td>
		        <td>${Object.keys(data[i].data)}</td>
		        <td>${parseFloat(Object.values(data[i].data).toString()).toFixed(2)}</td>
		    </tr>`;
        latest30.innerHTML += latest30data;
    }
}

function sortTableNumerically(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("latest30");
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
    table = document.getElementById("latest30");
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