# API Documentation

## User Authentication APIs:
- POST /api/auth/signup: Create a new user account.
- POST /api/auth/signin: Authenticate existing users.
- POST /api/auth/signout: Terminate user sessions.
- POST /api/auth/password-reset: Allow users to reset their passwords.

## Report Generation and Management APIs:
- POST /api/reports: Process the submitted feedback and generate a report using the GPT-4 API.
- GET /api/reports: Fetch all generated reports for the user.
- GET /api/reports/{id}: Retrieve a specific report by its ID.
- GET /api/reports/{id}/download: Allow users to download reports in PDF format


## Customer Feedback Management APIs:
- POST /api/feedback: Allow users to submit customer reviews or feedback.
- GET /api/feedback: Fetch all feedback submitted by the user.
- GET /api/feedback/{id}: Retrieve a specific feedback entry by its ID.
- PUT /api/feedback/{id}: Update an existing feedback entry.
- DELETE /api/feedback/{id}: Enable users to remove their feedback.


## Dashboard Data APIs:

- GET /api/dashboard: Retrieve data to display on the user's dashboard, such as feedback statistics and report summaries.