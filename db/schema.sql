CREATE TABLE IF NOT EXISTS targets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    pipeline_status VARCHAR(20) CHECK (pipeline_status IN ('Passed', 'Cold', 'Active', 'Hot', 'Closed', NULL)),
    markets TEXT[],
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    target_id INT REFERENCES targets(id),
    old_status VARCHAR(20),
    new_status VARCHAR(20),
    change_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
