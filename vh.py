from flask import Flask, render_template
import json, random

app = Flask(__name__, static_folder='static')

def generate_q1(data, continent):
    question_data = data.get(continent, {})
    image = question_data.get('image_url', '')
    answer_bank = question_data.get('options', [])
    person = question_data.get('question', '')
    return image, answer_bank, person

@app.route('/')
def index():
    with open('questions.json') as f:
        data = json.load(f)
    
    # Dictionary to hold questions for each continent
    questions = {}
    continents = ['North America', 'Africa', 'Asia', 'Europe', 'Oceania', 'South America']
    for continent in continents:
        questions[continent] = generate_q1(data, continent)

    return render_template('index.html', questions=questions)


if __name__ == '__main__':
    app.run(debug=True)
