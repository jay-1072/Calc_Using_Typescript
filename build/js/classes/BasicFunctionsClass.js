"use strict";
/// <reference path="../Interfaces/BasicFunctions.ts"/>
class BasicFunctionsClass {
    constructor() {
        this.display = (val) => {
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
        };
        this.sqr = () => {
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
        };
        this.sqroot = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            if (_root.innerHTML == '2√x') {
                upper.value = '√(' + displayValue + ')';
                dis.value = Math.sqrt(eval(displayValue)).toString();
            }
            else {
                upper.value = 'cuberoot(' + displayValue + ')';
                dis.value = Math.ceil(Math.pow(eval(displayValue), 1 / 3)).toString();
            }
        };
        this.xtoy = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            dis.value += _expo.innerHTML == 'x<sup>y</sup>' ? '^' : " yroot ";
        };
        this.tentox = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            if (_tenpow.innerHTML == '10<sup>x</sup>') {
                upper.value = '10^(' + dis.value + ')';
                dis.value = Math.pow(10, eval(dis.value)).toString();
            }
            else {
                upper.value = '2^(' + dis.value + ')';
                dis.value = Math.pow(2, eval(dis.value)).toString();
            }
        };
        this.log = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            if (_log.innerHTML == 'log') {
                upper.value = 'log(' + displayValue + ')';
                dis.value = Math.log10(eval(displayValue)).toString();
            }
            else {
                if (flag) {
                    num = eval(displayValue);
                    upper.value = num + ' log base ';
                    dis.value = Empty;
                }
                else if (!flag) {
                    base = eval(displayValue);
                    upper.value += displayValue;
                    dis.value = (Math.log(num) / Math.log(base)).toString();
                }
                flag = !flag;
            }
        };
        this.ln = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            if (_ln.innerHTML == 'ln') {
                upper.value = 'ln(' + displayValue + ')';
                dis.value = Math.log(eval(displayValue)).toString();
            }
            else {
                upper.value = 'e^(' + displayValue + ')';
                dis.value = Math.pow(Math.E, eval(displayValue)).toString();
            }
        };
    }
}
