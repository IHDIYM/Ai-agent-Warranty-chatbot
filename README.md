# Warranty Backend

AI-powered warranty chatbot backend built with Flask and MongoDB Atlas.

## Features

- Flask REST API for warranty assistance
- MongoDB Atlas integration for data storage
- FAISS vector database for semantic search
- Google Gemini AI integration
- CORS support for frontend integration

## Tech Stack

- Python 3.10
- Flask
- MongoDB Atlas
- FAISS
- Google Generative AI
- Gunicorn (production server)

## Environment Variables

- `GOOGLE_API_KEY`: Your Google Gemini API key
- `MONGODB_URI`: MongoDB Atlas connection string (optional, has default)

## Deployment

This backend is designed to be deployed on Render.com with the following configuration:

- **Build Command**: (auto-detected)
- **Start Command**: `gunicorn app:app`
- **Environment**: Python 3.10 