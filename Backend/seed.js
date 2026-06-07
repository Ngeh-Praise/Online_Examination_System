const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// SAFE FIX: Resolve exact path to match the backend's target file and folder layout
const dbFolder = path.resolve(__dirname, '../database');
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}
const dbPath = path.resolve(dbFolder, 'examination_system.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("❌ Seed database path connection error:", err.message);
    else console.log("✅ Seed successfully targeting: " + dbPath);
});

db.serialize(() => {
  console.log("🛠️ Re-initializing database schema fresh to remove old ID mismatches...");

  // FORCE DROPS: Wipes previous conflicting tables containing NULL user_ids
  db.run(`DROP TABLE IF EXISTS courses`);
  db.run(`DROP TABLE IF EXISTS users`);

  // 1. CREATE TABLES (Ensuring exact column matching with backend layout templates)
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    role TEXT NOT NULL,
    password_hash TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE courses (
    course_id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    lecturer_id INTEGER,
    enrolled_count INTEGER DEFAULT 0,
    progress_percentage INTEGER DEFAULT 0,
    status TEXT DEFAULT 'Pending',
    FOREIGN KEY(lecturer_id) REFERENCES users(id)
  )`);

  console.log("🌱 Seeding user account records...");

  // 2. SEED USERS (Setting both id and user_id to match login parameters)
  db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
    VALUES (2, 2, 'Dr. Smith', 'smith@exam.com', 'Lecturer', 'lecturer123')`);

  db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
    VALUES (5, 5, 'Prof. Kingsley', 'kingsley@exam.com', 'Lecturer', 'kingsley123')`);

  db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
    VALUES (10, 10, 'Ngeh Praise Munkeh', 'SC23A677', 'Student', 'praise123')`);

  db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
    VALUES (11, 11, 'John Doe', 'FE22A001', 'Student', 'student123')`);

  db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
    VALUES (1, 1, 'System Administrator', 'admin@exam.com', 'Admin', 'admin123')`);

  console.log("📚 Seeding active courses assigned to specific lecturers...");

  // 3. SEED COURSES 
  db.run(`INSERT INTO courses (code, title, lecturer_id, enrolled_count, progress_percentage, status)
    VALUES ('CS 411', 'Distributed Systems', 2, 64, 75, 'Marking')`);

  db.run(`INSERT INTO courses (code, title, lecturer_id, enrolled_count, progress_percentage, status)
    VALUES ('CSC 404', 'Software Engineering', 2, 78, 100, 'Completed')`);

  db.run(`INSERT INTO courses (code, title, lecturer_id, enrolled_count, progress_percentage, status)
    VALUES ('CSC 405', 'Introduction to Artificial Intelligence', 5, 68, 40, 'Exam Ongoing')`);

  db.run(`INSERT INTO courses (code, title, lecturer_id, enrolled_count, progress_percentage, status)
    VALUES ('CSC 402', 'Languages and Grammars', 5, 72, 15, 'Marking')`);

  console.log("✅ Database successfully aligned and populated!");
});

db.close();