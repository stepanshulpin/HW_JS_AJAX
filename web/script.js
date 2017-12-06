var equation = {};
var table;
function init() {

    table=new Table(document.getElementById("Table"))

}

function checkIt() {

    equation.a = document.square.square_a.value;
    equation.b = document.square.square_b.value;
    equation.c = document.square.square_c.value;

    var valid = true;

    if (!isNaN(parseFloat(equation.a)) && isFinite(equation.a))
        document.square.square_a.setAttribute("style", "background-color: transparent;");
    else {
        document.square.square_a.setAttribute("style", "background-color: red;");
        valid=false;
    }

    if (!isNaN(parseFloat(equation.b)) && isFinite(equation.b))
        document.square.square_b.setAttribute("style", "background-color: transparent;");
    else {
        document.square.square_b.setAttribute("style", "background-color: red;");
        valid=false;
    }

    if (!isNaN(parseFloat(equation.c)) && isFinite(equation.c))
        document.square.square_c.setAttribute("style", "background-color: transparent;");
    else {
        document.square.square_c.setAttribute("style", "background-color: red;");
        valid=false;
    }

    document.square.square_sub.disabled=!valid;
}

function Table(tableref) {
    this.tableref=tableref;
    this.rows =[];
    this.addRow=function (newRow){
        this.rows.push(newRow);
    }

}

function Row(x1,x2) {
    this.a=equation.a;
    this.b=equation.b;
    this.c=equation.c;
    this.x1=x1;
    this.x2=x2;

}

function printTable() {
    printRow(table.rows[table.rows.length-1]);
}

function printRow(item) {
    var row = table.tableref.insertRow(table.tableref.rows.length);
    row.onclick = function () {
        row.parentNode.removeChild(row);
    };
    addCell(row.insertCell(0),item.a);
    addCell(row.insertCell(1),item.b);
    addCell(row.insertCell(2),item.c);
    addCell(row.insertCell(3),item.x1);
    addCell(row.insertCell(4),item.x2);
}

function addCell(cell, text) {
    var content = document.createTextNode(text);
    cell.appendChild(content);
}

function msg() {

    return "?a="+equation.a+"&b="+equation.b+"&c="+equation.c;

}

function addSol(x1,x2) {
    table.addRow(new Row(x1,x2));
    printTable(table);
    var sol = document.getElementById("square_sol");
    sol.innerHTML = "Корни: x<sub>1</sub>="+x1+"; x<sub>2</sub>="+x2+".";

}

function ajaxFunction() {
    equation.a = document.square.square_a.value;
    equation.b = document.square.square_b.value;
    equation.c = document.square.square_c.value;

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
        if (ajaxRequest.readyState === 4) {
            if (ajaxRequest.status === 200) {

                var json = JSON.parse(ajaxRequest.responseText);
                addSol(json.x1,json.x2);
            }
            else {
                alert("WARNING: " + ajaxRequest.status);
            }
        }
    };
    ajaxRequest.open('GET', '/solve'+msg(), true);
    ajaxRequest.send(null);
}
