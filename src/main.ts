class Calculator {
    dis:HTMLInputElement;
    upper:HTMLInputElement;
    _memoryClear:HTMLButtonElement;
    _memoryRestore:HTMLButtonElement;
    _memoryShow:HTMLButtonElement;
    _memoryTable:HTMLDivElement;
    _sqr:HTMLAnchorElement;
    _root:HTMLAnchorElement;
    _xtoy:HTMLAnchorElement;
    _tenpow:HTMLAnchorElement;
    _log:HTMLAnchorElement;
    _ln:HTMLAnchorElement;
    _2nd:HTMLAnchorElement;
    btntxt:HTMLAnchorElement;
    btncheck:HTMLDivElement;
    marr:number[];
    op:string[];
    otherInput:string[];
    readonly ERROR:string;
    readonly INFINITY:string;
    readonly NAN:string;
    readonly Invalid:string;
    readonly Empty:string;
    readonly Message:string;
    readonly Alert:string;
    displayValue:string;
    mode:string;
    degMode:string;
    radMode:string;
    output:number;
    checkedCnt:number;
    btnCount:number;
    num:number;
    base:number;
    flag:boolean;
    
    constructor() {
         this.dis = <HTMLInputElement>document.getElementById("result");
         this.upper = <HTMLInputElement>document.getElementById("subtext");
         this._memoryClear = <HTMLButtonElement>document.getElementById('mc');
         this._memoryRestore = <HTMLButtonElement>document.getElementById('mr');
         this._memoryShow = <HTMLButtonElement>document.getElementById('mshow');
         this._memoryTable = <HTMLDivElement>document.getElementById('m');
         this._sqr = <HTMLAnchorElement>document.getElementById('sqr');
         this._root = <HTMLAnchorElement>document.getElementById('root');
         this._xtoy = <HTMLAnchorElement>document.getElementById('xtoy');
         this._tenpow = <HTMLAnchorElement>document.getElementById('tenpow');
         this._log = <HTMLAnchorElement>document.getElementById('log');
         this._ln = <HTMLAnchorElement>document.getElementById('ln');
         this._2nd = <HTMLAnchorElement>document.getElementById("_2nd");
         this.btntxt = <HTMLAnchorElement>document.getElementById("btntxt");
         this.btncheck = <HTMLDivElement>document.getElementById("btn-check");
         this.marr = [];
         this.op = ['+', '-', '*', '/', '%', '.'];
         this.otherInput = ["(", ")", "Backspace"];
         this.ERROR = 'Error!';
         this.INFINITY = 'Infinity';
         this.NAN = 'NaN';
         this.Invalid = 'Invalid input'
         this.Empty = '';
         this.Message = 'Enter value between -1 and 1';
         this.Alert = 'Cannot divide by zero';
         this.displayValue = '0';
         this.mode = 'DEG';
         this.degMode = 'DEG';
         this.radMode = 'RAD';
         this.output = 0;
         this.checkedCnt = 0;
         this.btnCount  = 0;
         this.num = 0;
         this.base = 0;
         this.flag = true;
    }

    textChange = ():void => {
        this.btntxt.innerHTML =  (this.btntxt.innerHTML==this.degMode) ? this.radMode : this.degMode;
    }

    changeBtn = ():void => {
        if (this.btnCount % 2 === 1) {
            this._sqr.innerHTML = 'x<sup>2</sup>';
            this._root.innerHTML = '2&#x221A;x';
            this._xtoy.innerHTML = 'x<sup>y</sup>';
            this._tenpow.innerHTML = '10<sup>x</sup>';
            this._log.innerHTML = 'log';
            this._ln.innerHTML = 'ln';
            _2nd_div.backgroundColor = _sqr_div.backgroundColor = _root_div.backgroundColor = _xtoy_div.backgroundColor = _tenpow_div.backgroundColor = _log_div.backgroundColor = _ln_div.backgroundColor = WHITE_COLOR;
            this.btnCount = 0;
        } else {
            _2nd_div.backgroundColor = BLUE_COLOR;
            this._sqr.innerHTML = 'x<sup>3</sup>';
            this._root.innerHTML = '3&#x221A;x';
            this._xtoy.innerHTML = 'y&#x221A;x';
            this._tenpow.innerHTML = '2<sup>x</sup>';
            this._log.innerHTML = 'log<sub>y</sub>x';
            this._ln.innerHTML = 'e<sup>x</sup>';
            _sqr_div.backgroundColor = _root_div.backgroundColor = _xtoy_div.backgroundColor = _tenpow_div.backgroundColor =  _log_div.backgroundColor = _ln_div.backgroundColor = LIGHTORANGE_COLOR;
            this.btnCount = 1;
        }
    }

    checkForErrorMessage = ():boolean => {
        this.displayValue = this.dis.value;
        return (this.displayValue==this.ERROR) ? false : true;
    }

    fe = ():void => {
        if(this.checkedCnt==0) {
            this.btncheck.style.backgroundColor = BLUE_COLOR;
            this.checkedCnt=1;
            return;
        }
        this.btncheck.style.backgroundColor = WHITE_COLOR;
        this.checkedCnt=0;
    }

    inv_RAD_DEG = (val:number):number => {
        return ((val * 180) * (Math.PI ** -1));
    }

    /*****************************************************************Display on Screen************************/ 

    display = (val:string):void => {

        if(!this.checkForErrorMessage()) {
            return;
        }
    
        this.displayValue = this.dis.value;
        let oldOperator = this.displayValue.slice(-1);
    
        if (this.op.includes(val) && this.op.includes(oldOperator)) {
            this.dis.value = this.displayValue.slice(0, -1) + val;
        } 
        else if(val==Math.PI.toString() || val==Math.E.toString()) {
            if(this.op.slice(0, 5).includes(oldOperator)) {
                val = (this.checkedCnt==1)?Number.parseFloat(val).toExponential().toString():val;
                this.dis.value += val;
                return;
            }
            this.upper.value = this.Empty;
            this.dis.value = val;
        }
        else {
            if(!(this.op.includes(val)) && !(this.otherInput.includes(val))) {
                val = (this.checkedCnt==1)?Number.parseFloat(val).toExponential().toString():val;
            }
            
            this.dis.value += val;
        }
    }

    /*****************************************************************clear screen and pop Functions************************/ 

    clearScreen = ():void => {
        if (this.dis.value == this.Empty) {
            this.upper.value = this.Empty;
        }
        this.dis.value = this.Empty;
    }

    pop = ():void => {
        this.displayValue = this.dis.value;
        if (this.displayValue == this.ERROR || this.displayValue == this.INFINITY || this.displayValue == this.NAN) {
            this.dis.value = this.upper.value =  this.Empty;
            return;
        }
        this.dis.value = this.displayValue.slice(0, this.displayValue.length - 1);
    }

    /*****************************************************************Memory Functions************************/  
    
    checkState = (state:boolean):void => {
        if(localStorage.getItem('Memory')!=null) {
            (this._memoryTable as HTMLInputElement).disabled = state;
            (this._memoryClear as HTMLInputElement).disabled = state;
            (this._memoryRestore as HTMLInputElement).disabled = state;
            (<HTMLDivElement>document.getElementById('mc_div')).style.backgroundColor = 'rgb(255, 255, 255)';
            (<HTMLDivElement>document.getElementById('m_div')).style.backgroundColor = 'rgb(255, 255, 255)';
            (<HTMLDivElement>document.getElementById('mr_div')).style.backgroundColor = 'rgb(255, 255, 255)';
            return;
        }
        
        (this._memoryTable as HTMLInputElement).disabled = state;
        (this._memoryClear as HTMLInputElement).disabled = state;
        (this._memoryRestore as HTMLInputElement).disabled = state;
        (<HTMLDivElement>document.getElementById('mc_div')).style.backgroundColor = 'rgb(225, 225, 225)';
        (<HTMLDivElement>document.getElementById('m_div')).style.backgroundColor = 'rgb(225, 225, 225)';
        (<HTMLDivElement>document.getElementById('mr_div')).style.backgroundColor = 'rgb(225, 225, 225)';
        // this._memoryClear.disabled = true;
    }

    memoryStore = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }

        // (this._memoryTable as HTMLInputElement).disabled = false;
    
        this.displayValue = this.dis.value;

        if(localStorage.getItem('Memory')!=null) {
            this.marr = JSON.parse(localStorage.getItem('Memory')!);
        }
    
        if (this.displayValue == this.Empty) {
            this.marr.push(0);
        }
        else {
            this.marr.push(parseFloat(this.dis.value));
        }

        localStorage.setItem('Memory', JSON.stringify(this.marr));

        this.checkState(false);        
    }

    memoryRead = ():void => {
        if(!this.checkForErrorMessage() || localStorage.getItem('Memory')==null) {
            return;
        }
        this.marr = JSON.parse(localStorage.getItem('Memory')!);
        this.dis.value = this.marr[this.marr.length - 1].toString();
    }

    memoryClear = ():void => {
        if(!this.checkForErrorMessage() || localStorage.getItem('Memory')==null) {
            return;
        }
        this.marr=[];
        localStorage.removeItem('Memory');
        // (this._memoryTable as HTMLInputElement).disabled = true;
        this.checkState(true);
    }

    memoryPlus = ():void => {
        if(!this.checkForErrorMessage() || localStorage.getItem('Memory')==null) {
            return;
        }
        this.marr = JSON.parse(localStorage.getItem('Memory')!);
        this.displayValue = this.dis.value;
        this.marr[this.marr.length - 1] += this.displayValue!=='' ? parseFloat(this.displayValue) : 0;
        localStorage.setItem('Memory', JSON.stringify(this.marr));
    }

    memoryMinus = ():void => {
        if(!this.checkForErrorMessage() || localStorage.getItem('Memory')==null) {
            return;
        }
        this.marr = JSON.parse(localStorage.getItem('Memory')!);
        this.displayValue = this.dis.value;
        this.marr[this.marr.length - 1] -= this.displayValue!=='' ? parseFloat(this.displayValue) : 0;
        localStorage.setItem('Memory', JSON.stringify(this.marr));
    }

    createMemoryTable = ():void => { 
        if(!this.checkForErrorMessage() || localStorage.getItem('Memory')==null) {
            return;
        }
        
        this.marr = JSON.parse(localStorage.getItem('Memory')!);
        console.log(this.marr);
        let html = "<table>";
        for (var i = this.marr.length - 1; i >= 0; i--) {
            html += "<tr>";
            html += "<td>" + this.marr[i] + "</td>";
            html += "</tr>";
        }
        html += "</table>";
        (document.getElementById('memory')!).innerHTML = html;
    }

    /*****************************************************************Simple Trigonometric Function ************************/
    sin = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'sin(' +  this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? Math.sin(eval(this.displayValue)).toString(): Math.sin((eval(this.displayValue) * Math.PI) / 180).toString();
    }

    cos = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'cos(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? Math.cos(eval(this.displayValue)).toString() : Math.cos((eval(this.displayValue) * Math.PI) / 180).toString();
    }

    tan = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'tan(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? Math.tan(eval(this.displayValue)).toString() : Math.tan((eval(this.displayValue) * Math.PI) / 180).toString();
    }
    
    sec = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode =  this.btntxt.innerHTML;
        this.upper.value = 'sec(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? (1 / Math.cos(eval(this.displayValue))).toString() : (1 / Math.cos((eval(this.displayValue) * Math.PI) / 180)).toString();
    }
    
    cosec = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'cosec(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? (1 / Math.sin(eval(this.displayValue))).toString() : (1 / Math.sin((eval(this.displayValue) * Math.PI) / 180)).toString();
    }
    
    cot = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'cot(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? (1 / Math.tan(eval(this.displayValue))).toString() : (1 / Math.tan((eval(this.displayValue) * Math.PI) / 180)).toString();
    }

    /*****************************************************************Inverse Trigonometric Function ************************/
    sinInverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'sin-1(' + this.displayValue + ')';
    
        if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
            this.dis.value = (this.mode == 'RAD') ? Math.asin(eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.asin(eval(this.displayValue))).toString();
            return;
        }
        this.dis.value = this.Message;
    }

    cosInverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'cos-1(' + this.displayValue + ')';
    
        if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
            this.dis.value = (this.mode == 'RAD') ? Math.acos(eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.acos(eval(this.displayValue))).toString();
            return;
        }
        this.dis.value = this.Message;
    }

    tanInverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'tan-1(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? Math.atan(eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.atan(eval(this.displayValue))).toString();
    }

    secInverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'sec-1(' + this.displayValue + ')';
    
        if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
            this.dis.value = this.ERROR;
            return
        }
        this.dis.value = (this.mode == 'RAD') ? Math.acos(1 / eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.acos(1 / eval(this.displayValue))).toString();
    }

    cosecInverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'cosec-1(' + this.displayValue + ')';
    
        if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
            this.dis.value = this.ERROR;
            return;
        }
        this.dis.value = (this.mode == 'RAD') ? Math.asin(1 / eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.asin(1 / eval(this.displayValue))).toString();
    }

    cotInverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.mode = this.btntxt.innerHTML;
        this.upper.value = 'cot-1(' + this.displayValue + ')';
        this.dis.value = (this.mode == 'RAD') ? Math.atan(1 / eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.atan(1 / eval(this.displayValue))).toString();
    }

    /*****************************************************************Hyperbolic Trigonometric Function ************************/
    sinh = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'sinh(' + this.displayValue + ')';
        this.dis.value = Math.sinh(eval(this.displayValue)).toString();
    }

    cosh = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'cosh(' + this.displayValue + ')';
        this.dis.value = Math.cosh(eval(this.displayValue)).toString();
    }

    tanh = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'tanh(' + this.displayValue + ')';
        this.dis.value = Math.tanh(eval(this.displayValue)).toString();
    }

    sech = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'sech(' + this.displayValue + ')';
        this.dis.value = (1 / Math.cosh(eval(this.displayValue))).toString();
    }

    cosech = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'cosech(' + this.displayValue + ')';
    
        this.dis.value = (this.displayValue=='0') ? this.Alert : (1 / Math.sinh(eval(this.displayValue))).toString();
    }
    
    coth = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'coth(' + this.dis.value + ')';
        this.dis.value = (this.displayValue=='0') ?this. Alert : (1 / Math.tanh(eval(this.displayValue))).toString();
    }

    /*****************************************************************Functions************************/

    absolute = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'abs(' + this.displayValue + ')=';
        this.dis.value = Math.abs(eval(this.displayValue)).toString();
    }

    ceil = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'ceil(' + this.displayValue + ')';
        this.dis.value = Math.ceil(eval(this.displayValue)).toString();
    }

    floor = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = 'floor(' + this.displayValue + ')';
        this.dis.value = Math.floor(eval(this.displayValue)).toString();
    }

    rand = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = this.Empty;
        this.dis.value = Math.random().toString();
    }
    degreeMinuteSecond = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = "dms(" + this.displayValue + ")";
        let degree = Math.floor(parseFloat(this.displayValue));
        let minutes = ((parseFloat(this.displayValue) - degree) * 60.0);
        let seconds = (minutes - Math.floor(minutes)) * 60.0;
        this.dis.value = degree + "." + Math.floor(minutes) + seconds.toFixed(0);
    }

    /*****************************************************************Logarithm Function ************************/

    log = (): void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
    
        this.displayValue = this.dis.value;
    
        if (_log.innerHTML == 'log') {
            this.upper.value = 'log(' + this.displayValue + ')';
            this.dis.value = Math.log10(eval(this.displayValue)).toString();
        }
        else {
            if (this.flag) {
                this.num = eval(this.displayValue);
                this.upper.value = this.num + ' log base ';
                this.dis.value = this.Empty;
            }
            else if (!this.flag) {
                this.base = eval(this.displayValue);
                this.upper.value += this.displayValue;
                this.dis.value = (Math.log(this.num) / Math.log(this.base)).toString();
            }
            this.flag = !this.flag;
        }
    }

    ln = (): void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
    
        this.displayValue = this.dis.value;
    
        if (_ln.innerHTML == 'ln') {
            this.upper.value = 'ln(' + this.displayValue + ')';
            this.dis.value = Math.log(eval(this.displayValue)).toString();
        } else {
            this.upper.value = 'e^(' + this.displayValue + ')';
            this.dis.value = Math.pow(Math.E, eval(this.displayValue)).toString();
        }
    }

     /*****************************************************************10^x and 2^x ************************/

    tentox = (): void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
    
        if (_tenpow.innerHTML == '10<sup>x</sup>') {
            this.upper.value = '10^(' + this.dis.value + ')';
            this.dis.value = Math.pow(10, eval(this.dis.value)).toString();
        } 
        else {
            this.upper.value = '2^(' + this.dis.value + ')';
            this.dis.value = Math.pow(2, eval(this.dis.value)).toString();
        }
    }

    /*****************************************************************10^x and 2^x ************************/

    xtoy = (): void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.dis.value += _xtoy.innerHTML == 'x<sup>y</sup>' ? '^' : " yroot ";
    }

    /*****************************************************************Factorial************************/

    factorial = ():void => {
        this.displayValue = this.dis.value;
        if(!this.checkForErrorMessage() || Number.parseInt(this.displayValue)<0) {
            this.dis.value = this.ERROR;
            return;
        }
        
        this.upper.value = 'fact(' + this.displayValue + ')';
        let fact = 1;
        if (parseFloat(this.displayValue) == 0 || parseFloat(this.displayValue) == 1) {
            fact = 1;
        } 
        else {
            for (let i = 1; i <= parseFloat(this.displayValue); i++) {
                fact *= i;
            }
        }
        this.dis.value = fact.toString();
    }

     /*****************************************************************plus-minus ************************/
     plusminus = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = (this.dis.value);
        this.dis.value = (parseFloat(this.displayValue)>0) ? (0-parseFloat(this.displayValue)).toString() : (Math.abs(parseFloat(this.displayValue))).toString();
    }
    /*****************************************************************square Root and cube Root ************************/
    sqroot = (): void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        if (_root.innerHTML == '2√x') {
            this.upper.value = '√(' + this.displayValue + ')';
            this.dis.value = Math.sqrt(eval(this.displayValue)).toString();
        } else {
            this.upper.value = 'cuberoot(' + this.displayValue + ')';
            this.dis.value = (Math.pow(eval(this.displayValue), 1 / 3)).toString();
        }
    }

    /*****************************************************************square and cube************************/
    sqr = (): void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
    
        if (_sqr.innerHTML == 'x<sup>3</sup>') {
            this.upper.value = 'cube(' + this.displayValue + ')';
            this.dis.value = Math.pow(eval(this.displayValue), 3).toString();
            return;
        } 
        this.upper.value = 'sqr(' + this.displayValue + ')';
        this.dis.value = Math.pow(eval(this.displayValue), 2).toString();
    }

    /*****************************************************************inverse************************/

    inverse = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
        this.displayValue = this.dis.value;
        this.upper.value = '1/(' + this.displayValue + ')=';
        try{
            let inverseCalculation = eval(this.upper.value.slice(0, -1));
            this.dis.value = Number.isFinite(inverseCalculation) ? inverseCalculation : this.ERROR;
        }
        catch {
            this.dis.value = this.ERROR;
        }
    }

    /*****************************************************************Exponential************************/

    expo = ():void => {
        if(!this.checkForErrorMessage()) {
            return;
        }
    
        this.displayValue = this.dis.value; 
        const fE = this.displayValue!=this.Empty ? parseFloat(this.displayValue) : 0;
        this.dis.value = fE.toExponential();
    }

    /*****************************************************************answer************************/

    answer = (): void => {
        this.displayValue = this.dis.value;
    
        if(!this.checkForErrorMessage() || this.displayValue==this.Invalid) {
            return;
        }
    
        let error = this.Empty;
        try {
            this.upper.value = this.displayValue + '=';
            this.dis.value = this.Empty;
    
            let x = this.upper.value.slice(0, -1);
    
            if(x.includes("^")) {
                x = x.replace('^', '**');
            }
            else if(x.includes("yroot")) {
                let substrArr = x.split('yroot');
                let rightOprand:string = substrArr[1].trim();
                rightOprand = (1/eval(rightOprand)).toString();
    
                x = substrArr[0] + ' ** (' + rightOprand + ')';
            }
           
            this.output = Number.isFinite(eval(x)) ? eval(x) : this.ERROR;
        } 
        catch {
            error = this.ERROR;
        }
    
        this.dis.value = (error==this.ERROR) ? this.ERROR : ((this.checkedCnt==1) ? Number.parseFloat(this.output.toString()).toExponential().toString() : this.output.toString());
    }
}

