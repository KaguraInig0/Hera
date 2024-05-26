from flask import Flask, render_template
import json, random

question_bank = [
    "Who is she?",
    "Where is her birth place?",
    "What year was she born?",
    "What are her occupations?",
    "Which of these fun facts is about her?"
]

app = Flask(__name__, static_folder='static')

def generate_q1(data, continent):
    question_data = data.get(continent, {})
    player = random.choice(list(question_data.keys())) # particular person

    answer_all = [player] + question_data[player]['Answers'] + [question_data[player]['Summary']]
    answer_bank = [[] for _ in range(5)]# intitalize
    answer_bank[0] = (list(question_data.keys())) # question 1

    for person, values in question_data.items():
        for i in range(4):
            answer_bank[i+1].append(values['Answers'][i])

    for answer in answer_bank:
        random.shuffle(answer)
    image = question_data[player]['Image']

    return image, answer_bank, player, answer_all

@app.route('/')
def index():
    with open('womendata.json') as f:
        data = json.load(f)
    questions = {}
    continents = ['North_America', 'Africa', 'Asia', 'Europe', 'Australia', 'South_America']
    for continent in continents:
        image, answer_bank, player, answer_all = generate_q1(data, continent)
        questions[continent] = {'image': image, 'answer_bank': answer_bank, 'question_bank': question_bank,
            'player': player, 'answer_all': answer_all}

    return render_template('index.html', questions=json.dumps(questions))

if __name__ == '__main__':
    app.run(debug=True)
