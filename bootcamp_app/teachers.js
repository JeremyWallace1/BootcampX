const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const cohortName = process.argv[2];
// Store all potentially malicious values in an array.
const values = [`%${cohortName}%`];

const queryString = `
  SELECT DISTINCT cohorts.name AS "cohort", teachers.name AS "teacher_name"
  FROM assistance_requests
  JOIN students ON assistance_requests.student_id = students.id
  JOIN teachers ON assistance_requests.teacher_id = teachers.id
  JOIN cohorts ON students.cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  ORDER BY teacher_name;
  `;

pool.query(queryString, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher_name}`);
    });
  }).catch(err => console.error('query error', err.stack))
  .finally(() => pool.end());