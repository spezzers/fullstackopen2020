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
	const target = 2
	const periodLength = trainingRecord.length
	const trainingDays = trainingRecord.filter(h => h > 0).length
	const average = trainingRecord.reduce((acc, cur) => acc + cur) / periodLength
	let rating, ratingDescription
	
	if (average >= target) {
		rating = 3;
		ratingDescription =  'Awesome work, keep it up!'
	}
	else if (average >= target * 0.8) {
		rating = 2;
		ratingDescription =  'Not too bad but could be better.'
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

try {
    console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1]));
} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}