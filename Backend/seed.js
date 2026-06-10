const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// SAFE FIX: Multi-segment path mapping for Git Bash / MINGW64 compatibility
const dbFolder = path.join(__dirname, '..', 'database');
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}
const dbPath = path.join(dbFolder, 'examination_system.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error("❌ Seed database path connection error:", err.message);
    else console.log("✅ Seed successfully targeting: " + dbPath);
});

db.serialize(() => {
    console.log("🛠️ Re-initializing database schema fresh based on DB Browser blueprint...");

    // 1. CLEANUP (Removes old versions if they exist)
    db.run(`DROP TABLE IF EXISTS proctologs`);
    db.run(`DROP TABLE IF EXISTS student_answers`);
    db.run(`DROP TABLE IF EXISTS results`);
    db.run(`DROP TABLE IF EXISTS questions`);
    db.run(`DROP TABLE IF EXISTS exams`);
    db.run(`DROP TABLE IF EXISTS courses`);
    db.run(`DROP TABLE IF EXISTS lecturers`);
    db.run(`DROP TABLE IF EXISTS students`);
    db.run(`DROP TABLE IF EXISTS users`);

    // 2. CREATE TABLES (Perfectly aligned with your server.js logic)
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        user_id INTEGER UNIQUE,               
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT CHECK(role IN ('Student', 'Lecturer', 'Admin')) NOT NULL,
        password_hash TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE students (
        student_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        matricle_number TEXT UNIQUE NOT NULL,
        level INTEGER,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`);

    db.run(`CREATE TABLE lecturers (
        lecturer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        department TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )`);

    db.run(`CREATE TABLE courses (
        course_id INTEGER PRIMARY KEY AUTOINCREMENT,
        code TEXT UNIQUE NOT NULL,            
        title TEXT NOT NULL,
        unit_load INTEGER,
        lecturer_id INTEGER,                  
        FOREIGN KEY(lecturer_id) REFERENCES users(user_id)
    )`);

    db.run(`CREATE TABLE exams (
        exam_id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_id INTEGER,
        date TEXT,
        duration INTEGER DEFAULT 120,
        ca_weight INTEGER DEFAULT 30,
        FOREIGN KEY(course_id) REFERENCES courses(course_id)
    )`);

    db.run(`CREATE TABLE questions (
        question_id INTEGER PRIMARY KEY AUTOINCREMENT,
        exam_id INTEGER,
        text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_answer TEXT NOT NULL,
        FOREIGN KEY(exam_id) REFERENCES exams(exam_id)
    )`);

    db.run(`CREATE TABLE results (
        result_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        exam_id INTEGER,
        exam_code TEXT,
        scheduled_time TEXT,
        exam_score REAL DEFAULT 0,
        ca_score REAL DEFAULT 0,
        final_grade TEXT,
        workspace_snapshot TEXT,
        face_verified INTEGER DEFAULT 0,
        camera_active INTEGER DEFAULT 0,
        noise_optimal INTEGER DEFAULT 0,
        network_stable INTEGER DEFAULT 0,
        verification_status TEXT DEFAULT 'Pending',
        last_synced_at DATETIME,
        FOREIGN KEY(student_id) REFERENCES students(student_id),
        FOREIGN KEY(exam_id) REFERENCES exams(exam_id)
    )`);

    db.run(`CREATE TABLE student_answers (
        answer_id INTEGER PRIMARY KEY AUTOINCREMENT,
        result_id INTEGER,
        question_id INTEGER,
        selected_option TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(result_id) REFERENCES results(result_id),
        UNIQUE(result_id, question_id)
    )`);

    db.run(`CREATE TABLE proctologs (
        log_id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        violation_type TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        evidence_path TEXT,
        FOREIGN KEY(student_id) REFERENCES students(student_id)
    )`);

    console.log("🌱 Seeding synchronized user account records...");

    // Seed Master users (Keeping id and user_id identical for cross-endpoint stability)
    db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
        VALUES (1, 1, 'System Administrator', 'admin@exam.com', 'Admin', 'admin123')`);

    db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
        VALUES (2, 2, 'Dr. Smith', 'smith@exam.com', 'Lecturer', 'lecturer123')`);

    db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
        VALUES (5, 5, 'Prof. Kingsley', 'kingsley@exam.com', 'Lecturer', 'kingsley123')`);

    db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
        VALUES (10, 10, 'Ngeh Praise Munkeh', 'SC23A677', 'Student', 'praise123')`);

    db.run(`INSERT INTO users (id, user_id, name, email, role, password_hash) 
        VALUES (11, 11, 'John Doe', 'FE22A001', 'Student', 'student123')`);

    console.log("👥 Building relational identities for profile references...");
    
    // Seed physical lecturer links
    db.run(`INSERT INTO lecturers (lecturer_id, user_id, department) VALUES (1, 2, 'Computer Science')`);
    db.run(`INSERT INTO lecturers (lecturer_id, user_id, department) VALUES (2, 5, 'Computer Science')`);

    // Seed physical student metadata references
    db.run(`INSERT INTO students (student_id, user_id, matricle_number, level) VALUES (1, 10, 'SC23A677', 400)`);
    db.run(`INSERT INTO students (student_id, user_id, matricle_number, level) VALUES (2, 11, 'FE22A001', 400)`);

    console.log("📚 Seeding course records mapped to active lecturers...");

    // Unified referencing to look up via user_id cleanly
    db.run(`INSERT INTO courses (course_id, code, title, unit_load, lecturer_id)
        VALUES (1, 'CS 411', 'Distributed Systems', 4, 2)`);

    db.run(`INSERT INTO courses (course_id, code, title, unit_load, lecturer_id)
        VALUES (2, 'CSC 404', 'Software Engineering', 3, 2)`);

    db.run(`INSERT INTO courses (course_id, code, title, unit_load, lecturer_id)
        VALUES (3, 'CSC 405', 'Introduction to Artificial Intelligence', 4, 5)`);

    db.run(`INSERT INTO courses (course_id, code, title, unit_load, lecturer_id)
        VALUES (4, 'CSC 402', 'Languages and Grammars', 3, 5)`);

    console.log("📝 Provisioning testing blueprints for upcoming examination schedules...");

    db.run(`INSERT INTO exams (exam_id, course_id, date, duration, ca_weight) VALUES (1, 1, '2026-06-15', 120, 30)`);
    db.run(`INSERT INTO exams (exam_id, course_id, date, duration, ca_weight) VALUES (2, 2, '2026-06-18', 120, 30)`);
    db.run(`INSERT INTO exams (exam_id, course_id, date, duration, ca_weight) VALUES (3, 3, '2026-06-20', 120, 30)`);
    db.run(`INSERT INTO exams (exam_id, course_id, date, duration, ca_weight) VALUES (4, 4, '2026-06-22', 120, 30)`);

    console.log("✅ Database tables cleanly structured and seeded!");
});

db.close();