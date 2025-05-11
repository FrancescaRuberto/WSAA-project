from flask import Flask, request, Response, redirect, abort, url_for, jsonify, render_template
import json
from animeDAO import animeDAO

app = Flask(__name__, static_url_path='', static_folder='staticpages')

@app.route('/')
def index():
    """Root endpoint returning welcome message"""
    return "Welcome to the Anime API"

def _json_response(data, status=200):
    """Helper function to format JSON responses"""
    return jsonify(data), status  # Using Flask's jsonify for consistent formatting

@app.route('/anime', methods=['GET'])
def get_all_anime():
    try:
        print("GET / anime")
        data = animeDAO.getAll()
        print("Data obtained from DAO:", data)
        return jsonify(data)
    except Exception as e:
        print("Error in get_all_anime():", e)
        return jsonify({'error': str(e)}), 500

@app.route('/anime/<int:id>', methods=['GET'])
def get_anime_by_id(id):
    """Get single anime by ID"""
    try:
        result = animeDAO.findByID(id)
        if result:
            return _json_response(result)
        return _json_response({'message': 'Anime not found'}, 404)
    except Exception as e:
        return _json_response({'error': str(e)}, 500)

@app.route('/anime', methods=['POST'])
def create_anime():
    """Create new anime record"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'author']
        if not all(field in data for field in required_fields):
            return _json_response({'error': 'Missing required fields'}, 400)
            
        values = (
            data['title'],
            data['author'],
            data.get('is_manga', 'No'),
            data.get('release_year'),
            data.get('seasons'),
            data.get('episodes'),
            data.get('studio'),
            data.get('rating'),
            data.get('genre'),
            data.get('category'),
            data.get('original_language', 'Japanese')
        )
        
        new_id = animeDAO.create(values)
        result = animeDAO.findByID(new_id)
        return _json_response(result, 201)
    except Exception as e:
        return _json_response({'error': str(e)}, 500)

@app.route('/anime/<int:id>', methods=['PUT'])
def update_anime(id):
    """Update existing anime record"""
    try:
        data = request.get_json()
        values = (
            data.get('title'),
            data.get('author'),
            data.get('is_manga'),
            data.get('release_year'),
            data.get('seasons'),
            data.get('episodes'),
            data.get('studio'),
            data.get('rating'),
            data.get('genre'),
            data.get('category'),
            data.get('original_language'),
            id
        )
        animeDAO.update(values)
        result = animeDAO.findByID(id)
        return _json_response(result)
    except Exception as e:
        return _json_response({'error': str(e)}, 500)

@app.route('/anime/<int:id>', methods=['DELETE'])
def delete_anime(id):
    """Delete anime record"""
    try:
        animeDAO.delete(id)
        return _json_response({'message': 'Anime deleted successfully'})
    except Exception as e:
        return _json_response({'error': str(e)}, 500)

if __name__ == '__main__':
    app.run(debug=True)