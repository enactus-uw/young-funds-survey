function Question(text, choices) {
    return {
        text: text,
        choices: choices,
    }
}

function Answer(key) {
    return {
        key: key,
        value: null,
    }
}

function Choice(text, value) {
    return {
        text: text,
        value: value,
    }
}

Vue.component('survey', {
    template: '#survey-template',

    data: function() {
        return {
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
                Question('How long do you want to keep your money invested?',
                    [
                        Choice('1 to 3 years', 1),
                        Choice('3 to 5 years', 2),
                        Choice('Over 5 years', 3),
                    ]),
                Question('How much experience do you have with investing?',
                    [
                        Choice('No experience', 1),
                        Choice("I've dabbled a bit", 2),
                        Choice("I know what I'm doing", 3),
                    ]),
            ],

            answers: [
                Answer('risk'),
                Answer('age'),
                Answer('duration'),
                Answer('experience'),
            ],
        }
    },

    methods: {
        submit: function() {
            var answers = this.answers.map(function (answer) { return answer.value });
            console.log(answers);
        }
    }
})

Vue.component('question', {
    template: '#question-template',
    props: ['question', 'answer_val'],
})

Vue.component('choice', {
    template: '#choice-template',
    props: ['choice', 'answer_val'],
})

var app = new Vue({
    el: '#app',
})
