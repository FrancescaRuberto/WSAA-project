from flask import Flask, request, Response, redirect, abort, url_for, jsonify, render_template
import json
from animeDAO import animeDAO

app = Flask(__name__, static_url_path='', static_folder='static')

@app.route('/')
def index():
    return render_template('anime_page.html') # Connect html to Flask

#GET - Get all
@app.route('/anime', methods=['GET'])
def get_all_anime():
    try:
        data = animeDAO.getAll()
        if request.accept_mimetypes.accept_json:
            return jsonify(data)
        return render_template('anime.html', anime_list=data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#GET - Get by id
@app.route('/anime/<int:id>', methods=['GET'])
def get_anime(id):
    try:
        anime = animeDAO.findByID(id)
        if anime:
            return jsonify(anime)
        return jsonify({'message': 'Anime not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# POST - Create new anime
@app.route('/anime', methods=['POST'])
def create_anime():
    try:
        data = request.get_json()
        required = ['title', 'author']
        if not all(k in data for k in required):
            return jsonify({'error': 'Missing required fields'}), 400
        
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
            data.get('original_language')
        )
        
        new_id = animeDAO.create(values)
        return jsonify(animeDAO.findByID(new_id)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# PUT - Update anime
@app.route('/anime/<int:id>', methods=['PUT']) 
def update_anime(id):
    try:
        data = request.get_json()

        # Forcing management for "is manga"  
        is_manga = data.get('is_manga')
        if isinstance(is_manga, str):
            is_manga = is_manga.lower() == 'true'
        elif is_manga is None:
            is_manga = False

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
        
        updated_anime = animeDAO.update(values)
        if updated_anime:
            return jsonify(updated_anime)
        return jsonify({'message': 'Anime not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

#DELETE - Delete anime
@app.route('/anime/<int:id>', methods=['DELETE'])
def delete_anime(id):
    try:
        animeDAO.delete(id)
        return jsonify({'message': 'Anime deleted'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)