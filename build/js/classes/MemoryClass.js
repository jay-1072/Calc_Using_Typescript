"use strict";
/// <reference path="../Interfaces/Memory.ts"/>
class MemoryClass {
    constructor() {
        this.memoryStore = () => {
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
        };
        this.memoryRead = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            dis.value = marr[marr.length - 1].toString();
        };
        this.memoryClear = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            marr.splice(0, marr.length);
            disableMemory(true);
        };
        this.memoryPlus = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            marr[marr.length - 1] += displayValue != Empty ? parseFloat(displayValue) : 0;
        };
        this.memoryMinus = () => {
            if (!checkForErrorMessage()) {
                return;
            }
            displayValue = dis.value;
            marr[marr.length - 1] -= parseFloat(displayValue);
        };
        this.createMemoryTable = () => {
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
        };
    }
}
