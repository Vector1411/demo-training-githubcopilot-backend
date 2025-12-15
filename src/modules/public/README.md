# MODULE: PUBLIC (VISITOR)

Endpoints:
- GET /api/public/tours
- GET /api/public/tours/:tourId
- POST /api/public/registrations

Rules:
- Only OPEN tours visible
- Tour CLOSED => 409 TOUR_CLOSED on registration
- New registration contacted=false
