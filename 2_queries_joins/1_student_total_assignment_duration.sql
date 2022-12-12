SELECT SUM(assignment_submissions.duration) as "total_duration"
FROM assignment_submissions
JOIN students ON students.id = assignment_submissions.student_id
WHERE name = 'Ibrahim Schimmel';