const WHITE_COLOR = 'rgb(255, 255, 255)';
const LIGHTORANGE_COLOR = 'rgb(255, 191, 190)';
const BLUE_COLOR = 'rgb(0, 128, 255)';

const _2nd_div = document.getElementById('_2nd_div')!.style;
const _sqr_div = document.getElementById('sqr_div')!.style;
const _root_div = document.getElementById('root_div')!.style;
const _xtoy_div = document.getElementById('xtoy_div')!.style;
const _tenpow_div = document.getElementById('tenpow_div')!.style;
const _log_div = document.getElementById('log_div')!.style;
const _ln_div = document.getElementById('ln_div')!.style;



const dlt = <HTMLAnchorElement>document.getElementById("_delete");
const pop = <HTMLAnchorElement>document.getElementById("_pop");

const _mplus = <HTMLAnchorElement>document.getElementById("mplus");
const _mminus = <HTMLAnchorElement>document.getElementById("mminus");

const _zero = <HTMLAnchorElement>document.getElementById("_zero");
const _one = <HTMLAnchorElement>document.getElementById("_one");
const _two = <HTMLAnchorElement>document.getElementById("_two");
const _three = <HTMLAnchorElement>document.getElementById("_three");
const _four = <HTMLAnchorElement>document.getElementById("_four");
const _five = <HTMLAnchorElement>document.getElementById("_five");
const _six = <HTMLAnchorElement>document.getElementById("_six");
const _seven = <HTMLAnchorElement>document.getElementById("_seven");
const _eight = <HTMLAnchorElement>document.getElementById("_eight");
const _nine = <HTMLAnchorElement>document.getElementById("_nine");
const _PI = <HTMLAnchorElement>document.getElementById("_PI");
const _E = <HTMLAnchorElement>document.getElementById("_E");
const _lbracket = <HTMLAnchorElement>document.getElementById("_lbracket");
const _rbracket = <HTMLAnchorElement>document.getElementById("_rbracket");


