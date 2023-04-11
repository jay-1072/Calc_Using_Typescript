"use strict";
/// <reference path="../Interfaces/InverseTrigonometry.ts"/>
class InverseTrigonometryClass {
    constructor() {
        this.sinInverse = () => {
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
        };
        this.cosInverse = () => {
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
        };
        this.tanInverse = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'tan-1(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? Math.atan(eval(displayValue)).toString() : inv_RAD_DEG(Math.atan(eval(displayValue))).toString();
        };
        this.secInverse = () => {
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
        };
        this.cosecInverse = () => {
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
        };
        this.cotInverse = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            mode = btntxt.innerHTML;
            upper.value = 'cot-1(' + displayValue + ')';
            dis.value = (mode == 'RAD') ? Math.atan(1 / eval(displayValue)).toString() : inv_RAD_DEG(Math.atan(1 / eval(displayValue))).toString();
        };
    }
}
