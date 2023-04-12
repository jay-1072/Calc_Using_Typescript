// /// <reference path="../Interfaces/SimpleTrigonometry.ts"/>

// class SimpleTrigonometryClass implements simpleTrigonometry.ISimpleTrigonometricMethods {
//     sin = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         mode = btntxt.innerHTML;
//         upper.value = 'sin(' +  displayValue + ')';
//         dis.value = (mode == 'RAD') ? Math.sin(eval(displayValue)).toString(): Math.sin((eval(displayValue) * Math.PI) / 180).toString();
//     }

//     cos = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         mode = btntxt.innerHTML;
//         upper.value = 'cos(' + displayValue + ')';
//         dis.value = (mode == 'RAD') ? Math.cos(eval(displayValue)).toString() : Math.cos((eval(displayValue) * Math.PI) / 180).toString();
//     }

//     tan = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         mode = btntxt.innerHTML;
//         upper.value = 'tan(' + displayValue + ')';
//         dis.value = (mode == 'RAD') ? Math.tan(eval(displayValue)).toString() : Math.tan((eval(displayValue) * Math.PI) / 180).toString();
//     }
    
//     sec = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         mode =  btntxt.innerHTML;
//         upper.value = 'sec(' + displayValue + ')';
//         dis.value = (mode == 'RAD') ? (1 / Math.cos(eval(displayValue))).toString() : (1 / Math.cos((eval(displayValue) * Math.PI) / 180)).toString();
//     }
    
//     cosec = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         mode = btntxt.innerHTML;
//         upper.value = 'cosec(' + displayValue + ')';
//         dis.value = (mode == 'RAD') ? (1 / Math.sin(eval(displayValue))).toString() : (1 / Math.sin((eval(displayValue) * Math.PI) / 180)).toString();
//     }
    
//     cot = ():void => {
//         if(!checkForErrorMessage()) {
//             return;
//         }
//         displayValue = dis.value;
//         mode = btntxt.innerHTML;
//         upper.value = 'cot(' + displayValue + ')';
//         dis.value = (mode == 'RAD') ? (1 / Math.tan(eval(displayValue))).toString() : (1 / Math.tan((eval(displayValue) * Math.PI) / 180)).toString();
//     }
// }