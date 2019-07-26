const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

export const delay = (duration = 1000) => new Promise( resolve => setTimeout(resolve, duration));

export const findWinner = (matrix) => {
    let winnerId;
    let winnerCombination;

    winCombinations.every( (combination)=>{
        const [a,b,c] = combination;
        if( matrix[a] !== null && matrix[a] === matrix[b] && matrix[a] === matrix[c] ) {
            winnerId = matrix[a];
            winnerCombination = combination;
            return false;
        }
        return true;
    } );

    return {
        combination: winnerCombination,
        user: ( winnerId !== void(0) ) && winnerId
    };
};

export const findBestStep = ( matrix, user ) => {
    let bestKeySteps = [];
    let possibility = 3;

    //if it first step
    if( matrix.indexOf(user) === -1 ) {
        bestKeySteps = matrix.map( (el, i) => el === null ? i : false ).filter( key => key !== false );
        return {
            countSteps: possibility,
            step: bestKeySteps[Math.floor(Math.random()*bestKeySteps.length)]
        };
    }

    winCombinations.forEach( combination => {
        const [a,b,c] = combination;

        if( (matrix[a] === null || matrix[a] === user) &&
            (matrix[b] === null || matrix[b] === user) &&
            (matrix[c] === null || matrix[c] === user)
        ) {
            const temp = [matrix[a], matrix[b], matrix[c]];
            const tempPossibility = temp.filter( elm => elm === null ).length;

            if( tempPossibility < possibility ) {
                possibility = tempPossibility;
                bestKeySteps = temp.map( ( elm, i ) => elm === null ? combination[i] : false ).filter( elm => elm !== false )
            }

        }
    } );

    return {
        countSteps: bestKeySteps.length,
        step: bestKeySteps[Math.floor(Math.random()*bestKeySteps.length)] || matrix.findIndex(elm => elm === null)
    };
};
