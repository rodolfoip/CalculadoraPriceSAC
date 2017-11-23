function validarValoresCampos() {
    var valor = document.getElementById("valorCampo").value;
    var nParcelas = document.getElementById("nParcelasCampo").value;
    var entrada = document.getElementById("entradaCampo").value;
    var juros = document.getElementById("jurosCampo").valueAsNumber;
    ocultaAlertas();
    if (valor < "1") {
        document.getElementById("valorCampo").value = "0";
        exibeAlertas("valor");
        return false;
    }
    if (nParcelas < "0") {
        document.getElementById("nParcelasCampo").value = "0";
        exibeAlertas("parcela");
        return false;
    }
    if (entrada < "0") {
        document.getElementById("entradaCampo").value = "0";
        exibeAlertas("entrada");
        return false;
    }
    if (juros < 0.00) {
        document.getElementById("jurosCampo").value = 0.00;
        exibeAlertas("juros");
        return false;
    }
    return true;
}

function validarCamposVazios() {
    var valor = document.getElementById("valorCampo").value;
    var nParcelas = document.getElementById("nParcelasCampo").value;
    var entrada = document.getElementById("entradaCampo").value;
    var juros = document.getElementById("jurosCampo").valueAsNumber;

    if (valor === "") {
        document.getElementById("valorCampo").focus();
        return false;
    }
    if (entrada === "") {
        document.getElementById("entradaCampo").focus();
        return false;
    }
    if (nParcelas === "") {
        document.getElementById("nParcelasCampo").focus();
        return false;
    }
    if (juros < 0) {
        document.getElementById("jurosCampo").focus();
        return false;
    }
    return true;
}


function calculaParcelaPrice(valorPresente, nParcelas, entrada, juros) {
    //conta para saber valor prestação
    valorPresente = (valorPresente - entrada);
    var valorParcela = valorPresente * (juros * (Math.pow((1 + juros), nParcelas)) / ((Math.pow((1 + juros), nParcelas)) - 1));
    return valorParcela;
}

function calculaPrice() {
    if (validarCamposVazios()&& validarValoresCampos()) {
        ocultaAlertas();
        var valor = document.getElementById("valorCampo").value;
        var nParcelas = document.getElementById("nParcelasCampo").value;
        var entrada = document.getElementById("entradaCampo").value;
        var juros = document.getElementById("jurosCampo").valueAsNumber;
        juros = (juros / 100);
        var parcela = calculaParcelaPrice(valor, nParcelas, entrada, juros);

        criaTabelaPrice(valor, parcela, nParcelas, juros);
    }
}

