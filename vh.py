from flask import Flask, render_template, Blueprint, redirect, url_for
import json, random, urllib.parse, os, requests
from collections import defaultdict
from google.cloud import storage

JSON_CRED = 'CREDENTIALS GO HERE'

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = JSON_CRED
storage_client = storage.Client()

#   downloading from cloud
def download_from_bucket(blob_name, file_path, bucket_name):
    try:
        bucket = storage_client.get_bucket(bucket_name)
        blob = bucket.blob(blob_name)
        with open(file_path, 'wb') as f:
            storage_client.download_blob_to_file(blob, f)
    except Exception as e:
        print(e)
        return False

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

    file = 'womanndata.json'
    download_from_bucket('womandata.json', file, 'YOURBUCKETNAME')
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