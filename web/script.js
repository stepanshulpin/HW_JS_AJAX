function checkIt() {
    var a = document.square.square_a.value;
    var b = document.square.square_b.value;
    var c = document.square.square_c.value;

    var valid = true;

    if (!isNaN(parseFloat(a)) && isFinite(a))
        document.square.square_a.setAttribute("style", "background-color: transparent;");
    else {
        document.square.square_a.setAttribute("style", "background-color: red;");
        valid=false;
    }

    if (!isNaN(parseFloat(b)) && isFinite(b))
        document.square.square_b.setAttribute("style", "background-color: transparent;");
    else {
        document.square.square_b.setAttribute("style", "background-color: red;");
        valid=false;
    }

    if (!isNaN(parseFloat(c)) && isFinite(c))
        document.square.square_c.setAttribute("style", "background-color: transparent;");
    else {
        document.square.square_c.setAttribute("style", "background-color: red;");
        valid=false;
    }

    document.square.square_sub.disabled=!valid;
}


function ajaxFunction() {

    var a = document.square.square_a.value;
    var b = document.square.square_b.value;
    var c = document.square.square_c.value;

    var ajaxRequest;
    try {
        ajaxRequest = new XMLHttpRequest();
    } catch (e) {
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                alert("You browser broke!");
                return false;
            }
        }
    }
    ajaxRequest.onreadystatechange = function () {
        if (ajaxRequest.readyState == 4) {
            if (ajaxRequest.status == 200) {

                var json = JSON.parse(ajaxRequest.responseText);

                var table = document.getElementById("Table"); // Получаем ссылку на таблицу

                var row = table.insertRow(table.rows.length); // Добавляем строку
                row.onclick = function () {
                    row.parentNode.removeChild(row);
                };
                var cell = row.insertCell(0);
                var content = document.createTextNode(a);
                cell.appendChild(content);

                cell = row.insertCell(1);
                content = document.createTextNode(b);
                cell.appendChild(content);
                cell = row.insertCell(2);
                content = document.createTextNode(c);
                cell.appendChild(content);
                cell = row.insertCell(3);
                content = document.createTextNode(json.x1);
                cell.appendChild(content);
                cell = row.insertCell(4);
                content = document.createTextNode(json.x2);
                cell.appendChild(content);

                var sol = document.getElementById("square_sol");

                string = "Корни: x<sub>1</sub>="+json.x1+"; x<sub>2</sub>="+json.x2+".";
                sol.innerHTML = string;


            }
            else {
                alert("WARNING: " + ajaxRequest.status);
            }
        }
    };

    var msg = "?a="+a+"&b="+b+"&c="+c;
    ajaxRequest.open('GET', 'http://localhost:8080/solve'+msg, true);
    ajaxRequest.send(null);
}
