const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
   event.preventDefault();
   const username = document.getElementById("username").value;
   const password = document.getElementById("password").value;

   // Validate the input
   if (!username || !password) {
       alert("Please enter both username and password.");
       return;
   }

   // Display the welcome message
   alert("Welcome, " + username + "!");
});

  function submitForm() {
    // You can add form validation and submission logic here
    alert('Form submitted successfully!');
  }


function validateForm() {
    var termsCheckbox = document.getElementById("termsCheckbox");

    if (!termsCheckbox.checked) {
        alert("Please agree to the Terms of Service and Privacy Policy.");
        return false; // Prevent form submission
    }

    // Additional validation logic can be added here

    // If everything is valid, allow form submission
    return true;
}



// ABOUT US
  document.addEventListener('DOMContentLoaded', function () {
    // Get the "About Us" link
    var aboutUsLink = document.querySelector('a[href="#aboutUs"]');

    // Scroll smoothly to the "About Us" section when the link is clicked
    aboutUsLink.addEventListener('click', function (e) {
      e.preventDefault();

      // Get the target element (the "About Us" section)
      var targetSection = document.getElementById('aboutUs');

      // Scroll to the calculated position with a smooth effect
      window.scrollTo
      ({
      top: targetPosition,
      behavior: 'smooth'   
    });
  });
  })

//Candidates
//function openPreviewModal() {
  // Add logic to show preview modal (if needed)
 // alert('Opening preview modal');//
// } //


  function logout() {
    // Add your logout logic here
    alert('Logout logic goes here.');
  }
  

//PREVIEW VOTE
function submitVote() {
  const selectedOption = document.querySelector('input[name="voteOption"]:checked');

  if (selectedOption) {
    // Add any additional logic for submitting the vote

    // For demonstration purposes, showing an alert with the selected option
    alert(`You voted for ${selectedOption.value}. Thank you for voting!`);
  } else {
    alert('Please select an option before submitting your vote.');
  }
}

function logout() {
  // Add your logout logic here
  alert('Logout logic goes here.');
}


  function previewVote() {
    // Get the selected option
    var selectedOption = document.querySelector('input[name="voteOption"]:checked');

    // Check if an option is selected
    if (selectedOption) {
      // Redirect to the preview page with the selected option as a query parameter
      window.location.href = 'preview.html?selectedOption=' + selectedOption.value;
    } else {
      alert('Please select an option before previewing your vote.');
    }
  
  document.addEventListener('DOMContentLoaded', function () {
    // Get the selected option from the query parameter
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var selectedOption = urlParams.get('selectedOption');

    // Display the selected option on the preview page
    if (selectedOption) {
      document.getElementById('previewOption').innerText = 'You have selected: ' + selectedOption;
    } else {
      document.getElementById('previewOption').innerText = 'No option selected.';
    }
  });

}   
document.addEventListener("DOMContentLoaded", function () {
  var headerLinks = document.querySelectorAll('header a');
  
  headerLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
          e.preventDefault();

          var targetId = this.getAttribute('href').substring(1);
          var targetElement = document.getElementById(targetId);

          window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
          });
      });
  });
});