const _plus = <HTMLAnchorElement>document.getElementById("_plus");
const _minus = <HTMLAnchorElement>document.getElementById("_minus");
const _multiply = <HTMLAnchorElement>document.getElementById("_multiply");
const _divide = <HTMLAnchorElement>document.getElementById("_divide");
const _mod = <HTMLAnchorElement>document.getElementById("_mod");
const _point = <HTMLAnchorElement>document.getElementById("_point");
const _equalTo = <HTMLAnchorElement>document.getElementById("_equalTo");
const _plus_minus = <HTMLAnchorElement>document.getElementById("_plus_minus");


const _log = <HTMLAnchorElement>document.getElementById("log");
const _ln = <HTMLAnchorElement>document.getElementById("ln");
const _tenpow = <HTMLAnchorElement>document.getElementById("tenpow");
const _xtoy = <HTMLAnchorElement>document.getElementById("xtoy");
const _factorial = <HTMLAnchorElement>document.getElementById("_factorial");
const _root = <HTMLAnchorElement>document.getElementById("root");
const _sqr = <HTMLAnchorElement>document.getElementById("sqr");
const _inverse = <HTMLAnchorElement>document.getElementById("_inverse");
const _abs = <HTMLAnchorElement>document.getElementById("_abs");
const _absF = <HTMLAnchorElement>document.getElementById("_absF");
const _floorF = <HTMLAnchorElement>document.getElementById("_floorF");
const _ceilF = <HTMLAnchorElement>document.getElementById("_ceilF");
const _randF = <HTMLAnchorElement>document.getElementById("_randF");
const _dmsF = <HTMLAnchorElement>document.getElementById("_dmsF");
const _exp = <HTMLAnchorElement>document.getElementById("_exp");

