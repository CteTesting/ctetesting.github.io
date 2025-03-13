// Credit Requirements
const creditRequirements = {
    english: 40, // 4 years of English
    history: 30, // 3 years of History
    pe: 20,      // 2 years of PE
    science: 20, // 2 years of Science
    math: 20,    // 2 years of Math
    lote: 20,    // 2 years of LOTE
    art: 10,     // 1 year of Art
    elective: 90, // 9 years of Electives
};

// A-G Requirements
const aGRequirements = {
    history: 2, // Years (1 year = 10 credits)
    english: 4,
    math: 3,
    science: 2,
    lote: 2,
    art: 1,
    elective: 1,
};

// Class-to-Category Mapping
const classCategories = {
    // English
    "English I": "english",
    "English II": "english",
    "English III": "english",
    "English IV": "english",

    // Math
    "222100 Algebra II": "math",
    "222400 Pre-Calculus": "math",
    "222410 Pre-Calculus H**": "math",
    "222600 Statistics": "math",
    "227300 Personal Finance": "math",

    // Science
    "233000 Anatomy": "science",
    "232310 NGSS Chemistry Honors**": "science",
    "Biology": "science",
    "Physics": "science",

    // Social Science
    "Ethnic Studies": "history", // Counts as History and Elective
    "World History": "history",
    "US History": "history",
    "Gov/Econ": "history",

    // Art
    "262110 Art II Honors**": "art",
    "262210 Art III Honors**": "art",
    "Art I": "art",
    "Drawing (DEP)": "art",

    // LOTE
    "LOTE I": "lote",
    "LOTE II": "lote",

    // Electives
    "521500 Education I": "elective",
    "521600 Education II": "elective",
    "537000 Multimedia I": "elective",
    "537100 Multimedia II": "elective",
    "808500 PLUS**": "elective",
    "292100 PE II": "elective",
    "853300 Drawing (DEP)": "elective",
    "853401 Intro to Bus. 20 (DEP)": "elective",
    "859010 History 17A (DEP)": "elective",
    "858600 Hist 17B (DEP)": "elective",
    "852700 Intro to Psychology": "elective",
    "859300 STATS 12": "elective",
    "852000 Comm St.1A (DEP)": "elective",
};

// Default Credits (based on pre-filled classes)
const defaultCredits = {
    english: 40, // 4 years of English
    math: 30,    // 3 years of Math
    science: 30, // 3 years of Science
    history: 40, // 4 years of History
    pe: 20,      // 2 years of PE
    art: 10,     // 1 year of Art
    lote: 20,    // 1 year of LOTE
    elective: 60, // No default elective credits
};

// Confirm Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    const confirmButton = document.getElementById('confirm-button');
    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            console.log("Confirm button clicked!"); // Debugging
            const droppables = document.querySelectorAll('.droppable');
            const credits = { ...defaultCredits }; // Start with default credits

            // Calculate Credits from [Blank] Sections
            droppables.forEach(droppable => {
                const className = droppable.textContent.trim(); // Trim whitespace
                console.log(`Class Name: "${className}"`); // Debugging
                if (className !== '[Blank]' && classCategories[className]) {
                    const category = classCategories[className];
                    credits[category] += 10; // Each class is worth 10 credits (1 year)
                    console.log(`Added 10 credits to ${category}`); // Debugging

                    // Ethnic Studies counts as both History and Elective
                    if (className === "Ethnic Studies") {
                        credits.elective += 10; // Add 10 credits to electives
                        console.log(`Added 10 elective credits for Ethnic Studies`); // Debugging
                    }
                } else {
                    console.log(`Class "${className}" not found in classCategories.`); // Debugging
                }
            });

            // Handle Extra Core Classes as Electives
            const extraCredits = {
                math: Math.max(0, credits.math - creditRequirements.math),
                science: Math.max(0, credits.science - creditRequirements.science),
                art: Math.max(0, credits.art - creditRequirements.art),
                lote: Math.max(0, credits.lote - creditRequirements.lote),
            };

            // Add extra core credits to electives
            credits.elective += extraCredits.math + extraCredits.science + extraCredits.art + extraCredits.lote;

            // Check Graduation Requirements
            const missingGraduationCredits = {};
            for (const [category, required] of Object.entries(creditRequirements)) {
                if (credits[category] < required) {
                    missingGraduationCredits[category] = required - credits[category];
                }
            }

            // Check A-G Compliance
            const missingAGCredits = {};
            for (const [category, requiredYears] of Object.entries(aGRequirements)) {
                const requiredCredits = requiredYears * 10; // Convert years to credits
                if (credits[category] < requiredCredits) {
                    missingAGCredits[category] = requiredCredits - credits[category];
                }
            }

            // Display Results
            const results = document.getElementById('results');
            let resultsHTML = "";

            if (Object.keys(missingGraduationCredits).length === 0) {
                resultsHTML += "<p>✅ You have enough credits to graduate!</p>";
            } else {
                resultsHTML += "<p>❌ You are missing the following credits to graduate:</p>";
                resultsHTML += "<ul>";
                for (const [category, missing] of Object.entries(missingGraduationCredits)) {
                    resultsHTML += `<li>${missing} more ${category} credits</li>`;
                }
                resultsHTML += "</ul>";
            }

            if (Object.keys(missingAGCredits).length === 0) {
                resultsHTML += "<p>✅ You are A-G compliant!</p>";
            } else {
                resultsHTML += "<p>❌ You are missing the following credits to be A-G compliant:</p>";
                resultsHTML += "<ul>";
                for (const [category, missing] of Object.entries(missingAGCredits)) {
                    resultsHTML += `<li>${missing} more ${category} credits</li>`;
                }
                resultsHTML += "</ul>";
            }

            results.innerHTML = resultsHTML;
        });
    } else {
        console.error("Confirm button not found!");
    }

    // Reset Button Functionality
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            const droppables = document.querySelectorAll('.droppable');
            droppables.forEach(droppable => {
                droppable.textContent = '[Blank]'; // Reset to [Blank]
            });

            // Clear the results section
            const results = document.getElementById('results');
            results.innerHTML = "";
        });
    } else {
        console.error("Reset button not found!");
    }
});

// Toggle Dropdown Function
function toggleDropdown(header) {
    const content = header.nextElementSibling;
    content.classList.toggle('show');
}

// Close Dropdowns When Clicking Outside
document.addEventListener('click', (e) => {
    if (!e.target.matches('.dropdown-header')) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }
});