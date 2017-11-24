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

function createTabPric(parcel, nParcel) {
    if (document.getElementById("tbody").childElementCount > 0) {
        document.getElementById("tbody").innerHTML = "";
    }
    if(document.getElementById("tbodytot").childElementCount>0){
        document.getElementById("tbodytot").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var tbody = document.getElementById("tbody");

    var row = document.createElement("tr");
    var celula1, celula2, celula3, celula4, celula5;
    var texto1, texto2, texto3, texto4, texto5;
    var value = getValue();
    var interest, amortiz;
    var totParcel = 0;
    var totAmortiz = 0;
    var totInterest = 0;
    for (var j = 0; j <= nParcel; j++) {
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

            interest = calcTotInterest(value, getInterest());
            amortiz = parcel - interest;
            value = calcBalance(value, amortiz);
            totParcel = totParcel+ parcel;
            totAmortiz = totAmortiz + amortiz;
            console.log(totAmortiz);
            totInterest = totInterest + interest;

            row = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            row.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(parcel.toFixed(2));
            celula2.appendChild(texto2);
            row.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(interest.toFixed(2));
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
    //adicionar total no tbody
    var tbody = document.getElementById("tbodytot");
    var row = document.createElement("tr");
    var celtxtTotl = document.createElement("td");
    var celTxtTotlVl = document.createTextNode("Total");
    var celParcel = document.createElement("td");
    var celParcelvalue = document.createTextNode(totParcel.toFixed(2));
    var celInterest = document.createElement("td");
    var celInterestValue = document.createTextNode(totInterest.toFixed(2));
    var celAmortiz = document.createElement("td");
    var celAmortizValue = document.createTextNode(totAmortiz.toFixed(2));
    var celBalance = document.createElement("td");
    var celBalanceValue = document.createTextNode("0.00");
    celtxtTotl.appendChild(celTxtTotlVl);
    celParcel.appendChild(celParcelvalue);
    celInterest.appendChild(celInterestValue);
    celAmortiz.appendChild(celAmortizValue);
    celBalance.appendChild(celBalanceValue);
    row.appendChild(celtxtTotl);
    row.appendChild(celParcel);
    row.appendChild(celInterest);
    row.appendChild(celAmortiz);
    row.appendChild(celBalance);
    tbody.appendChild(row);
}

function calcSAC() {
    if (validateEmptFields() && validateFields()) {
        hideAlerts();
        var interest = getInterest();
        var value = (getValue() - getEntry());
        var amortiz = calcAmortizSac(value);
        createTabSAC(value, interest, amortiz, getNParcel());
    }
}

function calcAmortizSac(value) {
    var amort = value / getNParcel();
    return amort;
}
function calcTotInterestSac(value, interest) {
    var totInterest = value * interest;
    return totInterest;

}
function createTabSAC(value, interest, amortiz, nParcel) {
    if (document.getElementById("tbody").childElementCount >0) {
        document.getElementById("tbody").innerHTML = "";
    }
    if(document.getElementById("tbodytot").childElementCount>0){
        document.getElementById("tbodytot").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var tbody = document.getElementById("tbody");

    var row = document.createElement("tr");
    var celula1, celula2, celula3, celula4, celula5;
    var texto1, texto2, texto3, texto4, texto5;
    var interestVal, parcel;
    var totParcel = 0;
    var totAmortiz = 0;
    var totInterest = 0;
    var val = value;
    for (var j = 0; j <= nParcel; j++) {
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
            interestVal = calcTotInterestSac(val, interest);
            parcel = (interestVal + amortiz);
            val = (val - amortiz);
            totParcel = totParcel + parcel;
            totInterest = totInterest + interestVal;
            totAmortiz = totAmortiz + amortiz;

            row = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            row.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(parcel.toFixed(2));
            celula2.appendChild(texto2);
            row.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(interestVal.toFixed(2));
            celula3.appendChild(texto3);
            row.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(amortiz.toFixed(2));
            celula4.appendChild(texto4);
            row.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(val.toFixed(2));
            celula5.appendChild(texto5);
            row.appendChild(celula5);

            tbody.appendChild(row);
        }
    }
    //adicionar total no tbody
    var tbody = document.getElementById("tbodytot");
    var row = document.createElement("tr");
    var celtxtTotl = document.createElement("td");
    var celTxtTotlVl = document.createTextNode("Total");
    var celParcel = document.createElement("td");
    var celParcelvalue = document.createTextNode(totParcel.toFixed(2));
    var celInterest = document.createElement("td");
    var celInterestValue = document.createTextNode(totInterest.toFixed(2));
    var celAmortiz = document.createElement("td");
    var celAmortizValue = document.createTextNode(totAmortiz.toFixed(2));
    var celBalance = document.createElement("td");
    var celBalanceValue = document.createTextNode("0.00");
    celtxtTotl.appendChild(celTxtTotlVl);
    celParcel.appendChild(celParcelvalue);
    celInterest.appendChild(celInterestValue);
    celAmortiz.appendChild(celAmortizValue);
    celBalance.appendChild(celBalanceValue);
    row.appendChild(celtxtTotl);
    row.appendChild(celParcel);
    row.appendChild(celInterest);
    row.appendChild(celAmortiz);
    row.appendChild(celBalance);
    tbody.appendChild(row);
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
