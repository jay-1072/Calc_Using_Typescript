"use strict";
let dis = document.getElementById("result");
let upper = document.getElementById("subtext");
let _memoryClear = document.querySelector('#mc');
let _memoryRestore = document.querySelector('#mr');
let _memoryShow = document.querySelector('#m');
let _memoryTable = document.getElementById('memory');
let _sqr = document.getElementById('sqr');
let _root = document.getElementById('root');
let _expo = document.getElementById('expo');
let _tenpow = document.getElementById('tenpow');
let _log = document.getElementById('log');
let _ln = document.getElementById('ln');
let btntxt = document.getElementById("btntxt");
let btncheck = document.getElementById("btn-check");
let marr = [];
let op = ['+', '-', '*', '/', '%', '.'];
let otherInput = ["(", ")", "Backspace"];
/*************************************************************************************************************************************************** */
const ERROR = 'Error!', INFINITY = 'Infinity', NAN = 'NaN', Invalid = 'Invalid input', Empty = '', Message = 'Enter value between -1 and 1', Alert = 'Cannot divide by zero';
let displayValue, mode, output, checkedCnt = 0;
// ****************************************** DISPLAY INTO SCREEN **********************************
window.onkeydown = (e) => {
    const x = e.key;
    switch (x) {
        case "0":
            display("0");
            break;
        case "1":
            display("1");
            break;
        case "2":
            display("2");
            break;
        case "3":
            display("3");
            break;
        case "4":
            display("4");
            break;
        case "5":
            display("5");
            break;
        case "6":
            display("6");
            break;
        case "7":
            display("7");
            break;
        case "8":
            display("8");
            break;
        case "9":
            display("9");
            break;
        case "+":
            display("+");
            break;
        case "-":
            display("-");
            break;
        case "*":
            display("*");
            break;
        case "/":
            display("/");
            break;
        case "%":
            display("%");
            break;
        case ".":
            display(".");
            break;
        case "(":
            display("(");
            break;
        case ")":
            display(")");
            break;
        case "Backspace":
            pop();
            break;
        case "e":
            display(Math.E.toString());
            break;
        case "p":
            display(Math.PI.toString());
            break;
        case "s":
            sin();
            break;
        case "c":
            cos();
            break;
        case "t":
            tan();
            break;
        case "S":
            sinInverse();
            break;
        case "C":
            cosInverse();
            break;
        case "T":
            tanInverse();
            break;
        case "!":
            factorial();
            break;
        case "L":
            log();
            break;
        case "l":
            ln();
            break;
        case "Enter":
            answer();
            break;
        case "Delete":
            clearScreen();
            break;
        default: /* Do nothing */
            break;
    }
};
function checkForErrorMessage() {
    displayValue = dis.value;
    return displayValue == ERROR ? false : true;
}
function display(val) {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    let oldOperator = displayValue.slice(-1);
    if (op.includes(val) && op.includes(oldOperator)) {
        dis.value = displayValue.slice(0, -1) + val;
    }
    else if (val == Math.PI.toString() || val == Math.E.toString()) {
        if (op.slice(0, 5).includes(oldOperator)) {
            val = (checkedCnt == 1) ? Number.parseFloat(val).toExponential().toString() : val;
            dis.value += val;
            return;
        }
        upper.value = Empty;
        dis.value = val;
    }
    else {
        if (!(op.includes(val)) && !(otherInput.includes(val))) {
            val = (checkedCnt == 1) ? Number.parseFloat(val).toExponential().toString() : val;
        }
        dis.value += val;
    }
}
// **********************************************************************************************
function textChange() {
    btntxt.innerHTML = btntxt.innerHTML == 'DEG' ? 'RAD' : 'DEG';
}
function fe() {
    if (checkedCnt == 0) {
        btncheck.style.backgroundColor = "Red";
        checkedCnt = 1;
        return;
    }
    btncheck.style.backgroundColor = "White";
    checkedCnt = 0;
    // <It adds value after result>
}
// ************************************************************************************************
function disableMemory(state) {
    _memoryClear.disabled = state;
    _memoryRestore.disabled = state;
    _memoryShow.disabled = state;
}
// Memory store
function memoryStore() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    if (displayValue == Empty) {
        marr.push(0);
    }
    if (marr[marr.length - 1] != parseFloat(displayValue)) {
        marr.push(parseFloat(displayValue));
    }
    disableMemory(false);
}
// Memory read
function memoryRead() {
    if (!checkForErrorMessage()) {
        return;
    }
    dis.value = marr[marr.length - 1].toString();
}
//  Memory clear
function memoryClear() {
    if (!checkForErrorMessage()) {
        return;
    }
    marr.splice(0, marr.length);
    disableMemory(true);
}
// Memory plus
function memoryPlus() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    marr[marr.length - 1] += displayValue != Empty ? parseFloat(displayValue) : 0;
}
// Memory minus
function memoryMinus() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    marr[marr.length - 1] -= parseFloat(displayValue);
}
// Create memory table
function createMemoryTable() {
    if (!checkForErrorMessage()) {
        return;
    }
    let html = "<table>";
    for (var i = marr.length - 1; i >= 0; i--) {
        html += "<tr>";
        html += "<td>" + marr[i] + "</td>";
        html += "</tr>";
    }
    html += "</table>";
    _memoryTable.innerHTML = html;
}
// ************************************************************************************
// *********************************** TRIGONOMETRY ***********************************************
document.getElementById("second").addEventListener("click", function (e) {
    e.stopPropagation();
});
document.getElementById("second1").addEventListener("click", function (e) {
    e.stopPropagation();
});
// INSIDE TRIGONOMETRY
function sin() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'sin(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? Math.sin(eval(displayValue)).toString() : Math.sin((eval(displayValue) * Math.PI) / 180).toString();
}
function cos() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'cos(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? Math.cos(eval(displayValue)).toString() : Math.cos((eval(displayValue) * Math.PI) / 180).toString();
}
function tan() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'tan(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? Math.tan(eval(displayValue)).toString() : Math.tan((eval(displayValue) * Math.PI) / 180).toString();
}
function sec() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'sec(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? (1 / Math.cos(eval(displayValue))).toString() : (1 / Math.cos((eval(displayValue) * Math.PI) / 180)).toString();
}
function cosec() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'cosec(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? (1 / Math.sin(eval(displayValue))).toString() : (1 / Math.sin((eval(displayValue) * Math.PI) / 180)).toString();
}
function cot() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'cot(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? (1 / Math.tan(eval(displayValue))).toString() : (1 / Math.tan((eval(displayValue) * Math.PI) / 180)).toString();
}
// ****************************************** Inverse Trigonometry ********************************************
function inv_RAD_DEG(val) {
    return ((val * 180) * (Math.PI ** -1));
}
// 2nd INSIDE TRIGONOMETRY
function sinInverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'sin-1(' + displayValue + ')';
    if (parseFloat(displayValue) >= -1 && parseFloat(displayValue) <= 1) {
        dis.value = (mode == 'RAD') ? Math.asin(eval(displayValue)).toString() : inv_RAD_DEG(Math.asin(eval(displayValue))).toString();
        return;
    }
    dis.value = Message;
}
function cosInverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'cos-1(' + displayValue + ')';
    if (parseFloat(displayValue) >= -1 && parseFloat(displayValue) <= 1) {
        dis.value = (mode == 'RAD') ? Math.acos(eval(displayValue)).toString() : inv_RAD_DEG(Math.acos(eval(displayValue))).toString();
        return;
    }
    dis.value = Message;
}
function tanInverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'tan-1(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? Math.atan(eval(displayValue)).toString() : inv_RAD_DEG(Math.atan(eval(displayValue))).toString();
}
function secInverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'sec-1(' + displayValue + ')';
    if (parseFloat(displayValue) >= -1 && parseFloat(displayValue) <= 1) {
        dis.value = Invalid;
        return;
    }
    dis.value = (mode == 'RAD') ? Math.acos(1 / eval(displayValue)).toString() : inv_RAD_DEG(Math.acos(1 / eval(displayValue))).toString();
}
function cosecInverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'cosec-1(' + displayValue + ')';
    if (parseFloat(displayValue) >= -1 && parseFloat(displayValue) <= 1) {
        dis.value = Invalid;
        return;
    }
    dis.value = (mode == 'RAD') ? Math.asin(1 / eval(displayValue)).toString() : inv_RAD_DEG(Math.asin(1 / eval(displayValue))).toString();
}
function cotInverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    mode = btntxt.innerHTML;
    upper.value = 'cot-1(' + displayValue + ')';
    dis.value = (mode == 'RAD') ? Math.atan(1 / eval(displayValue)).toString() : inv_RAD_DEG(Math.atan(1 / eval(displayValue))).toString();
}
// ****************************************** Hyperbolic Trigonometry ****************************************
function sinh() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'sinh(' + displayValue + ')';
    dis.value = Math.sinh(eval(displayValue)).toString();
}
function cosh() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'cosh(' + displayValue + ')';
    dis.value = Math.cosh(eval(displayValue)).toString();
}
function tanh() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'tanh(' + displayValue + ')';
    dis.value = Math.tanh(eval(displayValue)).toString();
}
function sech() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'sech(' + displayValue + ')';
    dis.value = (1 / Math.cosh(eval(displayValue))).toString();
}
function cosech() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'cosech(' + displayValue + ')';
    dis.value = (displayValue == '0') ? Alert : (1 / Math.sinh(eval(displayValue))).toString();
}
function coth() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'coth(' + dis.value + ')';
    dis.value = (displayValue == '0') ? Alert : (1 / Math.tanh(eval(displayValue))).toString();
}
// **********************************************************************************************
// ********************************** INSIDE FUNCTION *******************************************
function absolute() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'abs(' + displayValue + ')=';
    dis.value = Math.abs(eval(displayValue)).toString();
}
function ceil() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'ceil(' + displayValue + ')';
    dis.value = Math.ceil(eval(displayValue)).toString();
}
function floor() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = 'floor(' + displayValue + ')';
    dis.value = Math.floor(displayValue);
}
function rand() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = Empty;
    dis.value = Math.random(displayValue);
}
function degreeMinuteSecond() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = "dms(" + displayValue + ")";
    let degree = Math.floor(displayValue);
    let minutes = ((displayValue - Math.floor(displayValue)) * 60.0);
    let seconds = (minutes - Math.floor(minutes)) * 60.0;
    dis.value = degree + "." + Math.floor(minutes) + seconds.toFixed(0);
}
function deg() {
}
// **********************************************************************************************
var btnCount = 0;
function changeBtn() {
    if (btnCount % 2 === 1) {
        _sqr.innerHTML = 'x<sup>2</sup>';
        _root.innerHTML = '2&#x221A;x';
        _expo.innerHTML = 'x<sup>y</sup>';
        _tenpow.innerHTML = '10<sup>x</sup>';
        _log.innerHTML = 'log';
        _ln.innerHTML = 'ln';
        btnCount = 0;
    }
    else {
        _sqr.innerHTML = 'x<sup>3</sup>';
        _root.innerHTML = '3&#x221A;x';
        _expo.innerHTML = 'y&#x221A;x';
        _tenpow.innerHTML = '2<sup>x</sup>';
        _log.innerHTML = 'log<sub>y</sub>x';
        _ln.innerHTML = 'e<sup>x</sup>';
        btnCount = 1;
    }
}
// ****************************************** 1st row ********************************************
function clearScreen() {
    displayValue = dis.value;
    if (displayValue == Empty) {
        upper.value = Empty;
    }
    dis.value = '';
}
function pop() {
    displayValue = dis.value;
    if (displayValue == ERROR || displayValue == INFINITY || displayValue == NAN) {
        dis.value = upper.value = Empty;
        return;
    }
    dis.value = displayValue.slice(0, displayValue.length - 1);
}
// ******************************************* 2nd row ******************************************
function sqr() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    if (_sqr.innerHTML == 'x<sup>3</sup>') {
        upper.value = 'cube(' + displayValue + ')';
        dis.value = Math.pow(eval(displayValue), 3).toString();
        return;
    }
    upper.value = 'sqr(' + displayValue + ')';
    dis.value = Math.pow(eval(displayValue), 2).toString();
}
function inverse() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    upper.value = '1/(' + displayValue + ')=';
    try {
        let inverseCalculation = eval(upper.value.slice(0, -1));
        dis.value = Number.isFinite(inverseCalculation) ? inverseCalculation : ERROR;
    }
    catch (_a) {
        dis.value = ERROR;
    }
}
function expo() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    const fE = displayValue != Empty ? parseFloat(displayValue) : 0;
    dis.value = fE.toExponential();
}
// ******************************************** 3rd row *****************************************
function sqroot() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    if (_root.innerHTML == '2√x') {
        upper.value = '√(' + displayValue + ')';
        dis.value = Math.sqrt(displayValue);
    }
    else {
        upper.value = 'cuberoot(' + displayValue + ')';
        dis.value = Math.ceil(Math.pow(displayValue, 1 / 3));
    }
}
function factorial() {
    displayValue = dis.value;
    if (!checkForErrorMessage() || Number.parseInt(displayValue) < 0) {
        dis.value = ERROR;
        return;
    }
    upper.value = 'fact(' + displayValue + ')';
    let fact = 1;
    if (displayValue == 0 || displayValue == 1) {
        fact = 1;
    }
    else {
        for (let i = 1; i <= displayValue; i++) {
            fact *= i;
        }
    }
    dis.value = fact;
}
// ********************************************* 4th row ****************************************
function xtoy() {
    if (!checkForErrorMessage()) {
        return;
    }
    dis.value += _expo.innerHTML == 'x<sup>y</sup>' ? '^' : " yroot ";
}
// ********************************************** 5th row ***************************************
function tentox() {
    if (!checkForErrorMessage()) {
        return;
    }
    if (_tenpow.innerHTML == '10<sup>x</sup>') {
        upper.value = '10^(' + dis.value + ')';
        dis.value = Math.pow(10, dis.value);
    }
    else {
        upper.value = '2^(' + dis.value + ')';
        dis.value = Math.pow(2, dis.value);
    }
}
// ********************************************** 6th row ***************************************
let num = 0, base = 0, flag = true;
function log() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    if (_log.innerHTML == 'log') {
        upper.value = 'log(' + displayValue + ')';
        dis.value = Math.log10(displayValue);
    }
    else {
        if (flag) {
            num = displayValue;
            upper.value = num + ' log base ';
            dis.value = Empty;
        }
        else if (!flag) {
            base = displayValue;
            upper.value += displayValue;
            dis.value = Math.log(num) / Math.log(base);
        }
        flag = !flag;
    }
}
// *********************************************** 7th row*****************************************
function ln() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    if (_ln.innerHTML == 'ln') {
        upper.value = 'ln(' + displayValue + ')';
        dis.value = Math.log(displayValue);
    }
    else {
        upper.value = 'e^(' + displayValue + ')';
        dis.value = Math.pow(Math.E, displayValue);
    }
}
function plusminus() {
    if (!checkForErrorMessage()) {
        return;
    }
    displayValue = dis.value;
    dis.value = (displayValue > 0) ? (0 - displayValue) : (Math.abs(displayValue));
}
// **********************************************************************************************
function answer() {
    displayValue = dis.value;
    if (!checkForErrorMessage() || displayValue == Invalid) {
        return;
    }
    let error = Empty;
    try {
        upper.value = displayValue + '=';
        dis.value = Empty;
        let x = upper.value.slice(0, -1);
        if (x.includes("^")) {
            x = x.replace('^', '**');
        }
        else if (x.includes("yroot")) {
            let substrArr = x.split('yroot');
            let rightOprand = substrArr[1].trim();
            rightOprand = 1 / rightOprand;
            x = substrArr[0] + ' ** (' + rightOprand + ')';
        }
        output = Number.isFinite(eval(x)) ? eval(x) : ERROR;
    }
    catch (_a) {
        error = ERROR;
    }
    dis.value = (error == ERROR) ? ERROR : ((checkedCnt == 1) ? Number.parseFloat(output.toString()).toExponential().toString() : output.toString());
}
