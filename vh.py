from flask import Flask, render_template
import json, random

app = Flask(__name__, static_folder='static')

def generate_q1(data, continent):
    question_data = data.get(continent, {})
    person = random.choice(list(question_data.keys()))
    answer_bank = list(question_data.keys()).remove(person)

    image = question_data[person]['Image']
    return image, answer_bank, person

@app.route('/')
def index():
    with open('MrsWRLDWide\womendata.json') as f:
        data = json.load(f)
    questions = {}
    continents = ['North America', 'Africa', 'Asia', 'Europe', 'Australia', 'South America']
    for continent in continents:
        image, answer_bank, person = generate_q1(data, continent)
        questions[continent] = {'image': image, 'answer_bank': answer_bank, 'person': person}

    return render_template('index.html', questions=questions)



if __name__ == '__main__':
    app.run(debug=True)
