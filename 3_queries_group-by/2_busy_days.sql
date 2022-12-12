SELECT day, COUNT(day) AS "total_assignments"
FROM assignments
GROUP BY day
HAVING COUNT(day) >= 10
ORDER BY day;