"use strict";
/// <reference path="../Interfaces/SimpleTrigonometry.ts"/>
class SimpleTrigonometryClass {
    constructor() {
        this.sin = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'sin(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? Math.sin(eval(displayValue)).toString() : Math.sin((eval(displayValue) * Math.PI) / 180).toString();
        };
        this.cos = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'cos(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? Math.cos(eval(displayValue)).toString() : Math.cos((eval(displayValue) * Math.PI) / 180).toString();
        };
        this.tan = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'tan(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? Math.tan(eval(displayValue)).toString() : Math.tan((eval(displayValue) * Math.PI) / 180).toString();
        };
        this.sec = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'sec(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? (1 / Math.cos(eval(displayValue))).toString() : (1 / Math.cos((eval(displayValue) * Math.PI) / 180)).toString();
        };
        this.cosec = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'cosec(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? (1 / Math.sin(eval(displayValue))).toString() : (1 / Math.sin((eval(displayValue) * Math.PI) / 180)).toString();
        };
        this.cot = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'cot(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? (1 / Math.tan(eval(displayValue))).toString() : (1 / Math.tan((eval(displayValue) * Math.PI) / 180)).toString();
        };
    }
}
