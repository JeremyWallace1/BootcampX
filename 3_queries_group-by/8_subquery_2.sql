SELECT AVG(total_students) as average_students
FROM (
  SELECT COUNT(students) as total_students
  FROM students
  JOIN cohorts on cohorts.id = students.cohort_id
  GROUP BY cohorts
) as totals_table;