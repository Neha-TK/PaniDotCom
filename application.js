document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const jobTitle = document.getElementById('jobTitle').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const references = document.getElementById('references').value;
    const imageUpload = document.getElementById('imageUpload').files[0];
    
    const outputDiv = document.getElementById('resume-output');
    outputDiv.classList.remove('hidden');

    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;
        outputDiv.innerHTML = `
            <div class="resume-header">
                <h2>${name}</h2>
                <img src="${imgSrc}" alt="Uploaded Image" class="img-fluid">
                <h3>${jobTitle}</h3>
            </div>
            <div class="resume-section">
                <h4>Experience:</h4>
                <p>${experience}</p>
            </div>
            <div class="resume-section">
                <h4>Skills:</h4>
                <p>${skills}</p>
            </div>
            <div class="resume-section">
                <h4>References:</h4>
                <p>${references}</p>
            </div>
        `;
    };
    
    if (imageUpload) {
        reader.readAsDataURL(imageUpload);
    } else {
        outputDiv.innerHTML = `
            <div class="resume-header">
                <h2>${name}</h2>
                <h3>${jobTitle}</h3>
            </div>
            <div class="resume-section">
                <h4>Experience:</h4>
                <p>${experience}</p>
            </div>
            <div class="resume-section">
                <h4>Skills:</h4>
                <p>${skills}</p>
            </div>
            <div class="resume-section">
                <h4>References:</h4>
                <p>${references}</p>
            </div>
        `;
    }
    
    document.getElementById('download-btn').classList.remove('hidden');
});

// Function to download the resume as a PDF
document.getElementById('download-btn').addEventListener('click', function() {
    const resumeContent = document.getElementById('resume-output').innerHTML;
    const pdfWindow = window.open('', '_blank');
    pdfWindow.document.write(`
        <html>
        <head>
            <title>Resume</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .resume-header h2 { color: #5c67f2; }
                img { max-width: 100px; margin-bottom: 20px; }
                .resume-section h4 { margin-bottom: 5px; color: #5c67f2; }
            </style>
        </head>
        <body>
            ${resumeContent}
        </body>
        </html>
    `);
    pdfWindow.document.close();
    pdfWindow.print();
});

// Clear all fields and output
document.getElementById('clear-btn').addEventListener('click', function() {
    document.getElementById('resume-form').reset();
    document.getElementById('resume-output').innerHTML = '';
    document.getElementById('resume-output').classList.add('hidden');
    document.getElementById('download-btn').classList.add('hidden');
});
