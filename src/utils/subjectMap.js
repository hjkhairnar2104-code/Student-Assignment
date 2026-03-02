// Define shared curriculum mapping
export const subjectMap = {
    "1": {
        "1": ["Coos", "C", "Python"],
        "2": ["Matlab", "Datascience"],
    },
    "2": {
        "1": ["Dsa", "Java", "Cep", "R"],
        "2": ["Dbms", "Adsl", "Fsdl"],
    },
    "3": {
        "1": [],
        "2": [],
    },
    "4": {
        "1": [],
        "2": [],
    }
};

// Helper: Get all subjects for a specific year (combining both semesters)
export const getSubjectsByYear = (yearStr) => {
    const semesters = subjectMap[yearStr];
    if (!semesters) return [];

    const allSubjects = [];
    if (semesters["1"]) allSubjects.push(...semesters["1"]);
    if (semesters["2"]) allSubjects.push(...semesters["2"]);

    return allSubjects;
};
