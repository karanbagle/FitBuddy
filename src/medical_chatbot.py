from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/start-conversation', methods=['POST'])
def start_conversation():
    data = request.json
    user_input = data['input']
    # Placeholder response logic
    follow_up_question = "How severe is your headache on a scale of 1 to 10?"
    return jsonify({'followUp': follow_up_question})

@app.route('/follow-up', methods=['POST'])
def follow_up():
    data = request.json
    user_input = data['input']
    # Placeholder response logic
    # Here you'd typically analyze the conversation state and user input to generate a follow-up or conclusion
    conclusion = "Based on your inputs, it might be a tension headache. Consider consulting a healthcare professional."
    return jsonify({'followUp': conclusion})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
