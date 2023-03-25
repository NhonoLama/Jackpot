const prompt = require("prompt-sync")();

const COL = 3;
const ROW = 3;

const symbolsCount = {
    A : 3,
    B : 4,
    C : 5,
    D : 6
}

const symbolsValue = {
    A : 5,
    B : 3,
    C : 2,
    D : 1
}


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

const spin = () => {
    const symbols = [];
    
    for( const [symbol,count] of Object.entries(symbolsCount)){
        for(let i=0 ; i<count ; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for( let i=0 ; i<COL ; i++){
        reels.push([]);     //adds an array as a member.
        const reelSymbols = [...symbols];
        for( let j=0 ; j<ROW ; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const chosenSymbol = reelSymbols[randomIndex];
            
            reels[i].push(chosenSymbol);
            reelSymbols.splice(randomIndex,1);
        }
    }

    return reels;
} 

const transpose = (reel) => {
    const reels = [];

    for(let i=0 ; i<COL ; i++){
        reels.push([]);
        for(let j=0 ; j<ROW ; j++){
            reels[i].push(reel[j][i]);
        }
    }
    return reels;
}

const print = (reels) => {
    for(const reel of reels){
        let string = "";
        for(const [i,symbol] of reel.entries()){
            string += symbol;
            if(i != reel.length-1){
                string += ' | ';
            }
        }
        console.log(string);
    }
}

const getWinnings = (bet , lines , reels ) => {
    let winnings = 0;
    let allSame = true;
    for( let i=0 ; i<lines ; i++ ){
        const symbols = reels[i];
        const flag = symbols[0];
        for(const symbol of symbols){
            if(symbol != flag){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings += bet * symbolsValue[symbols[0]];
        }
    }
    return winnings;
}


const game = () => {

    let balance = deposit();
    while(true){
        console.log("your balance is $" + balance);

        const noOfLines = getNoOfLines();
        const bet = placeBet(balance,noOfLines);
        balance -= bet* noOfLines;
        const save = spin();
        const reel = transpose(save);
        print(reel);
        const winnings = getWinnings(bet , noOfLines , reel);
        balance += winnings;
        console.log(`You won ${winnings}.!!`);

        if(balance == 0 ){
            console.log("balance finished!");
            break;
        }

        const playAgain =  prompt("play another game?? (y/n) : ");
        if(playAgain != ('y' || 'Y') ) break;
    }
}


game();