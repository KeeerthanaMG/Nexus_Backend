export const GET_ALL_USERS = `
    SELECT * FROM "Userdetails";
`;

export const GET_USER_BY_ID = `
    SELECT * FROM "Userdetails" WHERE userid = $1;
`;

export const INSERT_USER = `
    INSERT INTO "Userdetails" (userid, name, email, phone, status, employee_type, project)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING userid;
`;

export const UPDATE_USER = `
    UPDATE "Userdetails"
    SET name = $1, email = $2, phone = $3, status = $4, employee_type = $5, project = $6
    WHERE userid = $7;
`;

export const DELETE_USER = `
    DELETE FROM "Userdetails" WHERE userid = $1;
`;
