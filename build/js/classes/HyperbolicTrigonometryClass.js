"use strict";
/// <reference path="../Interfaces/HyperbolicTrigonometry.ts"/>
class HyperbolicTrigonometryClass {
    constructor() {
        this.sinh = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            upper.value = 'sinh(' + displayValue + ')';
            dis.value = Math.sinh(eval(displayValue)).toString();
        };
        this.cosh = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            upper.value = 'cosh(' + displayValue + ')';
            dis.value = Math.cosh(eval(displayValue)).toString();
        };
        this.tanh = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            upper.value = 'tanh(' + displayValue + ')';
            dis.value = Math.tanh(eval(displayValue)).toString();
        };
        this.sech = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            upper.value = 'sech(' + displayValue + ')';
            dis.value = (1 / Math.cosh(eval(displayValue))).toString();
        };
        this.cosech = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            upper.value = 'cosech(' + displayValue + ')';
            dis.value = (displayValue == '0') ? Alert : (1 / Math.sinh(eval(displayValue))).toString();
        };
        this.coth = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            upper.value = 'coth(' + dis.value + ')';
            dis.value = (displayValue == '0') ? Alert : (1 / Math.tanh(eval(displayValue))).toString();
        };
    }
}
