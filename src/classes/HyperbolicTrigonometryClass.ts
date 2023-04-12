// /// <reference path="../Interfaces/HyperbolicTrigonometry.ts"/>

// class HyperbolicTrigonometryClass implements hyperbolicTrigonometry.IHyperbolicTrigonometricMethods {
//     sinh = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = 'sinh(' + displayValue + ')';
//         dis.value = Math.sinh(eval(displayValue)).toString();
//     }

//     cosh = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = 'cosh(' + displayValue + ')';
//         dis.value = Math.cosh(eval(displayValue)).toString();
//     }

//     tanh = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = 'tanh(' + displayValue + ')';
//         dis.value = Math.tanh(eval(displayValue)).toString();
//     }

//     sech = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = 'sech(' + displayValue + ')';
//         dis.value = (1 / Math.cosh(eval(displayValue))).toString();
//     }

//     cosech = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = 'cosech(' + displayValue + ')';
    
//         dis.value = (displayValue=='0') ? Alert : (1 / Math.sinh(eval(displayValue))).toString();
//     }
    
//     coth = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         upper.value = 'coth(' + dis.value + ')';
//         dis.value = (displayValue=='0') ? Alert : (1 / Math.tanh(eval(displayValue))).toString();
//     }
// }