const _sin = <HTMLAnchorElement>document.getElementById("_sin");
const _cos = <HTMLAnchorElement>document.getElementById("_cos");
const _tan = <HTMLAnchorElement>document.getElementById("_tan");
const _sec = <HTMLAnchorElement>document.getElementById("_sec");
const _cosec = <HTMLAnchorElement>document.getElementById("_cosec");
const _cot = <HTMLAnchorElement>document.getElementById("_cot");
const _sinI = <HTMLAnchorElement>document.getElementById("_sinI");
const _cosI = <HTMLAnchorElement>document.getElementById("_cosI");
const _tanI = <HTMLAnchorElement>document.getElementById("_tanI");
const _secI = <HTMLAnchorElement>document.getElementById("_secI");
const _cosecI = <HTMLAnchorElement>document.getElementById("_cosecI");
const _cotI = <HTMLAnchorElement>document.getElementById("_cotI");
const _sinH = <HTMLAnchorElement>document.getElementById("_sinH");
const _cosH = <HTMLAnchorElement>document.getElementById("_cosH");
const _tanH = <HTMLAnchorElement>document.getElementById("_tanH");
const _secH = <HTMLAnchorElement>document.getElementById("_secH");
const _cosecH = <HTMLAnchorElement>document.getElementById("_cosecH");
const _cotH = <HTMLAnchorElement>document.getElementById("_cotH");

