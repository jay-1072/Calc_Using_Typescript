"use strict";
class Calculator {
    constructor() {
        this.textChange = () => {
            this.btntxt.innerHTML = (this.btntxt.innerHTML == this.degMode) ? this.radMode : this.degMode;
        };
        this.changeBtn = () => {
            if (this.btnCount % 2 === 1) {
                this._sqr.innerHTML = 'x<sup>2</sup>';
                this._root.innerHTML = '2&#x221A;x';
                this._xtoy.innerHTML = 'x<sup>y</sup>';
                this._tenpow.innerHTML = '10<sup>x</sup>';
                this._log.innerHTML = 'log';
                this._ln.innerHTML = 'ln';
                _2nd_div.backgroundColor = _sqr_div.backgroundColor = _root_div.backgroundColor = _xtoy_div.backgroundColor = _tenpow_div.backgroundColor = _log_div.backgroundColor = _ln_div.backgroundColor = WHITE_COLOR;
                this.btnCount = 0;
            }
            else {
                _2nd_div.backgroundColor = BLUE_COLOR;
                this._sqr.innerHTML = 'x<sup>3</sup>';
                this._root.innerHTML = '3&#x221A;x';
                this._xtoy.innerHTML = 'y&#x221A;x';
                this._tenpow.innerHTML = '2<sup>x</sup>';
                this._log.innerHTML = 'log<sub>y</sub>x';
                this._ln.innerHTML = 'e<sup>x</sup>';
                _sqr_div.backgroundColor = _root_div.backgroundColor = _xtoy_div.backgroundColor = _tenpow_div.backgroundColor = _log_div.backgroundColor = _ln_div.backgroundColor = LIGHTORANGE_COLOR;
                this.btnCount = 1;
            }
        };
        this.checkForErrorMessage = () => {
            this.displayValue = this.dis.value;
            return (this.displayValue == this.ERROR) ? false : true;
        };
        this.fe = () => {
            if (this.checkedCnt == 0) {
                this.btncheck.style.backgroundColor = BLUE_COLOR;
                this.checkedCnt = 1;
                return;
            }
            this.btncheck.style.backgroundColor = WHITE_COLOR;
            this.checkedCnt = 0;
        };
        this.inv_RAD_DEG = (val) => {
            return ((val * 180) * (Math.PI ** -1));
        };
        /*****************************************************************Display on Screen************************/
        this.display = (val) => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            let oldOperator = this.displayValue.slice(-1);
            if (this.op.includes(val) && this.op.includes(oldOperator)) {
                this.dis.value = this.displayValue.slice(0, -1) + val;
            }
            else if (val == Math.PI.toString() || val == Math.E.toString()) {
                if (this.op.slice(0, 5).includes(oldOperator)) {
                    val = (this.checkedCnt == 1) ? Number.parseFloat(val).toExponential().toString() : val;
                    this.dis.value += val;
                    return;
                }
                this.upper.value = this.Empty;
                this.dis.value = val;
            }
            else {
                if (!(this.op.includes(val)) && !(this.otherInput.includes(val))) {
                    val = (this.checkedCnt == 1) ? Number.parseFloat(val).toExponential().toString() : val;
                }
                this.dis.value += val;
            }
        };
        /*****************************************************************clear screen and pop Functions************************/
        this.clearScreen = () => {
            if (this.dis.value == this.Empty) {
                this.upper.value = this.Empty;
            }
            this.dis.value = this.Empty;
        };
        this.pop = () => {
            this.displayValue = this.dis.value;
            if (this.displayValue == this.ERROR || this.displayValue == this.INFINITY || this.displayValue == this.NAN) {
                this.dis.value = this.upper.value = this.Empty;
                return;
            }
            this.dis.value = this.displayValue.slice(0, this.displayValue.length - 1);
        };
        /*****************************************************************Memory Functions************************/
        this.checkState = (state) => {
            if (localStorage.getItem(MEMORY) != null) {
                this._memoryTable.disabled = state;
                this._memoryClear.disabled = state;
                this._memoryRestore.disabled = state;
                document.getElementById('mc_div').style.backgroundColor = 'rgb(255, 255, 255)';
                document.getElementById('m_div').style.backgroundColor = 'rgb(255, 255, 255)';
                document.getElementById('mr_div').style.backgroundColor = 'rgb(255, 255, 255)';
                return;
            }
            this._memoryTable.disabled = state;
            this._memoryClear.disabled = state;
            this._memoryRestore.disabled = state;
            document.getElementById('mc_div').style.backgroundColor = 'rgb(225, 225, 225)';
            document.getElementById('m_div').style.backgroundColor = 'rgb(225, 225, 225)';
            document.getElementById('mr_div').style.backgroundColor = 'rgb(225, 225, 225)';
            // this._memoryClear.disabled = true;
        };
        this.memoryStore = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            if (localStorage.getItem(MEMORY) != null) {
                this.marr = JSON.parse(localStorage.getItem(MEMORY));
            }
            let temp = (this.displayValue == this.Empty) ? 0 : parseFloat(this.displayValue);
            this.marr.push(temp);
            localStorage.setItem(MEMORY, JSON.stringify(this.marr));
            this.checkState(false);
        };
        this.memoryRead = () => {
            if (!this.checkForErrorMessage() || localStorage.getItem(MEMORY) == null) {
                return;
            }
            this.marr = JSON.parse(localStorage.getItem(MEMORY));
            this.dis.value = this.marr[this.marr.length - 1].toString();
        };
        this.memoryClear = () => {
            if (!this.checkForErrorMessage() || localStorage.getItem(MEMORY) == null) {
                return;
            }
            this.marr = [];
            localStorage.removeItem(MEMORY);
            // (this._memoryTable as HTMLInputElement).disabled = true;
            this.checkState(true);
        };
        this.memoryPlus = () => {
            if (!this.checkForErrorMessage() || localStorage.getItem(MEMORY) == null) {
                return;
            }
            this.marr = JSON.parse(localStorage.getItem(MEMORY));
            this.displayValue = this.dis.value;
            this.marr[this.marr.length - 1] += this.displayValue !== '' ? parseFloat(this.displayValue) : 0;
            localStorage.setItem(MEMORY, JSON.stringify(this.marr));
        };
        this.memoryMinus = () => {
            if (!this.checkForErrorMessage() || localStorage.getItem(MEMORY) == null) {
                return;
            }
            this.marr = JSON.parse(localStorage.getItem(MEMORY));
            this.displayValue = this.dis.value;
            this.marr[this.marr.length - 1] -= this.displayValue !== '' ? parseFloat(this.displayValue) : 0;
            localStorage.setItem(MEMORY, JSON.stringify(this.marr));
        };
        this.createMemoryTable = () => {
            if (!this.checkForErrorMessage() || localStorage.getItem(MEMORY) == null) {
                return;
            }
            this.marr = JSON.parse(localStorage.getItem(MEMORY));
            console.log(this.marr);
            let html = "<table>";
            for (var i = this.marr.length - 1; i >= 0; i--) {
                html += "<tr>";
                html += "<td>" + this.marr[i] + "</td>";
                html += "</tr>";
            }
            html += "</table>";
            (document.getElementById('memory')).innerHTML = html;
        };
        /*****************************************************************Simple Trigonometric Function ************************/
        this.sin = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'sin(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? Math.sin(eval(this.displayValue)).toString() : Math.sin((eval(this.displayValue) * Math.PI) / 180).toString();
        };
        this.cos = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'cos(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? Math.cos(eval(this.displayValue)).toString() : Math.cos((eval(this.displayValue) * Math.PI) / 180).toString();
        };
        this.tan = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'tan(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? Math.tan(eval(this.displayValue)).toString() : Math.tan((eval(this.displayValue) * Math.PI) / 180).toString();
        };
        this.sec = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'sec(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? (1 / Math.cos(eval(this.displayValue))).toString() : (1 / Math.cos((eval(this.displayValue) * Math.PI) / 180)).toString();
        };
        this.cosec = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'cosec(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? (1 / Math.sin(eval(this.displayValue))).toString() : (1 / Math.sin((eval(this.displayValue) * Math.PI) / 180)).toString();
        };
        this.cot = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'cot(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? (1 / Math.tan(eval(this.displayValue))).toString() : (1 / Math.tan((eval(this.displayValue) * Math.PI) / 180)).toString();
        };
        /*****************************************************************Inverse Trigonometric Function ************************/
        this.sinInverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'sin-1(' + this.displayValue + ')';
            if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
                this.dis.value = (this.mode == this.radMode) ? Math.asin(eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.asin(eval(this.displayValue))).toString();
                return;
            }
            this.dis.value = this.Message;
        };
        this.cosInverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'cos-1(' + this.displayValue + ')';
            if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
                this.dis.value = (this.mode == this.radMode) ? Math.acos(eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.acos(eval(this.displayValue))).toString();
                return;
            }
            this.dis.value = this.Message;
        };
        this.tanInverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'tan-1(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? Math.atan(eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.atan(eval(this.displayValue))).toString();
        };
        this.secInverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'sec-1(' + this.displayValue + ')';
            if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
                this.dis.value = this.ERROR;
                return;
            }
            this.dis.value = (this.mode == this.radMode) ? Math.acos(1 / eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.acos(1 / eval(this.displayValue))).toString();
        };
        this.cosecInverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'cosec-1(' + this.displayValue + ')';
            if (parseFloat(this.displayValue) >= -1 && parseFloat(this.displayValue) <= 1) {
                this.dis.value = this.ERROR;
                return;
            }
            this.dis.value = (this.mode == this.radMode) ? Math.asin(1 / eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.asin(1 / eval(this.displayValue))).toString();
        };
        this.cotInverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.mode = this.btntxt.innerHTML;
            this.upper.value = 'cot-1(' + this.displayValue + ')';
            this.dis.value = (this.mode == this.radMode) ? Math.atan(1 / eval(this.displayValue)).toString() : this.inv_RAD_DEG(Math.atan(1 / eval(this.displayValue))).toString();
        };
        /*****************************************************************Hyperbolic Trigonometric Function ************************/
        this.sinh = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'sinh(' + this.displayValue + ')';
            this.dis.value = Math.sinh(eval(this.displayValue)).toString();
        };
        this.cosh = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'cosh(' + this.displayValue + ')';
            this.dis.value = Math.cosh(eval(this.displayValue)).toString();
        };
        this.tanh = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'tanh(' + this.displayValue + ')';
            this.dis.value = Math.tanh(eval(this.displayValue)).toString();
        };
        this.sech = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'sech(' + this.displayValue + ')';
            this.dis.value = (1 / Math.cosh(eval(this.displayValue))).toString();
        };
        this.cosech = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'cosech(' + this.displayValue + ')';
            this.dis.value = (this.displayValue == '0') ? this.Alert : (1 / Math.sinh(eval(this.displayValue))).toString();
        };
        this.coth = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'coth(' + this.dis.value + ')';
            this.dis.value = (this.displayValue == '0') ? this.Alert : (1 / Math.tanh(eval(this.displayValue))).toString();
        };
        /*****************************************************************Functions************************/
        this.absolute = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'abs(' + this.displayValue + ')=';
            this.dis.value = Math.abs(eval(this.displayValue)).toString();
        };
        this.ceil = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'ceil(' + this.displayValue + ')';
            this.dis.value = Math.ceil(eval(this.displayValue)).toString();
        };
        this.floor = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = 'floor(' + this.displayValue + ')';
            this.dis.value = Math.floor(eval(this.displayValue)).toString();
        };
        this.rand = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = this.Empty;
            this.dis.value = Math.random().toString();
        };
        this.degreeMinuteSecond = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = "dms(" + this.displayValue + ")";
            let degree = Math.floor(parseFloat(this.displayValue));
            let minutes = ((parseFloat(this.displayValue) - degree) * 60.0);
            let seconds = (minutes - Math.floor(minutes)) * 60.0;
            this.dis.value = degree + "." + Math.floor(minutes) + seconds.toFixed(0);
        };
        /*****************************************************************Logarithm Function ************************/
        this.log = () => {
            if (!this.checkForErrorMessage()) {
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
        };
        this.ln = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            if (_ln.innerHTML == 'ln') {
                this.upper.value = 'ln(' + this.displayValue + ')';
                this.dis.value = Math.log(eval(this.displayValue)).toString();
            }
            else {
                this.upper.value = 'e^(' + this.displayValue + ')';
                this.dis.value = Math.pow(Math.E, eval(this.displayValue)).toString();
            }
        };
        /*****************************************************************10^x and 2^x ************************/
        this.tentox = () => {
            if (!this.checkForErrorMessage()) {
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
        };
        /*****************************************************************10^x and 2^x ************************/
        this.xtoy = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.dis.value += _xtoy.innerHTML == 'x<sup>y</sup>' ? '^' : " yroot ";
        };
        /*****************************************************************Factorial************************/
        this.factorial = () => {
            this.displayValue = this.dis.value;
            if (!this.checkForErrorMessage() || Number.parseInt(this.displayValue) < 0) {
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
        };
        /*****************************************************************plus-minus ************************/
        this.plusminus = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = (this.dis.value);
            this.dis.value = (parseFloat(this.displayValue) > 0) ? (0 - parseFloat(this.displayValue)).toString() : (Math.abs(parseFloat(this.displayValue))).toString();
        };
        /*****************************************************************square Root and cube Root ************************/
        this.sqroot = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            if (_root.innerHTML == '2√x') {
                this.upper.value = '√(' + this.displayValue + ')';
                this.dis.value = Math.sqrt(eval(this.displayValue)).toString();
            }
            else {
                this.upper.value = 'cuberoot(' + this.displayValue + ')';
                this.dis.value = (Math.pow(eval(this.displayValue), 1 / 3)).toString();
            }
        };
        /*****************************************************************square and cube************************/
        this.sqr = () => {
            if (!this.checkForErrorMessage()) {
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
        };
        /*****************************************************************inverse************************/
        this.inverse = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            this.upper.value = '1/(' + this.displayValue + ')=';
            try {
                let inverseCalculation = eval(this.upper.value.slice(0, -1));
                this.dis.value = Number.isFinite(inverseCalculation) ? inverseCalculation : this.ERROR;
            }
            catch (_a) {
                this.dis.value = this.ERROR;
            }
        };
        /*****************************************************************Exponential************************/
        this.expo = () => {
            if (!this.checkForErrorMessage()) {
                return;
            }
            this.displayValue = this.dis.value;
            const fE = this.displayValue != this.Empty ? parseFloat(this.displayValue) : 0;
            this.dis.value = fE.toExponential();
        };
        /*****************************************************************answer************************/
        this.answer = () => {
            this.displayValue = this.dis.value;
            if (!this.checkForErrorMessage() || this.displayValue == this.Invalid) {
                return;
            }
            let error = this.Empty;
            try {
                this.upper.value = this.displayValue + '=';
                this.dis.value = this.Empty;
                let x = this.upper.value.slice(0, -1);
                if (x.includes("^")) {
                    x = x.replace('^', '**');
                }
                else if (x.includes("yroot")) {
                    let substrArr = x.split('yroot');
                    let rightOprand = substrArr[1].trim();
                    rightOprand = (1 / eval(rightOprand)).toString();
                    x = substrArr[0] + ' ** (' + rightOprand + ')';
                }
                this.output = Number.isFinite(eval(x)) ? eval(x) : this.ERROR;
            }
            catch (_a) {
                error = this.ERROR;
            }
            this.dis.value = (error == this.ERROR) ? this.ERROR : ((this.checkedCnt == 1) ? Number.parseFloat(this.output.toString()).toExponential().toString() : this.output.toString());
        };
        this.dis = document.getElementById("result");
        this.upper = document.getElementById("subtext");
        this._memoryClear = document.getElementById('mc');
        this._memoryRestore = document.getElementById('mr');
        this._memoryShow = document.getElementById('mshow');
        this._memoryTable = document.getElementById('m');
        this._sqr = document.getElementById('sqr');
        this._root = document.getElementById('root');
        this._xtoy = document.getElementById('xtoy');
        this._tenpow = document.getElementById('tenpow');
        this._log = document.getElementById('log');
        this._ln = document.getElementById('ln');
        this._2nd = document.getElementById("_2nd");
        this.btntxt = document.getElementById("btntxt");
        this.btncheck = document.getElementById("btn-check");
        this.marr = [];
        this.op = ['+', '-', '*', '/', '%', '.'];
        this.otherInput = ["(", ")", "Backspace"];
        this.ERROR = 'Error!';
        this.INFINITY = 'Infinity';
        this.NAN = 'NaN';
        this.Invalid = 'Invalid input';
        this.Empty = '';
        this.Message = 'Enter value between -1 and 1';
        this.Alert = 'Cannot divide by zero';
        this.displayValue = '0';
        this.mode = 'DEG';
        this.degMode = 'DEG';
        this.radMode = 'RAD';
        this.output = 0;
        this.checkedCnt = 0;
        this.btnCount = 0;
        this.num = 0;
        this.base = 0;
        this.flag = true;
    }
}
const WHITE_COLOR = 'rgb(255, 255, 255)';
const LIGHTORANGE_COLOR = 'rgb(255, 191, 190)';
const BLUE_COLOR = 'rgb(0, 128, 255)';
const MEMORY = 'Memory';
const _2nd_div = document.getElementById('_2nd_div').style;
const _sqr_div = document.getElementById('sqr_div').style;
const _root_div = document.getElementById('root_div').style;
const _xtoy_div = document.getElementById('xtoy_div').style;
const _tenpow_div = document.getElementById('tenpow_div').style;
const _log_div = document.getElementById('log_div').style;
const _ln_div = document.getElementById('ln_div').style;
const dlt = document.getElementById("_delete");
const pop = document.getElementById("_pop");
const _mplus = document.getElementById("mplus");
const _mminus = document.getElementById("mminus");
const _zero = document.getElementById("_zero");
const _one = document.getElementById("_one");
const _two = document.getElementById("_two");
const _three = document.getElementById("_three");
const _four = document.getElementById("_four");
const _five = document.getElementById("_five");
const _six = document.getElementById("_six");
const _seven = document.getElementById("_seven");
const _eight = document.getElementById("_eight");
const _nine = document.getElementById("_nine");
const _PI = document.getElementById("_PI");
const _E = document.getElementById("_E");
const _lbracket = document.getElementById("_lbracket");
const _rbracket = document.getElementById("_rbracket");
const _plus = document.getElementById("_plus");
const _minus = document.getElementById("_minus");
const _multiply = document.getElementById("_multiply");
const _divide = document.getElementById("_divide");
const _mod = document.getElementById("_mod");
const _point = document.getElementById("_point");
const _equalTo = document.getElementById("_equalTo");
const _plus_minus = document.getElementById("_plus_minus");
const _log = document.getElementById("log");
const _ln = document.getElementById("ln");
const _tenpow = document.getElementById("tenpow");
const _xtoy = document.getElementById("xtoy");
const _factorial = document.getElementById("_factorial");
const _root = document.getElementById("root");
const _sqr = document.getElementById("sqr");
const _inverse = document.getElementById("_inverse");
const _abs = document.getElementById("_abs");
const _absF = document.getElementById("_absF");
const _floorF = document.getElementById("_floorF");
const _ceilF = document.getElementById("_ceilF");
const _randF = document.getElementById("_randF");
const _dmsF = document.getElementById("_dmsF");
const _exp = document.getElementById("_exp");
const _sin = document.getElementById("_sin");
const _cos = document.getElementById("_cos");
const _tan = document.getElementById("_tan");
const _sec = document.getElementById("_sec");
const _cosec = document.getElementById("_cosec");
const _cot = document.getElementById("_cot");
const _sinI = document.getElementById("_sinI");
const _cosI = document.getElementById("_cosI");
const _tanI = document.getElementById("_tanI");
const _secI = document.getElementById("_secI");
const _cosecI = document.getElementById("_cosecI");
const _cotI = document.getElementById("_cotI");
const _sinH = document.getElementById("_sinH");
const _cosH = document.getElementById("_cosH");
const _tanH = document.getElementById("_tanH");
const _secH = document.getElementById("_secH");
const _cosecH = document.getElementById("_cosecH");
const _cotH = document.getElementById("_cotH");
const calcObj = new Calculator();
document.addEventListener('click', (e) => {
    if (!calcObj.checkForErrorMessage()) {
        return;
    }
});
calcObj.btntxt.onclick = () => {
    calcObj.textChange();
};
calcObj.btncheck.onclick = () => {
    calcObj.fe();
};
calcObj._2nd.onclick = () => {
    calcObj.changeBtn();
};
_zero.onclick = () => {
    calcObj.display('0');
};
_one.onclick = () => {
    calcObj.display('1');
};
_two.onclick = () => {
    calcObj.display('2');
};
_three.onclick = () => {
    calcObj.display('3');
};
_four.onclick = () => {
    calcObj.display('4');
};
_five.onclick = () => {
    calcObj.display('5');
};
_six.onclick = () => {
    calcObj.display('6');
};
_seven.onclick = () => {
    calcObj.display('7');
};
_eight.onclick = () => {
    calcObj.display('8');
};
_nine.onclick = () => {
    calcObj.display('9');
};
_PI.onclick = () => {
    calcObj.display(Math.PI.toString());
};
_E.onclick = () => {
    calcObj.display(Math.E.toString());
};
_lbracket.onclick = () => {
    calcObj.display('(');
};
_rbracket.onclick = () => {
    calcObj.display(')');
};
_plus.onclick = () => {
    calcObj.display('+');
};
_minus.onclick = () => {
    calcObj.display('-');
};
_multiply.onclick = () => {
    calcObj.display('*');
};
_divide.onclick = () => {
    calcObj.display('/');
};
_mod.onclick = () => {
    calcObj.display('%');
};
_point.onclick = () => {
    calcObj.display('.');
};
_equalTo.onclick = () => {
    calcObj.answer();
};
_plus_minus.onclick = () => {
    calcObj.plusminus();
};
_log.onclick = () => {
    calcObj.log();
};
_ln.onclick = () => {
    calcObj.ln();
};
_tenpow.onclick = () => {
    calcObj.tentox();
};
_xtoy.onclick = () => {
    calcObj.xtoy();
};
_factorial.onclick = () => {
    calcObj.factorial();
};
_root.onclick = () => {
    calcObj.sqroot();
};
_sqr.onclick = () => {
    calcObj.sqr();
};
_inverse.onclick = () => {
    calcObj.inverse();
};
_abs.onclick = () => {
    calcObj.absolute();
};
_absF.onclick = () => {
    calcObj.absolute();
};
_floorF.onclick = () => {
    calcObj.floor();
};
_ceilF.onclick = () => {
    calcObj.ceil();
};
_randF.onclick = () => {
    calcObj.rand();
};
_dmsF.onclick = () => {
    calcObj.degreeMinuteSecond();
};
_exp.onclick = () => {
    calcObj.expo();
};
calcObj._memoryClear.onclick = () => {
    calcObj.memoryClear();
};
calcObj._memoryRestore.onclick = () => {
    calcObj.memoryRead();
};
calcObj._memoryShow.onclick = () => {
    calcObj.memoryStore();
};
_mplus.onclick = () => {
    calcObj.memoryPlus();
};
_mminus.onclick = () => {
    calcObj.memoryMinus();
};
calcObj._memoryTable.onclick = () => {
    calcObj.createMemoryTable();
};
calcObj.checkState(true);
dlt.onclick = () => {
    calcObj.clearScreen();
};
pop.onclick = () => {
    calcObj.pop();
};
_sin.onclick = () => {
    calcObj.sin();
};
_cos.onclick = () => {
    calcObj.cos();
};
_tan.onclick = () => {
    calcObj.tan();
};
_sec.onclick = () => {
    calcObj.sec();
};
_cosec.onclick = () => {
    calcObj.cosec();
};
_cot.onclick = () => {
    calcObj.cot();
};
_sinI.onclick = () => {
    calcObj.sinInverse();
};
_cosI.onclick = () => {
    calcObj.cosInverse();
};
_tanI.onclick = () => {
    calcObj.tanInverse();
};
_secI.onclick = () => {
    calcObj.secInverse();
};
_cosecI.onclick = () => {
    calcObj.cosecInverse();
};
_cotI.onclick = () => {
    calcObj.cotInverse();
};
_sinH.onclick = () => {
    calcObj.sinh();
};
_cosH.onclick = () => {
    calcObj.cosh();
};
_tanH.onclick = () => {
    calcObj.tanh();
};
_secH.onclick = () => {
    calcObj.sech();
};
_cosecH.onclick = () => {
    calcObj.cosech();
};
_cotH.onclick = () => {
    calcObj.coth();
};
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
        case ")":
            calcObj.display(x);
            break;
        case "Backspace":
            calcObj.pop();
            break;
        case "e":
            calcObj.display(Math.E.toString());
            break;
        case "p":
            calcObj.display(Math.PI.toString());
            break;
        case "s":
            calcObj.sin();
            break;
        case "c":
            calcObj.cos();
            break;
        case "t":
            calcObj.tan();
            break;
        case "S":
            calcObj.sinInverse();
            break;
        case "C":
            calcObj.cosInverse();
            break;
        case "T":
            calcObj.tanInverse();
            break;
        case "!":
            calcObj.factorial();
            break;
        case "L":
            calcObj.log();
            break;
        case "l":
            calcObj.ln();
            break;
        case "Enter":
            calcObj.answer();
            break;
        case "Delete":
            calcObj.clearScreen();
            break;
        default: /* Do nothing */
            break;
    }
};
// document.getElementById("second")!.addEventListener("click", function (e) {
//     e.stopPropagation();
// });
// document.getElementById("second1")!.addEventListener("click", function (e) {
//     e.stopPropagation();
// });
