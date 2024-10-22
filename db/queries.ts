export const SELECT_ALL_TARGETS = "SELECT * FROM targets";

export const SELECT_TARGET_STATUS =
  "SELECT pipeline_status FROM targets WHERE id = $1";

export const UPDATE_TARGET_STATUS = `
  UPDATE targets 
  SET pipeline_status = $1, last_updated = $2 
  WHERE id = $3
`;

export const INSERT_AUDIT_LOG = `
  INSERT INTO audit_log (target_id, old_status, new_status) 
  VALUES ($1, $2, $3)
`;
