from flask import Flask, url_for, request, redirect, abort
from animeDAO import animeDAO

# Create Flask app
app = Flask(__name__, static_url_path='', static_folder='staticpages')

# Route from home page
@app.route('/')
def index():
    return "Wecolme to the Anime API"

# GET - to get all anime
@app.route('/anime/<int:id>', methods=['GET'])
def get_all_anime():
    return f"get all anime"

# GET to obtain ID
@app.route('/anime/<int:id>', methods=['GET'])
def get_anime(id):
    return f"find by id {id}"

# POST - Create
@app.route('/anime/<int:id>', methods=['PUT'])
def create_anime(id):
    # Read the json
    jsonstring = request.json
    return f"crete anime: {json_data}"

# PUT - Update
@app.route('/anime/<int:id>', methods=['PUT'])
def update_anime(id):
    json_data = request.json
    return f"update anime {id} with: {json_data}"

# DELETE
@app.route('/anime/<int:id>', methods=['DELETE'])
def delete_anime(id):
    return f"delete anime {id}"

if __name__ == "__main__":
    app.run(debug=True)

# Tested successfully
