const player = (sign) => {
    let mySign = sign;
    let wins = 0;
    let losses = 0;

    const incrementWins = () => { wins++; }
    const incrementLosses = () => { losses++ }

    const setSign = (sign) => {
        mySign = sign;
    }

    const getWins = () => wins;
    const getLosses = () => losses;
    const getSign = () => mySign;

    return { incrementWins, incrementLosses, setSign, getWins, getLosses, getSign };
}

