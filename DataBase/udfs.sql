DELIMITER $$

CREATE FUNCTION fn_total_bookings(uid INT)
RETURNS INT
DETERMINISTIC
BEGIN

    DECLARE total INT;

    SELECT COUNT(*)
    INTO total
    FROM bookings
    WHERE user_id = uid;

    RETURN total;

END $$

CREATE FUNCTION fn_average_rating(pid INT)
RETURNS DECIMAL(2,1)
DETERMINISTIC
BEGIN

    DECLARE avgRating DECIMAL(2,1);

    SELECT AVG(rating)
    INTO avgRating
    FROM reviews
    WHERE provider_id = pid;

    RETURN avgRating;

END $$

DELIMITER ;