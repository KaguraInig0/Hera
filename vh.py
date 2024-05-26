from flask import Flask, render_template, Blueprint, redirect, url_for
import json, random

app = Flask(__name__, static_folder='static')

def generate_q1(data, continent):
    question_data = data.get(continent, {})
    answer = random.choice(list(question_data.keys()))
    all  = list(question_data.keys())
    all.remove(answer)
    answer_bank = all + [answer]

    image = question_data[answer]['Image']

    return image, answer_bank, answer


# Define a Blueprint for the new page
home_bp = Blueprint('new_page', __name__, template_folder='templates')

# Define a route for the new page (new_page.html)
@home_bp.route('/')
def home():
    return render_template('home.html')

# Register the Blueprint with the Flask application
app.register_blueprint(home_bp)

# Define a Blueprint for the index page
index_bp = Blueprint('index_page', __name__, template_folder='templates')


# Define a route for the index page (index.html)

@app.route('/index')
def index():
    with open('womendata.json') as f:
        data = json.load(f)
    questions = {}
    continents = ['North America', 'Africa', 'Asia', 'Europe', 'Australia', 'South America']
    for continent in continents:
        image, answer_bank, answer = generate_q1(data, continent)
        questions[continent] = {'image': image, 'answer_bank': answer_bank, 'person': answer}

    return render_template('index.html', questions=json.dumps(questions))

# Register the Blueprint with the Flask application
app.register_blueprint(index_bp)


if __name__ == '__main__':
    app.run(debug=True)