function criaTabelaPrice(valor, parcela, nParcelas, juros) {
    //verifica se existe tabela, caso sim, apaga
    if (document.getElementById("tabela").childElementCount !== 0) {
        console.log("apagou tabela");
        document.getElementById("tabela").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var corpo = document.getElementById("tabela");

    var tabela = document.createElement("table");
    var corpoTabela = document.createElement("tbody");
    var headerTabela = document.createElement("thead");
    tabela.setAttribute("class", "table");
    headerTabela.setAttribute("class", "thead-dark");
    var colunas = ["Nº", "Valor parcela", "Juros", "Amortização", "Saldo devedor"];
    var celulaColuna;
    var textoColuna;
    var linha = document.createElement("tr");
    var celula1, celula2, celula3, celula4, celula5;
    var texto1, texto2, texto3, texto4, texto5;
    for (var i = 0; i < 5; i++) {
        celulaColuna = document.createElement("th");
        textoColuna = document.createTextNode(colunas[i]);
        celulaColuna.appendChild(textoColuna);
        linha.appendChild(celulaColuna);
        headerTabela.appendChild(linha);
        celulaColuna.setAttribute("class", "col");
    }
    for (var j = 0; j <= nParcelas; j++) {
        if (j === 0) {
            linha = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            linha.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(valor);
            celula2.appendChild(texto2);
            linha.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(0);
            celula3.appendChild(texto3);
            linha.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(0);
            celula4.appendChild(texto4);
            linha.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(valor);
            celula5.appendChild(texto5);
            linha.appendChild(celula5);

            corpoTabela.appendChild(linha);
        } else {

            var totalJuros = valor * juros;
            var amortizacao = parcela - totalJuros;
            valor = valor - amortizacao;

            linha = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            linha.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(parcela.toFixed(2));
            celula2.appendChild(texto2);
            linha.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(totalJuros.toFixed(2));
            celula3.appendChild(texto3);
            linha.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(amortizacao.toFixed(2));
            celula4.appendChild(texto4);
            linha.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(valor.toFixed(2));
            celula5.appendChild(texto5);
            linha.appendChild(celula5);

            corpoTabela.appendChild(linha);
        }
    }
    tabela.appendChild(headerTabela);
    tabela.appendChild(corpoTabela);
    corpo.appendChild(tabela);
}

function calculaSAC() {
    if (validarCamposVazios()&& validarValoresCampos()) {
        ocultaAlertas();
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
    //verifica se existe tabela, caso sim, apaga
    if (document.getElementById("tabela").childElementCount !== 0) {
        console.log("apagou tabela");
        document.getElementById("tabela").innerHTML = "";
    }
    desocultatabela();
    //TABELA
    var corpo = document.getElementById("tabela");

    var tabela = document.createElement("table");
    var corpoTabela = document.createElement("tbody");
    var headerTabela = document.createElement("thead");
    tabela.setAttribute("class", "table");
    headerTabela.setAttribute("class", "thead-dark");
    var colunas = ["Nº", "Valor parcela", "Juros", "Amortização", "Saldo devedor"];
    var celulaColuna;
    var textoColuna;
    var linha = document.createElement("tr");
    var celula1, celula2, celula3, celula4, celula5;
    var texto1, texto2, texto3, texto4, texto5;
    for (var i = 0; i < 5; i++) {
        celulaColuna = document.createElement("th");
        textoColuna = document.createTextNode(colunas[i]);
        celulaColuna.appendChild(textoColuna);
        linha.appendChild(celulaColuna);
        headerTabela.appendChild(linha);
        celulaColuna.setAttribute("class", "col");
    }
    for (var j = 0; j <= nParcelas; j++) {
        if (j === 0) {
            linha = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            linha.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(valor);
            celula2.appendChild(texto2);
            linha.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(0);
            celula3.appendChild(texto3);
            linha.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(0);
            celula4.appendChild(texto4);
            linha.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(valor);
            celula5.appendChild(texto5);
            linha.appendChild(celula5);

            corpoTabela.appendChild(linha);
        } else {
            var totalJuros = (valor * juros);
            var parcela = (totalJuros + amortizacao);
            valor = (valor - amortizacao);

            linha = document.createElement("tr");
            celula1 = document.createElement("td");
            texto1 = document.createTextNode(j);
            celula1.appendChild(texto1);
            linha.appendChild(celula1);
            celula2 = document.createElement("td");
            texto2 = document.createTextNode(parcela.toFixed(2));
            celula2.appendChild(texto2);
            linha.appendChild(celula2);
            celula3 = document.createElement("td");
            texto3 = document.createTextNode(totalJuros.toFixed(2));
            celula3.appendChild(texto3);
            linha.appendChild(celula3);
            celula4 = document.createElement("td");
            texto4 = document.createTextNode(amortizacao.toFixed(2));
            celula4.appendChild(texto4);
            linha.appendChild(celula4);
            celula5 = document.createElement("td");
            texto5 = document.createTextNode(valor.toFixed(2));
            celula5.appendChild(texto5);
            linha.appendChild(celula5);

            corpoTabela.appendChild(linha);
        }
    }
    tabela.appendChild(headerTabela);
    tabela.appendChild(corpoTabela);
    corpo.appendChild(tabela);
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
function ocultaAlertas() {
    document.getElementById("alerta-valor").style.display = "none";
    document.getElementById("alerta-entrada").style.display = "none";
    document.getElementById("alerta-parcela").style.display = "none";
    document.getElementById("alerta-juros").style.display = "none";
}
function exibeAlertas(campo) {
    switch (campo){
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