const calcObj = new Calculator();

calcObj.btntxt.onclick = ():void => {
    calcObj.textChange();
}  

calcObj.btncheck.onclick = ():void => {
    calcObj.fe();
}

calcObj._2nd.onclick = ():void => {
    calcObj.changeBtn();
}

_zero.onclick = () => {
    calcObj.display('0');
}
_one.onclick = () => {
    calcObj.display('1');
}
_two.onclick = () => {
    calcObj.display('2');
}
_three.onclick = () => {
    calcObj.display('3');
}
_four.onclick = () => {
    calcObj.display('4');
}
_five.onclick = () => {
    calcObj.display('5');
}
_six.onclick = () => {
    calcObj.display('6');
}
_seven.onclick = () => {
    calcObj.display('7');
}
_eight.onclick = () => {
    calcObj.display('8');
}
_nine.onclick = () => {
    calcObj.display('9');
}
_PI.onclick = () => {
    calcObj.display(Math.PI.toString());
}
_E.onclick = () => {
    calcObj.display(Math.E.toString());
}
_lbracket.onclick = () => {
    calcObj.display('(');
}
_rbracket.onclick = () => {
    calcObj.display(')');
}

_plus.onclick = () => {
    calcObj.display('+');
}
_minus.onclick = () => {
    calcObj.display('-');
}
_multiply.onclick = () => {
    calcObj.display('*');
}
_divide.onclick = () => {
    calcObj.display('/');
}
_mod.onclick = () => {
    calcObj.display('%');
}
_point.onclick = () => {
    calcObj.display('.');
}
_equalTo.onclick = () => {
    calcObj.answer();
}
_plus_minus.onclick = () => {
    calcObj.plusminus();
}


