type hours = number;
type rating = 1 | 2 | 3;

const calculateExercise = (trainingRecord: hours[]): {
    periodLength: number;
    trainingDays: number;
    target: hours;
    average: hours;
    success: boolean;
	rating: rating;
	ratingDescription: string
} => {

    return {
        periodLength: 1,
        trainingDays: 1,
        target: 1,
        average: 1,
        success: true,
		rating: 1,
		ratingDescription: 'awesome'
    };
};

try {
    console.log(calculateExercise([3, 0, 2, 4.5, 0, 3, 1]));
} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}