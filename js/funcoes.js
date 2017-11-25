var getValue = function () {
    var value;
    var fieldValue = function () {
        value = document.getElementById("valorCampo").value;
        return value;
    };
    return fieldValue();
};

var getNParcel = function () {
    var nParcel;
    var fieldNParcel = function () {
        nParcel = document.getElementById("nParcelasCampo").value;
        return nParcel;
    };
    return fieldNParcel();
};
var getEntry = function () {
    var entry;
    var fieldEntry = function () {
        entry = document.getElementById("entradaCampo").value;
        return entry;
    };
    return fieldEntry();
};
var getInterest = function () {
    var interest;
    var fieldInterest = function () {
        interest = document.getElementById("jurosCampo").value;
        return interest;
    };
    return fieldInterest();
};

//validação dos campos
function isNumberFloat(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}

function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        return false;
    }
    return true;
}

function validateFields() {
    var alert = document.getElementById("alert");
    if (!getValue()) {
        alert.style.display = "flex";
        alert.innerHTML = "O campo valor deve ser preenchido";
        return false;
    }
    if (getValue() > 5000000000) {
        alert.style.display = "flex";
        document.getElementById("valorCampo").value = "5000000000";
        alert.innerHTML = "O valor máximo para finaciamento é R$ 5 Bilhões";
        return false;
    }
    if (getEntry().length > getValue().length) {
        alert.style.display = "flex";
        alert.innerHTML = "A entrada não pode ser maior que o valor";
        document.getElementById("entradaCampo").value = "0";
        return false;
    }
    if (!getNParcel()) {
        alert.style.display = "flex";
        alert.innerHTML = "O campo parcela deve ser preenchido";
        return false;
    }
    if (getNParcel() > 360) {
        alert.style.display = "flex";
        document.getElementById("nParcelasCampo").value = "360";
        alert.innerHTML = "O valor máximo de parcelas é 360";
        return false;
    }
    if (getInterest() === "0") {
        alert.style.display = "flex";
        alert.innerHTML = "O campo juros deve ser preenchido com número positivo";
        return false;
    }
    if (!getInterest()){
        alert.style.display = "flex";
        alert.innerHTML = "O campo juros deve ser preenchido com número positivo";
        return false;
    }
    if (getInterest() > 100) {
        alert.style.display = "flex";
        document.getElementById("jurosCampo").value = "100";
        alert.innerHTML = "A taxa de juros máxima é de 100%";
        return false;
    }
    alert.style.display = "none";
    return true;

}

function calcParcelPrice(valuePresent, entry, interest) {
    //conta para saber valor prestação
    valuePresent = (valuePresent - entry);
    interest = interest / 100;
    var valueParcel = valuePresent * (interest * (Math.pow((1 + interest), getNParcel())) / ((Math.pow((1 + interest), getNParcel())) - 1));
    return valueParcel;
}

