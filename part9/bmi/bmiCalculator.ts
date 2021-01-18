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

try {
    console.log(calculateBMI(180, 74));
} catch (e) {
    console.log('Something went wrong, error message: ', e.message);
}
