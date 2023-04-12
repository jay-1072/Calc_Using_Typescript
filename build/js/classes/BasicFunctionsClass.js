"use strict";
// /// <reference path="../Interfaces/BasicFunctions.ts"/>
// export class BasicFunctionsClass implements basicFunctions.IBasicFunctions {
//     sqr = (): void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         if (_sqr.innerHTML == 'x<sup>3</sup>') {
//             upper.value = 'cube(' + displayValue + ')';
//             dis.value = Math.pow(eval(displayValue), 3).toString();
//             return;
//         } 
//         upper.value = 'sqr(' + displayValue + ')';
//         dis.value = Math.pow(eval(displayValue), 2).toString();
//     }
//     sqroot = (): void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         if (_root.innerHTML == '2√x') {
//             upper.value = '√(' + displayValue + ')';
//             dis.value = Math.sqrt(eval(displayValue)).toString();
//         } else {
//             upper.value = 'cuberoot(' + displayValue + ')';
//             dis.value = Math.ceil(Math.pow(eval(displayValue), 1 / 3)).toString();
//         }
//     }
//     xtoy = (): void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         dis.value += _expo.innerHTML == 'x<sup>y</sup>' ? '^' : " yroot ";
//     }
//     tentox = (): void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         if (_tenpow.innerHTML == '10<sup>x</sup>') {
//             upper.value = '10^(' + dis.value + ')';
//             dis.value = Math.pow(10, eval(dis.value)).toString();
//         } 
//         else {
//             upper.value = '2^(' + dis.value + ')';
//             dis.value = Math.pow(2, eval(dis.value)).toString();
//         }
//     }
//     // let num = 0, base = 0, flag = true;
//     log = (): void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         if (_log.innerHTML == 'log') {
//             upper.value = 'log(' + displayValue + ')';
//             dis.value = Math.log10(eval(displayValue)).toString();
//         }
//         else {
//             if (flag) {
//                 num = eval(displayValue);
//                 upper.value = num + ' log base ';
//                 dis.value = Empty;
//             }
//             else if (!flag) {
//                 base = eval(displayValue);
//                 upper.value += displayValue;
//                 dis.value = (Math.log(num) / Math.log(base)).toString();
//             }
//             flag = !flag;
//         }
//     }
//     ln = (): void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         if (_ln.innerHTML == 'ln') {
//             upper.value = 'ln(' + displayValue + ')';
//             dis.value = Math.log(eval(displayValue)).toString();
//         } else {
//             upper.value = 'e^(' + displayValue + ')';
//             dis.value = Math.pow(Math.E, eval(displayValue)).toString();
//         }
//     }
//     inverse = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = '1/(' + displayValue + ')=';
//         try{
//             let inverseCalculation = eval(upper.value.slice(0, -1));
//             dis.value = Number.isFinite(inverseCalculation) ? inverseCalculation : ERROR;
//         }
//         catch {
//             dis.value = ERROR;
//         }
//     }
//     expo = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value; 
//         const fE = displayValue!=Empty ? parseFloat(displayValue) : 0;
//         dis.value = fE.toExponential();
//     }
//     factorial = ():void => {
//         displayValue = dis.value;
//         if(!checkForErrorMessage() || Number.parseInt(displayValue)<0) {
//             dis.value = ERROR;
//             return;
//         }
//         upper.value = 'fact(' + displayValue + ')';
//         let fact = 1;
//         if (parseFloat(displayValue) == 0 || parseFloat(displayValue) == 1) {
//             fact = 1;
//         } 
//         else {
//             for (let i = 1; i <= parseFloat(displayValue); i++) {
//                 fact *= i;
//             }
//         }
//         dis.value = fact.toString();
//     }
//     plusminus = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = (dis.value);
//         dis.value = (eval(displayValue)>0) ? (0-eval(displayValue)).toString() : (Math.abs(eval(displayValue))).toString();
//     }
// }
