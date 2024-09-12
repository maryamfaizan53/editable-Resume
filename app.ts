// DOM Elements
declare const html2pdf: any;
const nameInput = document.getElementById('name') as HTMLInputElement;
const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const addressInput = document.getElementById('address') as HTMLInputElement;
const skillsInput = document.getElementById('skills') as HTMLInputElement;
const educationContainer = document.getElementById('education-container') as HTMLDivElement;
const experienceContainer = document.getElementById('experience-container') as HTMLDivElement;
const resumePreview = document.getElementById('resumePreview') as HTMLDivElement;
const addEducationBtn = document.getElementById('addEducationBtn') as HTMLButtonElement;
const addExperienceBtn = document.getElementById('addExperienceBtn') as HTMLButtonElement;
const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement;
const downloadBtn = document.getElementById('downloadBtn') as HTMLButtonElement;
const editBtn = document.getElementById('editBtn') as HTMLButtonElement;

// Event listeners for real-time preview update
[nameInput, lastNameInput, emailInput, phoneInput, addressInput, skillsInput].forEach(input => {
    input.addEventListener('input', updatePreview);
});

// Add dynamic Education section
addEducationBtn.addEventListener('click', () => {
    const educationDiv = document.createElement('div');
    educationDiv.innerHTML = `
        <input type="text" placeholder="Degree">
        <input type="text" placeholder="Institution">
        <input type="text" placeholder="Year">
    `;
    educationContainer.appendChild(educationDiv);
    updatePreview();
});

// Add dynamic Experience section
addExperienceBtn.addEventListener('click', () => {
    const experienceDiv = document.createElement('div');
    experienceDiv.innerHTML = `
        <input type="text" placeholder="Job Title">
        <input type="text" placeholder="Company">
        <input type="text" placeholder="Years">
    `;
    experienceContainer.appendChild(experienceDiv);
    updatePreview();
});

// Update preview in real-time
function updatePreview(): void {
    resumePreview.innerHTML = `
        <h2>About</h2>
        <p><strong>Name:</strong> ${nameInput.value} ${lastNameInput.value}</p>
        <p><strong>Email:</strong> ${emailInput.value}</p>
        <p><strong>Phone:</strong> ${phoneInput.value}</p>
        <p><strong>Address:</strong> ${addressInput.value}</p>

        <h2>Education</h2>
        <div>${educationContainer.innerHTML}</div>

        <h2>Skills</h2>
        <p>${skillsInput.value}</p>

        <h2>Experience</h2>
        <div>${experienceContainer.innerHTML}</div>
    `;
}

// Download as PDF
downloadBtn.addEventListener('click', () => {
    const opt = {
        margin:       0.5,
        filename:     'resume.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(resumePreview).set(opt).save();
});

// Enable/Disable content editing
editBtn.addEventListener('click', () => {
    const isEditable = resumePreview.getAttribute('contenteditable') === 'true';
    resumePreview.setAttribute('contenteditable', String(!isEditable));
    editBtn.textContent = !isEditable ? 'Disable Edit' : 'Enable Edit';
});

// Generate resume (force update preview)
generateBtn.addEventListener('click', updatePreview);


  
  
