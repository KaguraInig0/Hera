from flask import Flask, render_template
import json, random

app = Flask(__name__, static_folder='static')

def generate_q1(data, continent):
    question_data = data.get(continent, {})
    answer = random.choice(list(question_data.keys()))
    answer_bank = list(question_data.keys())
    random.shuffle(answer_bank)
    image = question_data[answer]['Image']

    return image, answer_bank, answer

@app.route('/')
def index():
    with open('womendata.json') as f:
        data = json.load(f)
    questions = {}
    continents = ['North America', 'Africa', 'Asia', 'Europe', 'Australia', 'South America']
    for continent in continents:
        image, answer_bank, answer = generate_q1(data, continent)
        questions[continent] = {'image': image, 'answer_bank': answer_bank, 'person': answer}

    return render_template('index.html', questions=json.dumps(questions))

if __name__ == '__main__':
    app.run(debug=True)
