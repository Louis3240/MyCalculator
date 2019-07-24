// 透過陣列的儲存知道使用者每次輸入了什麼，不然要做很多判斷(numberCluster);
// 因為*和/的優先順序勝過+和-，所以應該記錄每次的輸入值(tempString)。
// 最後就是為了目前運算子的紀錄，也是為了抄襲WINDOWS的計算機。像是目前是運算子呈現在螢幕上，但我臨時反悔想按成別的運算子呢?
var numberCluster = [];
var tempString = "";
var tempOperator = "";

function operate(str) {
    // 先判斷是不是按了數字鍵以及目前是不是上一輪的結果
    if (/[0-9]/.test(str) && tempOperator != "result" && tempString != "0") {
        // 假如目前同時有按到數字且有運算子，就PUSH運算子上去
        if (tempOperator != "") {
            numberCluster.push(tempOperator);
            tempOperator = "";
        }
        // 為了讓使用者一直按數字就自動加上去(直觀)

        tempString += str;
        document.getElementById('outcome').innerHTML = tempString;
    }

    if (/[0-9]/.test(str) && tempOperator == "result") {

        tempOperator = "";
        // 為了讓使用者一直按數字就自動加上去(直觀)
        tempString = str;
        document.getElementById('outcome').innerHTML = tempString;
    }


    // 按運算子後的判斷
    else if (str == '+' || str == '-' || str == '×' || str == '÷') {
        // 目前螢幕上如果有數字就PUSH，並且清除螢幕並顯示運算子在螢幕上
        if (tempString != "") {
            numberCluster.push(tempString);
            tempString = "";
            tempOperator = str;
            document.getElementById('outcome').innerHTML = str;
        }
        // 如果螢幕上目前是運算子，則可重複變更
        else if (tempOperator == '+' || tempOperator == '-' || tempOperator == '×' || tempOperator == '÷') {
            tempOperator = str;
            document.getElementById('outcome').innerHTML = str;
        }
    }

    // 清除螢幕上的值
    else if (str == 'CE') {
        tempString = "";
        document.getElementById('outcome').innerHTML = "";
    }

    // 清除目前儲存的所有值
    else if (str == 'C') {
        tempString = "";
        numberCluster = [];
        document.getElementById('outcome').innerHTML = "";
    }

    // 將值退一格
    else if (str == 'backspace') {
        if (/[0-9]/.test(tempString)) {
            tempString = tempString.substr(0, tempString.length - 1);
            document.getElementById('outcome').innerHTML = tempString;
        }
    }
    // 做正負號變更
    else if (str == '±') {
        if (/[0-9]/.test(tempString) && tempOperator != "result" && Number(tempString) >= 0) {
            tempString = "-" + tempString;
            document.getElementById('outcome').innerHTML = tempString;
        }
        else if (/[0-9]/.test(tempString) && tempOperator != "result" && Number(tempString) < 0) {
            tempString = Math.abs(Number(tempString)).toString();
            document.getElementById('outcome').innerHTML = tempString;
        }
    }

    // 加小數點
    else if (str == '.') {
        if (/[0-9]/.test(tempString) && tempOperator != "result" && tempString.search(/\./) < 0) {
            tempString += str;
            document.getElementById('outcome').innerHTML = tempString;
        }
        console.log(tempString.search(/\./));
    }
}

function result() {
    if (/[0-9]/.test(tempString)) {
        // 這邊記錄我按=後的結果
        numberCluster.push(tempString);
        console.log(numberCluster)

        // 如果陣列有數值按=才有效果
        if (numberCluster.length != 0) {
            // 讓程式先乘除後加減並且由左到右
            // 所以設兩個由左到右的值(i,j)
            let i = 0;
            let j = 0;

            // 遇到啥就做啥
            while (numberCluster.indexOf("×") > 0 || numberCluster.indexOf("÷") > 0) {
                i++;
                if (numberCluster[i] == "×") {
                    let operatorIndex = numberCluster.indexOf("×");
                    numberCluster.splice(operatorIndex - 1, 3, Number(numberCluster[operatorIndex - 1]) * Number(numberCluster[operatorIndex + 1]));
                    i -= 1;
                } else if (numberCluster[i] == "÷") {
                    let operatorIndex = numberCluster.indexOf("÷");
                    numberCluster.splice(operatorIndex - 1, 3, Number(numberCluster[operatorIndex - 1]) / Number(numberCluster[operatorIndex + 1]));
                    i -= 1;
                }
            }

            // 和乘除類似變成加減
            while (numberCluster.indexOf("+") > 0 || numberCluster.indexOf("-") > 0) {
                j++;
                if (numberCluster[j] == "+") {
                    let operatorIndex = numberCluster.indexOf("+");
                    numberCluster.splice(operatorIndex - 1, 3, Number(numberCluster[operatorIndex - 1]) + Number(numberCluster[operatorIndex + 1]));
                    j -= 1;
                } else if (numberCluster[j] == "-") {
                    let operatorIndex = numberCluster.indexOf("-");
                    numberCluster.splice(operatorIndex - 1, 3, Number(numberCluster[operatorIndex - 1]) - Number(numberCluster[operatorIndex + 1]));
                    j -= 1;
                }
            }

            // 顯示最後的結果並清空陣列
            tempString = numberCluster[0];
            numberCluster = [];
            document.getElementById('outcome').innerHTML = tempString;
            tempOperator = "result";
        }
    }
}
