CREATE TABLE "todo" (
    "id" SERIAL PRIMARY KEY,
    "task" VARCHAR NOT NULL,
    "priority" VARCHAR NOT NULL,
    "status" VARCHAR NOT NULL DEFAULT 'incomplete'
);

INSERT INTO "todo" 
	("task", "priority")
VALUES
	('clean kitchen', 'high'),
	('mow lawn', 'medium'),
	('pay bills', 'low'),
	('wash car', 'high'),
	('grocery shop', 'medium'),
	('homework', 'medium'),
	('setup doctors appointment', 'high'),
	('remodel basement', 'low'),
	('workout', 'medium'),
	('fix car', 'high');