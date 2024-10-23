# Add any notes about the task here

## Strategy to Manage and Track Changes to Pipeline Statuses

### 1. Database Schema Design

We need to track both the current status of a target and the history of any status changes. This can be done using two tables:

- **`targets` table**: Stores the main information about each target, including its current status.
- **`audit_log` table**: Stores a log of any status changes to track the history of changes over time.

#### Targets Table:

```sql
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
```

### Data Update Strategy:
Whenever a target’s status is updated:
1. Fetch the current `pipelineStatus` from the `targets` table.
2. Compare the new status with the current one:
   - If different, proceed to update the status in the `targets` table.
   - Log the change in the `audit_log` table, storing both the old status and new status.
3. Update the `lastUpdated` field in the `targets` table to reflect the timestamp of the update.

The `audit_log` will accumulate entries for each status change, providing a full history of status transitions over time.

## 2. Non-Trivial Edge Cases and Solutions:

### 1. Invalid Status:
- **Problem**: The system may receive invalid pipeline statuses that are not part of the allowed values (e.g., 'Passed', 'Cold', 'Active', 'Hot', 'Closed').
- **Solution**: Implement validation to check the new status against the allowed list before performing any updates. If the status is invalid, return an error message, ensuring that only correct statuses can be updated.

### 2. Concurrent Updates:
- **Problem**: Multiple users or services might try to update the same target’s pipeline status at the same time, causing race conditions.
- **Solution**: Implement database-level transactions or optimistic locking to ensure consistency. The `lastUpdated` field could be checked to ensure no recent changes occurred before applying the new status update.

### 3. Failed Database Connection:
- **Problem**: If the database is temporarily unavailable, status updates may fail, and data may be lost.
- **Solution**: Implement retry mechanisms in the application. Log any failed attempts to update the database so they can be retried or manually corrected when the database is back online.

### 4. Status Stagnation:
- **Problem**: A target may remain in one status for too long without progress (e.g., staying in 'Active' indefinitely).
- **Solution**: Implement a cron job or scheduled task to periodically check the age of the current status and notify users if a target has not moved for a certain period (e.g., 30 days).

By addressing these cases and maintaining a structured audit log, the system will be able to track pipeline status changes effectively and handle edge cases gracefully.
"""