_log.onclick = () => {
    calcObj.log();
}
_ln.onclick = () => {
    calcObj.ln();
}
_tenpow.onclick = () => {
    calcObj.tentox();
}
_xtoy.onclick = () => {
    calcObj.xtoy();
}
_factorial.onclick = () => {
    calcObj.factorial();
}
_root.onclick = () => {
    calcObj.sqroot();
}
_sqr.onclick = () => {
    calcObj.sqr();
}
_inverse.onclick = () => {
    calcObj.inverse();
}
_abs.onclick = () => {
    calcObj.absolute();
}
_absF.onclick = () => {
    calcObj.absolute();
}
_floorF.onclick = () => {
    calcObj.floor();
}
_ceilF.onclick = () => {
    calcObj.ceil();
}
_randF.onclick = () => {
    calcObj.rand();
}
_dmsF.onclick = () => {
    calcObj.degreeMinuteSecond();
}
_exp.onclick = () => {
    calcObj.expo();
}


calcObj._memoryClear.onclick = ():void => {
    calcObj.memoryClear();
}
calcObj._memoryRestore.onclick = ():void => {
    calcObj.memoryRead();
}
calcObj._memoryShow.onclick = ():void => {
    calcObj.memoryStore();
}
_mplus.onclick = ():void => {
    calcObj.memoryPlus();
}
_mminus.onclick = ():void => {
    calcObj.memoryMinus();
}
calcObj._memoryTable.onclick = ():void => {
    calcObj.createMemoryTable();
}
calcObj.checkState(true);

