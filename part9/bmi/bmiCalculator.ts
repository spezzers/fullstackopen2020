type BMI = number;
type kg = number;
type cm = number;

const calculateBMI = (height: cm, mass: kg): string => {
    const BMI = mass / (height / 100) ** 2;
    switch (true) {
        case BMI >= 40:
            return 'Obese Class III (Very severely obese)';
        case BMI >= 35:
            return 'Obese Class II (Severely obese)';
        case BMI >= 30:
            return 'Obese Class I (Moderately obese)';
        case BMI >= 25:
            return 'Overweight';
        case BMI >= 18.5:
            return 'Normal (healthy weight)';
        case BMI >= 16:
            return 'Underweight';
        case BMI >= 15:
            return 'Severely underweight';
        case BMI < 15:
            return 'Very severely underweight';
        default:
            return 'Failed to calculate BMI';
    }
};

const parseArgs = (args: string[]): { height: cm; mass: kg } => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            mass: Number(args[3]),
        };
    } else {
        throw new Error('Provided values were not numbers');
    }
};

const height: cm = Number(process.argv[2]);

try {
    const { height, mass } = parseArgs(process.argv);
    console.log(calculateBMI(height, mass));
} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}
