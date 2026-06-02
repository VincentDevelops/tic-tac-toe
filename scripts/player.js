function Player(sign) {
    const mySign = sign;
    let wins = 0;
    let losses = 0;

    const incrementWins = () => { wins++; }
    const incrementLosses = () => { losses++ }
    
    const getWins = () => wins;
    const getLosses = () => losses;
    const getSign = () =>  mySign; 

    return { mySign, incrementWins, incrementLosses };
}

