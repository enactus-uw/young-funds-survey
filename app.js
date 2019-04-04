// Values representing the parameters of each investment product
var VALUES = {
    // Represent an unpicked choice
    invalid: undefined,
    // Represents a product being suitable for all choices for a parameter
    any: null,

    risk: {
        lowest: 1,
        low: 2,
        moderate: 3,
        high: 4,
    },
    
    age: {
        young: 1,
        middleAge: 2,
        old: 3,
    },

    duration: {
        short: 1,
        medium: 2,
        long: 3,
    },

    experience: {
        none: 1,
        moderate: 2,
        experienced: 3,
    }
}

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

function Product(name, description, scores) {
    return {
        name: name,
        description: description,
        scores: scores,
    }
}

Vue.component('app', {
    template: '#app-template',

    data: function() {
        return {
            title: 'Investment Option Evaluator',
            
            products: [
                Product(
                    'Individual Stock', 
                    'placeholder',
                    Scores(VALUES.risk.high, VALUES.age.middleAge, VALUES.any, VALUES.experience.experienced),
                ),
                Product(
                    'Index Fund - Exchange Traded Fund', 
                    'placeholder',
                    Scores(VALUES.risk.low, VALUES.any, VALUES.duration.long, VALUES.experience.none),
                ),
                Product(
                    'GIC', 
                    'placeholder',
                    Scores(VALUES.risk.lowest, VALUES.age.old, VALUES.duration.short, VALUES.experience.none),
                ),
                Product(
                    'Bonds', 
                    'placeholder',
                    Scores(VALUES.risk.low, VALUES.age.old, VALUES.any, VALUES.experience.experienced),
                ),
            ]
        }
    },

    methods: {
        showResults: function(index) {
            var product = this.products[index];
            console.log(product.name);
        }
    }
})

Vue.component('survey', {
    template: '#survey-template',

    props: ['products'],

    data: function() {
        return {
            questions: [
                Question('What risk level are you comfortable with?', 'risk',
                    [
                        Choice('Nearly no risk', VALUES.risk.lowest),
                        Choice('Low risk and possible loss of money', VALUES.risk.low),
                        Choice('Moderate risk', VALUES.risk.moderate),
                        Choice('High risk', VALUES.risk.high),
                    ]),
                Question('How old are you?', 'age',
                    [
                        Choice('Under 30', VALUES.age.young),
                        Choice('30 to 60', VALUES.age.middleAge),
                        Choice('Over 60', VALUES.age.old),
                    ]),
                Question('How long do you want to keep your money invested?', 'duration',
                    [
                        Choice('1 to 3 years', VALUES.duration.short),
                        Choice('3 to 5 years', VALUES.duration.medium),
                        Choice('Over 5 years', VALUES.duration.long),
                    ]),
                Question('How much experience do you have with investing?', 'experience',
                    [
                        Choice('No experience', VALUES.experience.none),
                        Choice("I've dabbled a bit", VALUES.experience.moderate),
                        Choice("I know what I'm doing", VALUES.experience.experienced),
                    ]),
            ],
            scores: Scores(VALUES.invalid, VALUES.invalid, VALUES.invalid, VALUES.invalid),
        }
    },

    methods: {
        submit: function() {
            console.log(JSON.stringify(this.scores, null, 2));

            var diffs = [];
            for (var i = 0; i < this.products.length; i++) {
                var product = this.products[i];
                var diff = 0;

                for (var j = 0; j < this.questions.length; j++) {
                    var key = this.questions[j].key;
                    if (product.scores[key] === VALUES.any) {
                        // If a product fits any for a category, treat it as if it is the perfect fit
                        diff += 0;
                    } else {
                        diff += Math.abs(this.scores[key] - product.scores[key]);
                    }
                }

                console.log(product.name, diff)
                diffs.push(diff)
            }

            this.$emit('submit', this.find_best_product(diffs))
        },

        find_best_product: function(diffs) {
            var best_idx = 0;
            var best_diff = diffs[best_idx];

            for (var i = 0; i < diffs.length; i++) {
                var diff = diffs[i];
                if (diff < best_diff) {
                    best_diff = diff;
                    best_idx = i;
                }
            }
            
            return best_idx;
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
    el: '#root',
})