dlt.onclick = ():void => {
    calcObj.clearScreen();
}

pop.onclick = ():void => {
    calcObj.pop();
}

_sin.onclick = ():void => {
    calcObj.sin();
}

_cos.onclick = ():void => {
    calcObj.cos();
}

_tan.onclick = ():void => {
    calcObj.tan();
}

_sec.onclick = ():void => {
    calcObj.sec();
}

_cosec.onclick = ():void => {
    calcObj.cosec();    
}

_cot.onclick = ():void => {
    calcObj.cot();
}


_sinI.onclick = ():void => {
    calcObj.sinInverse();
}

_cosI.onclick = ():void => {
    calcObj.cosInverse();
}

_tanI.onclick = ():void => {
    calcObj.tanInverse();
}

_secI.onclick = ():void => {
    calcObj.secInverse();
}

_cosecI.onclick = ():void => {
    calcObj.cosecInverse();    
}

_cotI.onclick = ():void => {
    calcObj.cotInverse();
}

_sinH.onclick = ():void => {
    calcObj.sinh();
}

_cosH.onclick = ():void => {
    calcObj.cosh();
}

_tanH.onclick = ():void => {
    calcObj.tanh();
}

_secH.onclick = ():void => {
    calcObj.sech();
}

_cosecH.onclick = ():void => {
    calcObj.cosech();    
}

