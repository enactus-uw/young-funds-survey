function Question(text, choices) {
    return {
        text: text,
        choices: choices,
    }
}

function Choice(text, value) {
    return {
        text: text,
        value: value,
        picked: false,
    }
}

var app = new Vue({
    el: '#main',
    data: {
        title: 'Investment Option Evaluator',
        questions: [
            Question('What risk level are you comfortable with?',
                [
                    Choice('Nearly no risk', 1),
                    Choice('Low risk and possible loss of money', 2),
                    Choice('Moderate risk', 3),
                    Choice('High risk', 4),
                ]),
            Question('How old are you?',
                [
                    Choice('Under 30', 1),
                    Choice('30 to 60', 2),
                    Choice('Over 60', 3),
                ]),
        ],
    },
})
