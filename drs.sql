-- Domestic Repairs System
-- the following includes the table(s) for the DRS.

CREATE TABLE IF NOT EXISTS issues (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    userid MEDIUMINT UNSIGNED NOT NULL,
    applianceType VARCHAR(35) NOT NULL,
    ageOfAppliance MEDIUMINT(10) UNSIGNED NOT NULL,
    manufacturer VARCHAR(30) NOT NULL,
    faultSummary VARCHAR(100) NOT NULL,
    faultDescription VARCHAR(1000) NOT NULL,
    workBudget MEDIUMINT(200) NOT NULL,
    dateCreated DATETIME,
    status VARCHAR(20) NOT NULL,
    assignedTechnician VARCHAR(20),
    FOREIGN KEY(userid) REFERENCES accounts(id)
);

INSERT INTO issues(userid, applianceType, ageOfAppliance, manufacturer, faultSummary, faultDescription, workBudget, dateCreated, status)
VALUES(3, "washing machine", 5, "beko", "broken lid", "front lid of washing machine doesnt close properly", 50, CURRENT_TIMESTAMP, 'unassigned');