_cotH.onclick = ():void => {
    calcObj.coth();
}

window.onkeydown = (e) => { 
    const x = e.key; 
    switch (x) { 
        case "0":
        case "1":  
        case "2":         
        case "3":  
        case "4": 
        case "5": 
        case "6":  
        case "7":  
        case "8":  
        case "9": 
        case "+":  
        case "-":  
        case "*":  
        case "/":  
        case "%":  
        case ".":  
        case "(":  
        case ")": calcObj.display(x);
        break;
        case "Backspace": calcObj.pop(); 
        break; 
        case "e": calcObj.display(Math.E.toString()); 
        break; 
        case "p": calcObj.display(Math.PI.toString()); 
        break; 
        case "s": calcObj.sin(); 
        break; 
        case "c": calcObj.cos(); 
        break; 
        case "t": calcObj.tan(); 
        break; 
        case "S": calcObj.sinInverse(); 
        break; 
        case "C": calcObj.cosInverse(); 
        break; 
        case "T": calcObj.tanInverse();
        break; 
        case "!": calcObj.factorial(); 
        break; 
        case "L": calcObj.log(); 
        break; 
        case "l": calcObj.ln();
        break;
        case "Enter": calcObj.answer(); 
        break; 
        case "Delete": calcObj.clearScreen(); 
        break; 
        default : /* Do nothing */ 
        break; 
    } 
}

// document.getElementById("second")!.addEventListener("click", function (e) {
//     e.stopPropagation();
// });
// document.getElementById("second1")!.addEventListener("click", function (e) {
//     e.stopPropagation();
// });
