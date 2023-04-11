/// <reference path="../Interfaces/Functions.ts"/>

class FunctionsClass implements functions.IFunctionMethods {
    absolute = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        upper.value = 'abs(' + displayValue + ')=';
        dis.value = Math.abs(eval(displayValue)).toString();
    }
    ceil = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        upper.value = 'ceil(' + displayValue + ')';
        dis.value = Math.ceil(eval(displayValue)).toString();
    }
    floor = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        upper.value = 'floor(' + displayValue + ')';
        dis.value = Math.floor(eval(displayValue)).toString();
    }
    rand = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        upper.value = Empty;
        dis.value = Math.random().toString();
    }
    degreeMinuteSecond = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        upper.value = "dms(" + displayValue + ")";
        let degree = Math.floor(parseFloat(displayValue));
        let minutes = ((parseFloat(displayValue) - degree) * 60.0);
        let seconds = (minutes - Math.floor(minutes)) * 60.0;
        dis.value = degree + "." + Math.floor(minutes) + seconds.toFixed(0);
    }
    deg = ():void => {
        
    }
    
}