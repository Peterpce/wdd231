
const courses = [
  { code: "WDD231", name: "Web Frontend Development I", credits: 3, type: "wdd" },
  { code: "WDD130", name: "Web Fundamentals", credits: 2, type: "wdd" },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "cse" },
  { code: "CSE210", name: "Programming with Classes", credits: 2, type: "cse" },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, type: "wdd" },
  { code: "CSE121b", name: "JavaScript Language", credits: 2, type: "cse" }
];

// Select elements
const courseContainer = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");

// Filter buttons
const allBtn = document.querySelector("#all");
const wddBtn = document.querySelector("#wdd");
const cseBtn = document.querySelector("#cse");

// Function to render courses
function renderCourses(filteredCourses) {
  courseContainer.innerHTML = ""; // clear cards
  let credits = 0;

  filteredCourses.forEach(course => {
    // Create card
    const card = document.createElement("div");
    card.classList.add("course-card");

    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
    `;

    courseContainer.appendChild(card);
    credits += course.credits;
  });

  totalCredits.textContent = `Total Credits: ${credits}`;
}

// Default load
renderCourses(courses);

// Event listeners for filter buttons
allBtn.addEventListener("click", () => renderCourses(courses));
wddBtn.addEventListener("click", () => renderCourses(courses.filter(c => c.type === "wdd")));
cseBtn.addEventListener("click", () => renderCourses(courses.filter(c => c.type === "cse")));
