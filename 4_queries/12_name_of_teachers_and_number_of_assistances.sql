SELECT teachers.name AS "teacher", cohorts.name AS cohort, COUNT(assistance_requests) AS "total_assistances"
FROM assistance_requests
JOIN students ON student_id = students.id
JOIN cohorts ON cohorts.id = students.cohort_id
JOIN teachers ON teachers.id = assistance_requests.teacher_id
WHERE cohorts.name = 'JUL02'
GROUP BY teacher, cohort
ORDER BY teacher; 