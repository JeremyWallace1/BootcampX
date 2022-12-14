const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const [ node, path, cohortName ] = process.argv;
// console.log(process.argv);
const queryVals = [`%${cohortName}%`];

pool.query(`
SELECT DISTINCT cohorts.name AS "cohort", teachers.name AS "teacher_name"
FROM assistance_requests
JOIN students ON assistance_requests.student_id = students.id
JOIN teachers ON assistance_requests.teacher_id = teachers.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher_name;
`, queryVals)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.cohort}: ${user.teacher_name}`);
  })
}).catch(err => console.error('query error', err.stack))
.finally(() => pool.end());