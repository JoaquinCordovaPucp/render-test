# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Node.js/Express.js REST API backend for a notes application with MongoDB integration. The application serves as a learning project demonstrating basic CRUD operations, database connectivity, and full-stack deployment patterns.

## Architecture

- **Backend Framework**: Express.js server with CommonJS modules
- **Database**: MongoDB with Mongoose ODM
- **Frontend Integration**: Serves static files from `dist/` directory (built from separate frontend project)
- **Configuration**: Environment variables managed via dotenv

### Key Components

- `index.js`: Main server file with Express routes and middleware
- `models/note.js`: Mongoose model for Note schema with MongoDB connection logic
- `mongo.js`: Standalone MongoDB connection script for direct database operations
- `requests/`: REST client test files for API endpoints

## Development Commands

### Running the Application
```bash
npm start          # Production server
npm run dev        # Development server with auto-reload (--watch)
```

### Frontend Integration
```bash
npm run build:ui   # Build frontend from ../introdemo and copy to dist/
npm run deploy:full # Build UI, commit changes, and push to git
```

### Database Operations
```bash
node mongo.js <password>  # Direct MongoDB operations (requires password argument)
```

## Environment Configuration

Required environment variables in `.env`:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (defaults to 3001 based on REST files)

## API Endpoints

- `GET /`: Welcome page
- `GET /api/notes`: Get all notes
- `GET /api/notes/:id`: Get specific note by ID
- `POST /api/notes`: Create new note (requires content field)
- `DELETE /api/notes/:id`: Delete note by ID

## Development Workflow

1. The application uses a hybrid approach with hardcoded notes array alongside MongoDB operations
2. Frontend builds are integrated into the backend deployment process
3. REST client files in `requests/` directory can be used for API testing
4. MongoDB connection is established in the Note model, not in the main server file

## Error Handling Patterns

- Malformed ID errors return 400 status with error message
- Missing content in POST requests return 400 with specific error
- 404 responses for non-existent resources
- Catch blocks log errors to console before responding

## Key Considerations

- The `generateId()` function operates on the local notes array, not the MongoDB collection
- DELETE endpoint only removes from local array, not from database
- Database connection logging occurs on every model import
- Static file serving is configured for the `dist/` directory