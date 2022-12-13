SELECT (
  SELECT COUNT(assignments)
  FROM assignments
)-COUNT(assignment_submissions) as "total_incomplete"
FROM assignment_submissions
JOIN students ON students.id = assignment_submissions.student_id
WHERE students.name = 'Ibrahim Schimmel';