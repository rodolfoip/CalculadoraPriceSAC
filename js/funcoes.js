//Pega valores dos campos no HTML
var getValue = function () {
    var value;
    var fieldValue = function () {
        value = document.getElementById("valueInput").value;
        return value;
    };
    return fieldValue();
};

var getNParcel = function () {
    var nParcel;
    var fieldNParcel = function () {
        nParcel = document.getElementById("nParcelInput").value;
        return nParcel;
    };
    return fieldNParcel();
};
var getEntry = function () {
    var entry;
    var fieldEntry = function () {
        entry = document.getElementById("entryInput").value;
        return entry;
    };
    return fieldEntry();
};
var getInterest = function () {
    var interest;
    var fieldInterest = function () {
        interest = document.getElementById("interestInput").value;
        return interest;
    };
    return fieldInterest();
};

//validação dos campos
//Permite que seja digitado apenas valores numericos e pontos
function isNumberFloat(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
        return false;

    return true;
}
//Permite que seja digitado apenas valores numericos
function isNumber(evt) {
    var iKeyCode = (evt.which) ? evt.which : evt.keyCode;
    if (iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57)) {
        return false;
    }
    return true;
}
//verifica se os campos estão vazios ou com valores incorretos
function validateFields() {
    var alert = document.getElementById("alert");
    var value = parseFloat(getValue());
    var entry = parseFloat(getEntry());
    if (!getValue()) {
        alert.style.display = "flex";
        alert.innerHTML = "O campo valor deve ser preenchido";
        return false;
    }
    if (value > 5000000000) {
        alert.style.display = "flex";
        document.getElementById("valueInput").value = "5000000000";
        alert.innerHTML = "O valor máximo para finaciamento é R$ 5 Bilhões";
        return false;
    }
    if (value <= entry) {
        alert.style.display = "flex";
        alert.innerHTML = "A entrada deve ser menor que o valor";
        document.getElementById("entryInput").value = "0";
        return false;
    }
    if (entry > 5000000000) {
        document.getElementById("entryInput").value = "5000000000";
        alert.style.display = "flex";
        alert.innerHTML = "O valor máximo para entrada é R$ 5 Bilhões";
        return false;
    }
    if (!getNParcel()) {
        alert.style.display = "flex";
        alert.innerHTML = "O campo parcela deve ser preenchido";
        return false;
    }
    if (getNParcel() > 360) {
        alert.style.display = "flex";
        document.getElementById("nParcelInput").value = "360";
        alert.innerHTML = "O valor máximo de parcelas é 360";
        return false;
    }
    if (getInterest() === "0") {
        alert.style.display = "flex";
        alert.innerHTML = "O campo juros deve ser preenchido com número positivo";
        return false;
    }
    if (!getInterest()) {
        alert.style.display = "flex";
        alert.innerHTML = "O campo juros deve ser preenchido com número positivo";
        return false;
    }
    if (getInterest() > 100) {
        alert.style.display = "flex";
        document.getElementById("interestInput").value = "100";
        alert.innerHTML = "A taxa de juros máxima é de 100%";
        return false;
    }
    alert.style.display = "none";
    return true;

}
//calcula o valor da parcela do financiamento price
function calcParcelPrice(valuePresent, interest) {
    //conta para saber valor prestação
    interest = interest / 100;
    var valueParcel = valuePresent * (interest * (Math.pow((1 + interest), getNParcel())) / ((Math.pow((1 + interest), getNParcel())) - 1));
    return valueParcel;
}
//calcula chama as funções que calculam os valores e os exibe na tabela
function calcPrice() {
    if (validateFields()) {
        var valuePresent = (getValue() - getEntry());
        var parcel = calcParcelPrice(valuePresent, getInterest());
        createTabPric(valuePresent, parcel, getNParcel());
    }

}
//calcula o juros de cada periodo
function calcTotInterest(value, interest) {
    var totInterest = value * (interest / 100);
    return totInterest;
}
//calcula o saldo devedor de cada periodo
function calcBalance(value, amortiz) {
    var balance = value - amortiz;
    return balance;
}
//verifica se existe elementos na tabela, e se existirem ele apaga
function checkExistingTable() {
    if (document.getElementById("tbody").childElementCount > 0) {
        document.getElementById("tbody").innerHTML = "";
    }
    if (document.getElementById("tbodytot").childElementCount > 0) {
        document.getElementById("tbodytot").innerHTML = "";
    }
}
//cria os elementos e os exibe na tabela
function createTabPric(valuePresent, parcel, nParcel) {
    checkExistingTable();
    uncoverTable();
    //Encontra corpo da tabela
    var tbody = document.getElementById("tbody");
    //cria linhas e celulas, e os adiciona no corpo da tabela
    var row = document.createElement("tr");
    var cel1, cel2, cel3, cel4, cel5;
    var txt1, txt2, txt3, txt4, txt5;
    var interest;
    var amortiz;
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
            interest = calcTotInterest(valuePresent, getInterest());
            amortiz = parcel - interest;
            valuePresent = calcBalance(valuePresent, amortiz);
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
            txt5 = document.createTextNode(valuePresent.toFixed(2));
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
//chama as funções que fazem o calculo do financiamento SAC
function calcSAC() {
    if (validateFields()) {
        var interest = (getInterest() / 100);
        var value = (getValue() - getEntry());
        var amortiz = calcAmortizSac(value);
        createTabSAC(value, interest, amortiz, getNParcel());
    }
}

//calcula amortização do financiamento SAC
function calcAmortizSac(value) {
    var amort = value / getNParcel();
    return amort;
}
//calcula juros de cada periodo
function calcTotInterestSac(value, interest) {
    var totInterest = value * interest;
    return totInterest;

}
//cria os elementos e os exibe na tabela
function createTabSAC(value, interest, amortiz, nParcel) {
    if (document.getElementById("tbody").childElementCount > 0) {
        document.getElementById("tbody").innerHTML = "";
    }
    if (document.getElementById("tbodytot").childElementCount > 0) {
        document.getElementById("tbodytot").innerHTML = "";
    }
    uncoverTable();
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
//oculta o botão para calcular financiamento price
function hideBtnPrice() {
    document.getElementById("btnprice").style.display = "none";
    document.getElementById("btnsac").style.display = "flex";
}
//oculta o botão para calcular financiamento SAC
function hideBtnSac() {
    document.getElementById("btnsac").style.display = "none";
    document.getElementById("btnprice").style.display = "flex";
}
//desoculta a div onde está a tabela
function uncoverTable() {
    document.getElementById("div-table").style.display = "flex";
}
