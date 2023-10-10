document.addEventListener('DOMContentLoaded', function () {
    const jobForm = document.getElementById('job-form');

    jobForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Avoiding the normal submission

        //Storing all the data from job fields 
        const newJobData = {
            id: document.getElementById('ID').value,
            company: document.getElementById('company').value,
            logo: document.getElementById('logo').value,
            new: document.getElementById('new').checked,
            featured: document.getElementById('featured').checked,
            position: document.getElementById('position').value,
            role: document.getElementById('role').value,
            level: document.getElementById('level').value,
            postedAt: document.getElementById('postedAt').value,
            contract: document.getElementById('contract').value,
            location: document.getElementById('location').value,
            languages: getCheckedCheckboxes('languages'),
            tools: getCheckedCheckboxes('tools')
        };

        // Reading the existing data from 'data.json' file 
        fetch('data.json')
            .then(response => response.json())
            .then(existingData => {
                // Appending the new data to the existing data
                existingData.push(newJobData);

                // Converting the data to JSON
                const updatedDataJson = JSON.stringify(existingData, null, 2);

                // Writing the updated JSON data back to 'data.json'
                const blob = new Blob([updatedDataJson], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);

                // Creating link to download
                const a = document.createElement('a');
                a.href = url;
                a.download = 'data.json';
                document.body.appendChild(a);
                a.click();

                alert("Relpace the 'data.json' file of the project with the 'data.json' file in downloads")
                // Cleaning up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            })
            .catch(error => {
                console.error('Error in reading existing data:', error);
            });
    });
    //Function to get the checked boxes in an array
    function getCheckedCheckboxes(name) {
        const checkboxes = document.querySelectorAll(`input[name=${name}]:checked`);
        const values = Array.from(checkboxes).map(checkbox => checkbox.value);
        return values;
      }
});