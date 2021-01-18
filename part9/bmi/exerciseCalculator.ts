type hours = number;

const calculateExercise = (trainingRecord: hours[]): {
    periodLength: number;
    trainingDays: number;
    target: hours;
    average: hours;
    success: boolean;
	rating: number;
	ratingDescription: string
} => {
	const target = trainingRecord[0]
	const periodLength = trainingRecord.length - 1
	const trainingDays = trainingRecord.filter(h => h > 0).length
	const average = trainingRecord.reduce((acc, cur) => acc + cur) / periodLength
	let rating, ratingDescription
	
	if (average >= target) {
		rating = 3;
		ratingDescription =  'Awesome work, keep it up!'
	}
	else if (average >= target * 0.8) {
		rating = 2;
		ratingDescription =  'Not too bad, but could be better.'
	}
	else {
		rating = 1;
		ratingDescription =  'Get moving, slacker!'
	}

    return {
        periodLength,
        trainingDays,
        success: average >= target,
		rating,
		ratingDescription,
        target,
        average
    };
};


const parseExerciseArgs = (): number[] => {
	if (process.argv.length < 4) throw new Error('Not enough arguments provided')
	return process.argv.slice(2).map(n => {
		if (isNaN(Number(n))) throw new Error('Arguments must be numbers')
		return Number(n)
	})
}

try {
	const [...exerciseArgs] = parseExerciseArgs()
    console.log(calculateExercise([...exerciseArgs]));
} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}