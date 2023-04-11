/// <reference path="../Interfaces/BasicFunctions.ts"/>

class BasicFunctionsClass implements basicFunctions.IBasicFunctions {
    
    display = (val:string):void => {

        if(!checkForErrorMessage()) {
            return;
        }
    
        displayValue = dis.value;
        let oldOperator = displayValue.slice(-1);
    
        if (op.includes(val) && op.includes(oldOperator)) {
            dis.value = displayValue.slice(0, -1) + val;
        } 
        else if(val==Math.PI.toString() || val==Math.E.toString()) {
            if(op.slice(0, 5).includes(oldOperator)) {
                val = (checkedCnt==1)?Number.parseFloat(val).toExponential().toString():val;
                dis.value += val;
                return;
            }
            upper.value = Empty;
            dis.value = val;
        }
        else {
            if(!(op.includes(val)) && !(otherInput.includes(val))) {
                val = (checkedCnt==1)?Number.parseFloat(val).toExponential().toString():val;
            }
            
            dis.value += val;
        }
    }

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

    inverse = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = dis.value;
        upper.value = '1/(' + displayValue + ')=';
        try{
            let inverseCalculation = eval(upper.value.slice(0, -1));
            dis.value = Number.isFinite(inverseCalculation) ? inverseCalculation : ERROR;
        }
        catch {
            dis.value = ERROR;
        }
    }

    expo = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
    
        displayValue = dis.value; 
        const fE = displayValue!=Empty ? parseFloat(displayValue) : 0;
        dis.value = fE.toExponential();
    }

    factorial = ():void => {
        displayValue = dis.value;
        if(!checkForErrorMessage() || Number.parseInt(displayValue)<0) {
            dis.value = ERROR;
            return;
        }
        
        upper.value = 'fact(' + displayValue + ')';
        let fact = 1;
        if (parseFloat(displayValue) == 0 || parseFloat(displayValue) == 1) {
            fact = 1;
        } 
        else {
            for (let i = 1; i <= parseFloat(displayValue); i++) {
                fact *= i;
            }
        }
        dis.value = fact.toString();
    }

    plusminus = ():void => {
        if(!checkForErrorMessage()) {
            return;
        }
        displayValue = (dis.value);
        dis.value = (eval(displayValue)>0) ? (0-eval(displayValue)).toString() : (Math.abs(eval(displayValue))).toString();
    }

    answer = (): void => {
        displayValue = dis.value;
    
        if(!checkForErrorMessage() || displayValue==Invalid) {
            return;
        }
    
        let error = Empty;
        try {
            upper.value = displayValue + '=';
            dis.value = Empty;
    
            let x = upper.value.slice(0, -1);
    
            if(x.includes("^")) {
                x = x.replace('^', '**');
            }
            else if(x.includes("yroot")) {
                let substrArr = x.split('yroot');
                let rightOprand:string = substrArr[1].trim();
                rightOprand = (1/eval(rightOprand)).toString();
    
                x = substrArr[0] + ' ** (' + rightOprand + ')';
            }
           
            output = Number.isFinite(eval(x)) ? eval(x) : ERROR;
        } 
        catch {
            error = ERROR;
        }
    
        dis.value = (error==ERROR) ? ERROR : ((checkedCnt==1) ? Number.parseFloat(output.toString()).toExponential().toString() : output.toString());
    }

}
