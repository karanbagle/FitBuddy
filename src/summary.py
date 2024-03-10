from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
from transformers import pipeline

app = Flask(__name__)
CORS(app)

summarizer = pipeline("summarization")

def extract_text_from_pdf(file):
    text = ""
    with fitz.open(stream=file.read(), filetype="pdf") as doc:
        for page in doc:
            text += page.get_text()
    return text

@app.route('/summarize', methods=['POST'])
def summarize_text():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Check if the file is a PDF
    if file.content_type == 'application/pdf':
        content = extract_text_from_pdf(file)
    else:
        # Assume it's a readable text file
        content = file.read().decode('utf-8')

    summary = summarizer(content, max_length=130, min_length=30, do_sample=False)

    return jsonify({'summary': summary[0]['summary_text']}), 200

if __name__ == '__main__':
    app.run(debug=True)
