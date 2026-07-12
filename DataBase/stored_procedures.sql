DELIMITER $$

CREATE PROCEDURE sp_signup_user(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(255),
    IN p_role VARCHAR(50)
)
BEGIN

    INSERT INTO users(name,email,password,role)
    VALUES(p_name,p_email,p_password,p_role);

END $$

CREATE PROCEDURE sp_create_event(
    IN p_title VARCHAR(100),
    IN p_location VARCHAR(100),
    IN p_budget DECIMAL(10,2)
)
BEGIN

    INSERT INTO events(title,location,budget)
    VALUES(p_title,p_location,p_budget);

END $$

DELIMITER ;