CREATE VIEW vw_top_providers AS

SELECT
    name,
    category,
    rating
FROM providers
WHERE rating >= 4;

CREATE VIEW vw_event_summary AS

SELECT
    e.title,
    e.location,
    COUNT(b.id) AS total_bookings

FROM events e

LEFT JOIN bookings b
ON e.id = b.event_id

GROUP BY e.id;