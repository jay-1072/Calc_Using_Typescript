/// <reference path="../Interfaces/BasicFunctions.ts"/>

class BasicFunctionsClass implements basicFunctions.IBasicFunctions {
    sqr = (): void => {
        if(!checkForErrorMessage()) {
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

    sqroot = (): void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        if (_root.innerHTML == '2√x') {
            upper.value = '√(' + displayValue + ')';
            dis.value = Math.sqrt(eval(displayValue)).toString();
        } else {
            upper.value = 'cuberoot(' + displayValue + ')';
            dis.value = Math.ceil(Math.pow(eval(displayValue), 1 / 3)).toString();
        }
    }

    xtoy = (): void => {
        if(!checkForErrorMessage()) {
            return;
        }
        dis.value += _expo.innerHTML == 'x<sup>y</sup>' ? '^' : " yroot ";
    }

    tentox = (): void => {
        if(!checkForErrorMessage()) {
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
    }

    log = (): void => {
        if(!checkForErrorMessage()) {
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
    }

    ln = (): void => {
        if(!checkForErrorMessage()) {
            return;
        }
    
        displayValue = dis.value;
    
        if (_ln.innerHTML == 'ln') {
            upper.value = 'ln(' + displayValue + ')';
            dis.value = Math.log(eval(displayValue)).toString();
        } else {
            upper.value = 'e^(' + displayValue + ')';
            dis.value = Math.pow(Math.E, eval(displayValue)).toString();
        }
    }

}
