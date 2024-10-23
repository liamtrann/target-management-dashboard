CREATE TABLE IF NOT EXISTS targets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    pipelineStatus VARCHAR(20) CHECK (pipelineStatus IN ('Passed', 'Cold', 'Active', 'Hot', 'Closed', NULL)),
    markets TEXT[],
    lastUpdated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    targetId INT REFERENCES targets(id),
    oldDtatus VARCHAR(20),
    newDtatus VARCHAR(20),
    changeTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);