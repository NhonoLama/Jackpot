const prompt = require("prompt-sync")();


const deposit = () => {
    while(true){
        let DepoAmount = prompt("Enter the amount to be deposited: ");
        DepoAmount = parseFloat(DepoAmount);

        if(isNaN(DepoAmount) || DepoAmount <= 0){
            console.log("Enter a valid amount!!");
        }else{
            return DepoAmount;
        }
    }
}

const getNoOfLines = () => {
    while(true){
        let noOfLines = prompt("Enter the no of lines: ");
        noOfLines = parseFloat(noOfLines);

        if(isNaN(noOfLines) || noOfLines <= 0 || noOfLines > 3){
            console.log("Enter a valid no of lines for max of 3!!");
        }else{
            return noOfLines;
        }
    }
}

const placeBet = (balance , noOfLines) => {
    while(true){
        let bet = prompt("Enter the bet amount: ");
        bet = parseFloat(bet);

        if(isNaN(bet) || bet <= 0 || bet > balance/noOfLines){
            console.log("Invalid bet !!");
        }else{
            return bet;
        }
    }
}

let balance = deposit();
const noOfLines = getNoOfLines();
const bet = placeBet(balance,noOfLines);
