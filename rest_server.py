from flask import Flask, url_for, request, redirect, abort

# Create Flask app
app = Flask(__name__, static_url_path='', static_folder='staticpages')

# Route from home page
@app.route('/')
def index():
    return "Wecolme to the Anime API"

if __name__ == "__main__":
    app.run(debug=True)