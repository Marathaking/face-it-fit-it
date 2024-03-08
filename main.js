const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(
  ".header__content h4, .header__content .section__header",
  {
    ...scrollRevealOption,
    delay: 500,
  }
);

ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__card", {
  ...scrollRevealOption,
  delay: 1500,
  interval: 500,
});

// price container
ScrollReveal().reveal(".price__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
  slidesPerView: "auto",
  spaceBetween: 20,
});




document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var signupForm = document.getElementById('signupForm');

  // Add event listener for form submission
  signupForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      // Validate form inputs
      var firstName = document.querySelector('#signupForm input[name="firstName"]').value.trim();
      var lastName = document.querySelector('#signupForm input[name="lastName"]').value.trim();
      var email = document.getElementById('signupUsername').value.trim();
      var password = document.getElementById('signupPassword').value.trim();
      var agreeCheckbox = document.getElementById('checkBox');

      // Simple validation: Check if all fields are filled
      if (firstName === '' || lastName === '' || email === '' || password === '') {
          alert('Please fill in all fields');
          return;
      }

      // Check if the agree checkbox is checked
      if (!agreeCheckbox.checked) {
          alert('Please agree to the license');
          return;
      }

      // Prepare the request body
      var requestBody = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
      };

      // Make a POST request to the server
      fetch('https://face-it-fit-it-backend.onrender.com/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
      })
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to create user');
          }
      })
      .then(data => {
          alert(data.message); // Alert success message
          signupForm.reset(); // Clear form fields after successful submission
      })
      .catch(error => {
          alert('An error occurred: ' + error.message); // Alert error message
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the form element
  var loginForm = document.getElementById('loginForm');

  // Add event listener for form submission
  loginForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission

      // Validate form inputs
      var email = document.getElementById('loginUsername').value.trim();
      var password = document.getElementById('loginPassword').value.trim();
      var rememberCheckbox = document.getElementById('checkBox');

      // Simple validation: Check if email and password are filled
      if (email === '' || password === '') {
          alert('Please fill in all fields');
          return;
      }

      // Prepare the request body
      var requestBody = {
          email: email,
          password: password
      };

      // Make a POST request to the server
      fetch('https://face-it-fit-it-backend.onrender.com/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
      })
      .then(response => {
          if (response.ok) {
              //return response.json();
              console.log(response.body);
          } else {
              throw new Error('Failed to log in');
          }
      })
      .then(data => {
          // Handle successful login, for example, redirecting to a dashboard page
          alert('Login successful');
          // You can redirect the user to a dashboard or home page after successful login
          window.location.href = 'index.html';
      })
      .catch(error => {
          alert('Login failed: ' + error.message); // Alert error message
      });
  });
});
