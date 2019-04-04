function Question(text, key, choices) {
    return {
        text: text,
        choices: choices,
        key: key
    }
}

function Choice(text, value) {
    return {
        text: text,
        value: value,
    }
}

function Scores(risk, age, duration, experience) {
    return {
        risk: risk,
        age: age,
        duration: duration,
        experience: experience,
    }
}

Vue.component('survey', {
    template: '#survey-template',

    data: function() {
        return {
            title: 'Investment Option Evaluator',
            questions: [
                Question('What risk level are you comfortable with?', 'risk',
                    [
                        Choice('Nearly no risk', 1),
                        Choice('Low risk and possible loss of money', 2),
                        Choice('Moderate risk', 3),
                        Choice('High risk', 4),
                    ]),
                Question('How old are you?', 'age',
                    [
                        Choice('Under 30', 1),
                        Choice('30 to 60', 2),
                        Choice('Over 60', 3),
                    ]),
                Question('How long do you want to keep your money invested?', 'duration',
                    [
                        Choice('1 to 3 years', 1),
                        Choice('3 to 5 years', 2),
                        Choice('Over 5 years', 3),
                    ]),
                Question('How much experience do you have with investing?', 'experience',
                    [
                        Choice('No experience', 1),
                        Choice("I've dabbled a bit", 2),
                        Choice("I know what I'm doing", 3),
                    ]),
            ],
            scores: Scores(null, null, null, null),
        }
    },

    methods: {
        submit: function() {
            console.log(JSON.stringify(this.scores, null, 2))
        }
    }
})

Vue.component('question', {
    template: '#question-template',
    props: ['question', 'answer'],

    methods: {
        updateAnswer: function(answer) {
            this.$emit('update:answer', answer);
        }
    }
})

Vue.component('choice', {
    template: '#choice-template',
    props: ['choice', 'answer'],

    methods: {
        updateAnswer: function() {
            this.$emit('update:answer', this.choice.value);
        }
    }
})

var app = new Vue({
    el: '#app',
})
