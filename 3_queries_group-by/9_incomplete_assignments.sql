SELECT assignments.name
FROM assignments
WHERE id NOT IN (
  SELECT assignment_id
  FROM assignment_submissions
  JOIN students ON students.id = assignment_submissions.student_id
  WHERE students.name = 'Ibrahim Schimmel'
);
