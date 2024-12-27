from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.pdf_processor import process_pdf
import os
from werkzeug.exceptions import RequestEntityTooLarge

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure upload folder and max file size
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50 MB limit

# Create upload folder if it does not exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(e):
    """
    Handle error for files that exceed the size limit.
    - Returns a JSON error message.
    """
    return jsonify({'error': 'File is too large. Max size is 50 MB'}), 413

@app.route('/upload', methods=['POST'])
def upload_file():
    """
    Handle PDF file upload and generate flashcards.
    - Accepts a PDF file.
    - Saves it temporarily for processing.
    - Returns generated flashcards as JSON.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.pdf'):
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)  # Save the PDF file temporarily

        try:
            # Process the uploaded PDF to generate flashcards
            flashcards = process_pdf(filepath)
            os.remove(filepath)  # Clean up the temporary file
            return jsonify({'flashcards': flashcards})
        except ValueError as e:  # Catch known errors
            os.remove(filepath)
            return jsonify({'error': str(e)}), 400
        except Exception as e:  # Catch unexpected errors
            os.remove(filepath)
            return jsonify({'error': f"Unexpected error: {str(e)}"}), 500

    return jsonify({'error': 'Invalid file type. Only PDFs are allowed.'}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
