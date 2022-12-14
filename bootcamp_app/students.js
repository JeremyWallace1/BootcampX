const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx'
});

const [ node, path, cohortName, numResults ] = process.argv;
// console.log(process.argv);
const queryVals = [`%${cohortName}%`, numResults];

pool.query(`
SELECT students.id AS "student_id", students.name AS "name", cohorts.name AS "cohort"
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, queryVals)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack))
.finally(() => pool.end());