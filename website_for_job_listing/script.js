$(document).ready(function () {
  
  // Fetching data from data.json using 
  $.getJSON("data.json", function (data) {
    console.log(data);
    renderJobList(data); // Calling renderJobList after fetching the data fron data.json
  });
  // Function to create a job card 
  function createJobCard(job) {
  
    var jobCard = $('<div>').addClass('job-card');
    
    jobCard.html(`
      <div class="grid">
        <table>
          <tr>
            <td>
            <a href="#" class="job-logo" data-id="${job.id}">
            <img src="${job.logo}" alt="Image not found" class="img-radius brand-img-size image-translation">
           </a>
            </td>
            <td >
              <div class="flex flex1 padding-left-10">
                <div class="company-text">${job.company}</div>
                <div class="horizontal-line">
                <div class="grid grid-position-tools-container">
                  <div class="grid-item-position job-position-text"><p>${job.position}</p></div>
                  <div class="grid grid-tools ">
                
                    ${job.tools.map(tool => `<div class="tools-lang-container">${tool}</div>`).join('')}
                    ${job.languages.map(lang => `<div class="tools-lang-container">${lang}</div>`).join('')}
                  
                  </div>
                </div>
                </div>
                <ul class="flex last-row">
                  <li>${job.postedAt} </li>
                  <li>${job.contract} </li>
                  <li>${job.location} </li>
                  <li><button id="delete-button" > Remove
                  </button><li>
                </ul>
              </div>
            </td>
          </tr>
        </table>
      </div>
      
  </div>
    `);
    return jobCard; // Returning the job card
  }

   // Function to render job listings
  function renderJobList(data) {
    var jobList = $('.job-list');
    jobList.empty();
    
    data.forEach(function (job) {
      var jobContainer = createJobCard(job); // Creating a container for each job
      jobList.append(jobContainer); // Appending the job container to the job listings container
    });
  }
//---------------------------------------------------------------------------------------
//Function to remove job
  $('.job-list').on('click', '#delete-button', function () {
    $(this).closest('.job-card').remove();       //Removes closest ancesstor
  });

//---------------------------------------------------------------------------------------
//Function to filter jobs
$('#role-filter').on('input', function () {
  // Geting the text entered in the input field
  var filterText = $(this).val().toLowerCase(); 

  // Iterate all job cards and hide/show the cards based on the entered filter text
  $('.job-card').each(function () {
    // Geting the role of the job card in lowercase
    var jobRole = $(this).find('.job-position-text p').text().toLowerCase(); 
    if (filterText === '' || jobRole.includes(filterText)) {
      $(this).show(); // Show the job card
    } else {
      $(this).hide(); // Hide the job card
    }
  });
});



});