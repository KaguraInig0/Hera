from flask import Flask, render_template, Blueprint, redirect, url_for

# Create the Flask application
app = Flask(__name__, static_folder='static')

# Define a Blueprint for the new page
new_page_bp = Blueprint('new_page', __name__, template_folder='templates')

# Define a route for the new page (new_page.html)
@new_page_bp.route('/')
def new_page():
    return render_template('new_page.html')

# Register the Blueprint with the Flask application
app.register_blueprint(new_page_bp)

# Define a Blueprint for the index page
index_page_bp = Blueprint('index_page', __name__, template_folder='templates')

# Define a route for the index page (index.html)
@index_page_bp.route('/index_page')
def index_page():
    return render_template('index.html')

# Register the Blueprint with the Flask application
app.register_blueprint(index_page_bp)

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=False)
