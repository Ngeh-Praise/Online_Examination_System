const BASE_URL = 'http://localhost:5000/api';

export const lecturerService = {
  // 1. Hits our new live overview-stats route
  getOverviewStats: async (lecturerId) => {
    try {
      const response = await fetch(`${BASE_URL}/lecturer/overview-stats?id=${lecturerId}`);
      if (!response.ok) throw new Error('Server returned bad status code');
      return await response.json();
    } catch (error) {
      console.error("Stats fetch fallback activated:", error);
      return { activeStudents: 142, overallGrading: 61, pendingExams: 2 };
    }
  },

  // 2. Hits our courses query stream
  getActiveCourses: async (lecturerId) => {
    try {
      const response = await fetch(`${BASE_URL}/lecturer/courses?id=${lecturerId}`);
      if (!response.ok) throw new Error('Server returned bad status code');
      return await response.json();
    } catch (error) {
      console.error("Courses fallback activated:", error);
      return [
        { id: 1, code: 'CS402', name: 'Advanced Algorithms', enrolled: 64, progress: 75, status: 'Marking' },
        { id: 2, code: 'CS408', name: 'Database Management Systems', enrolled: 78, progress: 100, status: 'Completed' },
        { id: 3, code: 'CS412', name: 'Artificial Intelligence', enrolled: 55, progress: 10, status: 'Exam Ongoing' }
      ];
    }
  },

  // 3. Submits manual CA modifications down to the results table row
  updateStudentCA: async (caDataPkg) => {
    const response = await fetch(`${BASE_URL}/lecturer/update-ca`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caDataPkg)
    });
    return await response.json();
  }
};