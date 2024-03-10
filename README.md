# FitBuddy

## Overview

FitBuddy is designed to deliver immediate, personalized medical advice through an interactive and user-friendly interface. Utilizing advanced machine learning algorithms, including Perplexity AI for conversational AI capabilities, the platform provides users with reliable health information and advice tailored to their specific needs.

## Key Features

- **Interactive Human Model**: Users can pinpoint areas of discomfort on a 3D human model to receive tailored exercises and relief strategies.
- **Instant Medical Advice**: A powerful search feature allows users to get immediate advice on various medical conditions.
- **Secure Medical Data Upload**: Users can upload their medical records for enhanced advice, with all data processed locally to ensure privacy.
- **Voice-Enabled Queries**: A talk feature supports input in over 10 languages, offering responses in both text and audio to accommodate all users.
- **Multilingual Support**: Ensuring accessibility, the platform supports multiple languages, broadening its user base.

## Technology Stack

- **Frontend**: Developed with React.js, utilizing Axios for efficient API communication.
- **Backend**: A Flask server processes API requests and integrates with machine learning models for data analysis.
- **Machine Learning**: Perplexity AI is employed for the chatbot feature, enabling dynamic follow-up questions and personalized advice.
- **Deployment**: The frontend is hosted on GitHub Pages, while the backend is deployed on Heroku, ensuring reliability and scalability.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- Python
- Git

### Setup Instructions

#### Set up the Frontend

```sh
# Navigate to the frontend directory
cd frontend  # Adjust this path as necessary
npm install   # Install dependencies
npm start     # Start the React app
```
#### Set up the Backend
# Navigate to the backend directory
cd ../backend  # Adjust this path as necessary
python -m venv venv                                # Create a virtual environment
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
pip install -r requirements.txt                   # Install dependencies
flask run                                          # Start the Flask server

Usage
After starting both the frontend and backend, access the Health Assistant Platform through your web browser at http://localhost:3000 (adjust the port if necessary). Explore the features such as interacting with the human model, searching for medical advice, uploading medical documents, or using the voice feature.

Contributing
We welcome contributions! Feel free to submit pull requests, open issues, or provide feedback to improve the platform.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
Your Name - 
Project Link: 





