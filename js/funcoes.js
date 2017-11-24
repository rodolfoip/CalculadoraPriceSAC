var getValue = function () {
    var value;
    var fieldValue = function () {
        value = document.getElementById("valorCampo").value;
        return value;
    }
    return fieldValue();
}
var setValue = function (valuee) {
    var value;
    var returnValue = function () {
        value = valuee;
        return value;
    }
    returnValue();
}
var getNParcel = function () {
    var nParcel;
    var fieldNParcel = function () {
        nParcel = document.getElementById("nParcelasCampo").value;
        return nParcel;
    }
    return fieldNParcel();
}
var getEntry = function () {
    var entry;
    var fieldEntry = function () {
        entry = document.getElementById("entradaCampo").value;
        return entry;
    }
    return fieldEntry();
}
var getInterest = function () {
    var interest;
    var fieldInterest = function () {
        interest = document.getElementById("jurosCampo").valueAsNumber;
        interest = (interest / 100);
        return interest;
    }
    return fieldInterest();
}
function validateFields() {
    //se existir algum alerta na tela, ele oculta
    hideAlerts();
    //verifica se os valores dos campos são positivos ou igual a 0
    if (getValue() < "1") {
        document.getElementById("valorCampo").value = "0";
        displayAlerts("valor");
        return false;
    }
    if (getNParcel() < "0") {
        document.getElementById("nParcelasCampo").value = "0";
        displayAlerts("parcela");
        return false;
    }
    if (getEntry() < "0") {
        document.getElementById("entradaCampo").value = "0";
        displayAlerts("entrada");
        return false;
    }
    if (getInterest() <= 0.00) {
        document.getElementById("jurosCampo").value = 0.01;
        displayAlerts("juros");
        return false;
    }
    return true;
}

function validateEmptFields() {
    if (getValue() === "") {
        document.getElementById("valorCampo").focus();
        return false;
    }
    if (getEntry() === "") {
        document.getElementById("entradaCampo").focus();
        return false;
    }
    if (getNParcel() === "") {
        document.getElementById("nParcelasCampo").focus();
        return false;
    }
    if (getInterest() < 0) {
        document.getElementById("jurosCampo").focus();
        return false;
    }
    return true;
}


function calcParcelPrice(valuePresent, entry, interest) {
    //conta para saber valor prestação
    valuePresent = (valuePresent - entry);
    var valueParcel = valuePresent * (interest * (Math.pow((1 + interest), getNParcel())) / ((Math.pow((1 + interest), getNParcel())) - 1));
    return valueParcel;
}

function calcPrice() {
    if (validateEmptFields() && validateFields()) {
        hideAlerts();
        var parcel = calcParcelPrice(getValue(), getEntry(), getInterest());
        //var value = setValue(getValue());
        createTabPric(parcel, getNParcel());
    }
}

function calcTotInterest(valor, interest) {
    var totInterest = valor * interest;
    return totInterest;
}
function calcBalance(value, amortiz) {
    var balance = value - amortiz;
    return balance;
}
function createTabPric(parcela, nParcelas) {
    if (document.getElementById("tbody").childElementCount > 0) {
        document.getElementById("tbody").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var tbody = document.getElementById("tbody");

    var linha = document.createElement("tr");
    var celula1, celula2, celula3, celula4, celula5;
    var texto1, texto2, texto3, texto4, texto5;
    var value = getValue();
    var totInterest, amortiz;
    for (var j = 0; j <= nParcelas; j++) {
        if (j === 0) {
            row = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            row.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(getValue());
            celula2.appendChild(texto2);
            row.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(0);
            celula3.appendChild(texto3);
            row.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(0);
            celula4.appendChild(texto4);
            row.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(getValue());
            celula5.appendChild(texto5);
            row.appendChild(celula5);

            tbody.appendChild(row);
        } else {

            totInterest = calcTotInterest(value, getInterest());
            amortiz = parcela - totInterest;
            value = calcBalance(value,amortiz);

            row = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            row.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(parcela.toFixed(2));
            celula2.appendChild(texto2);
            row.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(totInterest.toFixed(2));
            celula3.appendChild(texto3);
            row.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(amortiz.toFixed(2));
            celula4.appendChild(texto4);
            row.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(value.toFixed(2));
            celula5.appendChild(texto5);
            row.appendChild(celula5);

            tbody.appendChild(row);
        }
    }
}

function calculaSAC() {
    if (validateEmptFields() && validateFields()) {
        hideAlerts();
        var valor = document.getElementById("valorCampo").value;
        var nParcelas = document.getElementById("nParcelasCampo").value;
        var entrada = document.getElementById("entradaCampo").value;
        var juros = document.getElementById("jurosCampo").valueAsNumber;
        juros = (juros / 100);
        valor = (valor - entrada);
        var amortizacao = (valor / nParcelas);

        criarTabelaSAC(valor, juros, amortizacao, nParcelas);
    }
}

function criarTabelaSAC(valor, juros, amortizacao, nParcelas) {
    if (document.getElementById("tbody").childElementCount > 0) {
        document.getElementById("tbody").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var corpoTabela = document.getElementById("tbody");

    var row = document.createElement("tr");
    var celula1, celula2, celula3, celula4, celula5;
    var texto1, texto2, texto3, texto4, texto5;

    for (var j = 0; j <= nParcelas; j++) {
        if (j === 0) {
            row = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            row.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(valor);
            celula2.appendChild(texto2);
            row.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(0);
            celula3.appendChild(texto3);
            row.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(0);
            celula4.appendChild(texto4);
            row.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(valor);
            celula5.appendChild(texto5);
            row.appendChild(celula5);

            corpoTabela.appendChild(row);
        } else {
            var totalJuros = (valor * juros);
            var parcela = (totalJuros + amortizacao);
            valor = (valor - amortizacao);

            row = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            row.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(parcela.toFixed(2));
            celula2.appendChild(texto2);
            row.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(totalJuros.toFixed(2));
            celula3.appendChild(texto3);
            row.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(amortizacao.toFixed(2));
            celula4.appendChild(texto4);
            row.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(valor.toFixed(2));
            celula5.appendChild(texto5);
            row.appendChild(celula5);

            corpoTabela.appendChild(row);
        }
    }
}

function ocultabotaoprice() {
    document.getElementById("btnprice").style.display = "none";
    document.getElementById("btnsac").style.display = "flex";
}

function ocultabotaosac() {
    document.getElementById("btnsac").style.display = "none";
    document.getElementById("btnprice").style.display = "flex";
}

function desocultatabela() {
    document.getElementById("tabela").style.display = "flex";
}

function hideAlerts() {
    document.getElementById("alerta-valor").style.display = "none";
    document.getElementById("alerta-entrada").style.display = "none";
    document.getElementById("alerta-parcela").style.display = "none";
    document.getElementById("alerta-juros").style.display = "none";
}

function displayAlerts(campo) {
    switch (campo) {
        case "valor":
            document.getElementById("alerta-valor").style.display = "inline-block";
            break;
        case "entrada":
            document.getElementById("alerta-entrada").style.display = "inline-block";
            break;
        case "parcela":
            document.getElementById("alerta-parcela").style.display = "inline-block";
            break;
        case "juros":
            document.getElementById("alerta-juros").style.display = "inline-block";
            break;
        default:
            break;
    }
}

// S.O.L.I.D (Ver o S de responsabilidade unica)
// Isolar as funções com closures para evitar ficar exposto no Global
//gulp
//webpack