function calcPrice() {
    if (validateFields()) {
        var parcel = calcParcelPrice(getValue(), getEntry(), getInterest());
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
    if (document.getElementById("tbodytot").childElementCount > 0) {
        document.getElementById("tbodytot").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var tbody = document.getElementById("tbody");

    var row = document.createElement("tr");
    var cel1, cel2, cel3, cel4, cel5;
    var txt1, txt2, txt3, txt4, txt5;
    var value = getValue();
    var interest, amortiz;
    var totParcel = 0;
    var totAmortiz = 0;
    var totInterest = 0;
    for (var j = 0; j <= nParcel; j++) {
        if (j === 0) {
            row = document.createElement("tr");
            cel1 = document.createElement("td");
            txt1 = document.createTextNode(j);
            cel1.appendChild(txt1);
            row.appendChild(cel1);
            cel2 = document.createElement("td");
            txt2 = document.createTextNode(getValue());
            cel2.appendChild(txt2);
            row.appendChild(cel2);
            cel3 = document.createElement("td");
            txt3 = document.createTextNode(0);
            cel3.appendChild(txt3);
            row.appendChild(cel3);
            cel4 = document.createElement("td");
            txt4 = document.createTextNode(0);
            cel4.appendChild(txt4);
            row.appendChild(cel4);
            cel5 = document.createElement("td");
            txt5 = document.createTextNode(getValue());
            cel5.appendChild(txt5);
            row.appendChild(cel5);

            tbody.appendChild(row);
        } else {
            interest = calcTotInterest(value, (getInterest() / 100));
            amortiz = parcel - interest;
            value = calcBalance(value, amortiz);
            totParcel = totParcel + parcel;
            totAmortiz = totAmortiz + amortiz;
            totInterest = totInterest + interest;

            row = document.createElement("tr");
            cel1 = document.createElement("td");
            txt1 = document.createTextNode(j);
            cel1.appendChild(txt1);
            row.appendChild(cel1);
            cel2 = document.createElement("td");
            txt2 = document.createTextNode(parcel.toFixed(2));
            cel2.appendChild(txt2);
            row.appendChild(cel2);
            cel3 = document.createElement("td");
            txt3 = document.createTextNode(interest.toFixed(2));
            cel3.appendChild(txt3);
            row.appendChild(cel3);
            cel4 = document.createElement("td");
            txt4 = document.createTextNode(amortiz.toFixed(2));
            cel4.appendChild(txt4);
            row.appendChild(cel4);
            cel5 = document.createElement("td");
            txt5 = document.createTextNode(value.toFixed(2));
            cel5.appendChild(txt5);
            row.appendChild(cel5);
            tbody.appendChild(row);
        }
    }
    //adicionar total no tbody
    tbody = document.getElementById("tbodytot");
    row = document.createElement("tr");
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
    if (validateFields()) {
        var interest = (getInterest() / 100);
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
    if (document.getElementById("tbody").childElementCount > 0) {
        document.getElementById("tbody").innerHTML = "";
    }
    if (document.getElementById("tbodytot").childElementCount > 0) {
        document.getElementById("tbodytot").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var tbody = document.getElementById("tbody");

    var row = document.createElement("tr");
    var cel1, cel2, cel3, cel4, cel5;
    var txt1, txt2, txt3, txt4, txt5;
    var interestVal, parcel;
    var totParcel = 0;
    var totAmortiz = 0;
    var totInterest = 0;
    var val = value;
    for (var j = 0; j <= nParcel; j++) {
        if (j === 0) {
            row = document.createElement("tr");
            cel1 = document.createElement("td");
            txt1 = document.createTextNode(j);
            cel1.appendChild(txt1);
            row.appendChild(cel1);
            cel2 = document.createElement("td");
            txt2 = document.createTextNode(getValue());
            cel2.appendChild(txt2);
            row.appendChild(cel2);
            cel3 = document.createElement("td");
            txt3 = document.createTextNode(0);
            cel3.appendChild(txt3);
            row.appendChild(cel3);
            cel4 = document.createElement("td");
            txt4 = document.createTextNode(0);
            cel4.appendChild(txt4);
            row.appendChild(cel4);
            cel5 = document.createElement("td");
            txt5 = document.createTextNode(getValue());
            cel5.appendChild(txt5);
            row.appendChild(cel5);

            tbody.appendChild(row);
        } else {
            interestVal = calcTotInterestSac(val, interest);
            parcel = (interestVal + amortiz);
            val = (val - amortiz);
            totParcel = totParcel + parcel;
            totInterest = totInterest + interestVal;
            totAmortiz = totAmortiz + amortiz;

            row = document.createElement("tr");
            cel1 = document.createElement("td");
            txt1 = document.createTextNode(j);
            cel1.appendChild(txt1);
            row.appendChild(cel1);
            cel2 = document.createElement("td");
            txt2 = document.createTextNode(parcel.toFixed(2));
            cel2.appendChild(txt2);
            row.appendChild(cel2);
            cel3 = document.createElement("td");
            txt3 = document.createTextNode(interestVal.toFixed(2));
            cel3.appendChild(txt3);
            row.appendChild(cel3);
            cel4 = document.createElement("td");
            txt4 = document.createTextNode(amortiz.toFixed(2));
            cel4.appendChild(txt4);
            row.appendChild(cel4);
            cel5 = document.createElement("td");
            txt5 = document.createTextNode(val.toFixed(2));
            cel5.appendChild(txt5);
            row.appendChild(cel5);

            tbody.appendChild(row);
        }
    }
    //adicionar total no tbody
    tbody = document.getElementById("tbodytot");
    row = document.createElement("tr");
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
