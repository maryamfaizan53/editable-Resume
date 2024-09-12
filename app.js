var nameInput = document.getElementById('name');
var lastNameInput = document.getElementById('lastName');
var emailInput = document.getElementById('email');
var phoneInput = document.getElementById('phone');
var addressInput = document.getElementById('address');
var skillsInput = document.getElementById('skills');
var educationContainer = document.getElementById('education-container');
var experienceContainer = document.getElementById('experience-container');
var resumePreview = document.getElementById('resumePreview');
var addEducationBtn = document.getElementById('addEducationBtn');
var addExperienceBtn = document.getElementById('addExperienceBtn');
var generateBtn = document.getElementById('generateBtn');
var downloadBtn = document.getElementById('downloadBtn');
var editBtn = document.getElementById('editBtn');
// Event listeners for real-time preview update
[nameInput, lastNameInput, emailInput, phoneInput, addressInput, skillsInput].forEach(function (input) {
    input.addEventListener('input', updatePreview);
});
// Add dynamic Education section
addEducationBtn.addEventListener('click', function () {
    var educationDiv = document.createElement('div');
    educationDiv.innerHTML = "\n        <input type=\"text\" placeholder=\"Degree\">\n        <input type=\"text\" placeholder=\"Institution\">\n        <input type=\"text\" placeholder=\"Year\">\n    ";
    educationContainer.appendChild(educationDiv);
    updatePreview();
});
// Add dynamic Experience section
addExperienceBtn.addEventListener('click', function () {
    var experienceDiv = document.createElement('div');
    experienceDiv.innerHTML = "\n        <input type=\"text\" placeholder=\"Job Title\">\n        <input type=\"text\" placeholder=\"Company\">\n        <input type=\"text\" placeholder=\"Years\">\n    ";
    experienceContainer.appendChild(experienceDiv);
    updatePreview();
});
// Update preview in real-time
function updatePreview() {
    resumePreview.innerHTML = "\n        <h2>About</h2>\n        <p><strong>Name:</strong> ".concat(nameInput.value, " ").concat(lastNameInput.value, "</p>\n        <p><strong>Email:</strong> ").concat(emailInput.value, "</p>\n        <p><strong>Phone:</strong> ").concat(phoneInput.value, "</p>\n        <p><strong>Address:</strong> ").concat(addressInput.value, "</p>\n\n        <h2>Education</h2>\n        <div>").concat(educationContainer.innerHTML, "</div>\n\n        <h2>Skills</h2>\n        <p>").concat(skillsInput.value, "</p>\n\n        <h2>Experience</h2>\n        <div>").concat(experienceContainer.innerHTML, "</div>\n    ");
}
// Download as PDF
downloadBtn.addEventListener('click', function () {
    var opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumePreview).set(opt).save();
});
// Enable/Disable content editing
editBtn.addEventListener('click', function () {
    var isEditable = resumePreview.getAttribute('contenteditable') === 'true';
    resumePreview.setAttribute('contenteditable', String(!isEditable));
    editBtn.textContent = !isEditable ? 'Disable Edit' : 'Enable Edit';
});
// Generate resume (force update preview)
generateBtn.addEventListener('click', updatePreview);
