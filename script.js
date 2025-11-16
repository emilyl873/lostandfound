let loggedInUser = "";
let loggedInEmail = "";

// Sections to hide until login
const sectionsToHide = ["formSection", "listSection", "claimed", "question", "reportSection"];
sectionsToHide.forEach(id => {
  const el = document.getElementById(id);
  if (el) el.style.display = "none";
});

// Main buttons hidden until login
const buttonContainer = document.querySelector(".button-container");
if (buttonContainer) buttonContainer.style.display = "none";

// Login Form
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("loginName").value.trim();
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();

  if (!name || !email) {
    alert("Please enter both your full name and school email.");
    return;
  }

  // Only HCPSS emails allowed
  const hcpssPattern = /^[a-zA-Z0-9._%+-]+@inst\.hcpss\.org$/;
  if (!hcpssPattern.test(email)) {
    alert("Please enter a valid HCPSS email ending with @inst.hcpss.org.");
    return;
  }

  // Store login info
  loggedInUser = name;
  loggedInEmail = email;

  // Remove login section
  const loginSection = document.getElementById("loginSection");
  if (loginSection) loginSection.remove();

  // Show main sections
  sectionsToHide.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "";
  });

  // Show main buttons
  if (buttonContainer) buttonContainer.style.display = "flex";

  // Show welcome text in top-right
  const loginContainer = document.querySelector(".login-container");
  if (loginContainer) {
    loginContainer.innerHTML = `<span class="welcome-text">Welcome, <strong>${loggedInUser}</strong>!</span>`;
  }
});

// Scroll to sections
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.remove("hidden");
    section.scrollIntoView({ behavior: "smooth" });
  }
}

document.getElementById("formBtn").onclick = () => scrollToSection("formSection");
document.getElementById("listBtn").onclick = () => scrollToSection("listSection");
document.getElementById("claimBtn").onclick = () => scrollToSection("claimed");
document.getElementById("inquiryBtn").onclick = () => scrollToSection("question");
document.getElementById("reportBtn").onclick = () => scrollToSection("reportSection");

// Lost & Found form
const lostForm = document.getElementById("lostForm");
const itemsList = document.getElementById("itemList");
const claimeditemList = document.getElementById("claimeditemList");

lostForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!loggedInUser) {
    alert("Please log in first.");
    return;
  }

  const dateFound = document.getElementById("found").value;
  const itemType = document.getElementById("item").value;
  const itemColor = document.getElementById("filtercolor").value;
  const whereFound = document.getElementById("place").value;
  const fileInput = document.getElementById("uploadimage");
   const dateFoundInput = document.getElementById("found").value;
const [year, month, day] = dateFoundInput.split("-");
 const changeddate = [month, day, year].join("/");
  
  const li = document.createElement("li");

  const stuffDiv = document.createElement("div");
  stuffDiv.innerHTML = `
    <strong>Date Found:</strong> ${changeddate}<br>
    <strong>Item Type:</strong> ${itemType}<br>
    <strong>Item Color:</strong> ${itemColor}<br>
    <strong>Where Item Was Found:</strong> ${whereFound}<br>
  `;
  li.appendChild(stuffDiv);
  
  for (let i = 0; i < fileInput.files.length; i++) {
    const file = fileInput.files[i];
    const img = document.createElement("img");
    img.src = URL.createObjectURL(file);
    img.alt = `${itemColor} ${itemType} found at ${whereFound}`;

    li.appendChild(img);
  }

 // Claim button
const claimBtn = document.createElement("button");
claimBtn.textContent = "Claim";
claimBtn.classList.add("claimBtn");

// Delete button
const deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.classList.add("claimBtn");

// Spacing
const button = document.createElement("div");
button.style.display = "flex";
button.style.gap = "10px";

button.appendChild(claimBtn);
button.appendChild(deleteBtn);
li.appendChild(button);

// Delete functionality
deleteBtn.addEventListener("click", () => {
    li.remove();
});

// Claim functionality
claimBtn.addEventListener("click", () => { 
claimeditemList.appendChild(li);
    button.removeChild(claimBtn); 
  alert("You have claimed the item!");          
     const name =
 document.createElement("span");
  name.innerHTML = "<strong>Claimed By: </strong> " + loggedInUser
  li.insertBefore(name, stuffDiv);

    const unclaimBtn = document.createElement("button");
    unclaimBtn.textContent = "Unclaim";
    unclaimBtn.classList.add("claimBtn");
    button.insertBefore(unclaimBtn, deleteBtn); 

    unclaimBtn.addEventListener("click", () => {
        itemsList.appendChild(li);
        button.removeChild(unclaimBtn);
      alert("You have unclaimed the item.")
      li.removeChild(name);
        button.insertBefore(claimBtn, deleteBtn);
    });
});


  itemsList.appendChild(li);
  alert("Lost item has been submitted successfully!");
  lostForm.reset();
});

// Filters
const itemFilter = document.getElementById("type");
const colorFilter = document.getElementById("color");
const placeFilter = document.getElementById("location");
[itemFilter, colorFilter, placeFilter].forEach(filter => {
  filter.addEventListener("change", () => {
    const itemVal = itemFilter.value;
    const colorVal = colorFilter.value;
    const placeVal = placeFilter.value;

    Array.from(itemsList.children).forEach(li => {
      const matchesItem = itemVal === "Select Item Type" || li.innerHTML.includes(itemVal);
      const matchesColor = colorVal === "Select Color" || li.innerHTML.includes(colorVal);
      const matchesPlace = placeVal === "Select Location" || li.innerHTML.includes(placeVal);
      li.style.display = (matchesItem && matchesColor && matchesPlace) ? "" : "none";
    });
  });
});

const claimedItemFilter = document.getElementById("filteritem");
const claimedColorFilter = document.getElementById("colorfilter");
const claimedPlaceFilter = document.getElementById("filterlocation");
[claimedItemFilter, claimedColorFilter, claimedPlaceFilter].forEach(filter => {
  filter.addEventListener("change", () => {
    const itemVal = claimedItemFilter.value;
    const colorVal = claimedColorFilter.value;
    const placeVal = claimedPlaceFilter.value;

    Array.from(claimeditemList.children).forEach(li => {
      const matchesItem = itemVal === "Select Item Type" || li.innerHTML.includes(itemVal);
      const matchesColor = colorVal === "Select Color" || li.innerHTML.includes(colorVal);
      const matchesPlace = placeVal === "Select Location" || li.innerHTML.includes(placeVal);
      li.style.display = (matchesItem && matchesColor && matchesPlace) ? "" : "none";
    });
  });
});

// Back to top
document.querySelectorAll(".backtotop").forEach(btn => {
  btn.addEventListener("click", () => window.scrollTo({top: 0, behavior: "auto"}));
});

// Questions & Replies
const questionForm = document.getElementById("questionForm");
const listOfQuestions = document.getElementById("listofquestions");

questionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const questionText = document.getElementById("questions").value.trim();
  if (!questionText) {
    alert("Please enter a question.");
    return;
  }

  // Get the person who is logged in at the top
  const loginSpan = document.querySelector(".login-container .welcome-text strong");
  if (!loginSpan) {
    alert("Please log in at the top to submit a question.");
    return;
  }
  const questionAuthor = loginSpan.textContent;

  // Create question box
  const questionBox = document.createElement("div");
  questionBox.classList.add("question-box");
  questionBox.dataset.author = questionAuthor;

  // Question header with delete icon
  const questionHeader = document.createElement("div");
  questionHeader.style.display = "flex";
  questionHeader.style.justifyContent = "space-between";
  questionHeader.style.alignItems = "center";

  const qPara = document.createElement("p");
  qPara.innerHTML = `<strong>${questionAuthor}:</strong> ${questionText}`;

  const delQ = document.createElement("span");
  delQ.textContent = "Delete 🗑️";
  delQ.classList.add("delete-btn");
  delQ.style.cursor = "pointer";

  // Delete only if logged-in user matches
  delQ.addEventListener("click", () => {
    const currentUser = document.querySelector(".login-container .welcome-text strong")?.textContent;
    if (currentUser === questionBox.dataset.author) {
      questionBox.remove();
    } else {
      alert("You can only delete your own question.");
    }
  });

  questionHeader.appendChild(qPara);
  questionHeader.appendChild(delQ);
  questionBox.appendChild(questionHeader);

  // Replies label
  const repliesLabel = document.createElement("p");
  repliesLabel.classList.add("replies-label");
  repliesLabel.textContent = "Replies:";
  questionBox.appendChild(repliesLabel);

  // Replies container
  const repliesDiv = document.createElement("div");
  repliesDiv.classList.add("replies");
  questionBox.appendChild(repliesDiv);

  // Reply input and button
  const replyInput = document.createElement("input");
  replyInput.type = "text";
  replyInput.placeholder = "Type your reply";
  replyInput.classList.add("reply-input");
  questionBox.appendChild(replyInput);

  const replyBtn = document.createElement("button");
  replyBtn.type = "button";
  replyBtn.textContent = "Reply";
  replyBtn.classList.add("reply-btn");
  questionBox.appendChild(replyBtn);

  // Handle reply button click
  replyBtn.addEventListener("click", () => {
    const replyText = replyInput.value.trim();
    const currentUser = document.querySelector(".login-container .welcome-text strong")?.textContent;
    if (!currentUser) {
      alert("Please log in at the top to reply.");
      return;
    }
    if (!replyText) return;

    // Create reply element
    const replyEl = document.createElement("div");
    replyEl.style.display = "flex";
    replyEl.style.justifyContent = "space-between";
    replyEl.style.alignItems = "center";
    replyEl.dataset.author = currentUser;

    const p = document.createElement("p");
    p.innerHTML = `<strong>${currentUser}:</strong> ${replyText}`;
    p.classList.add("reply-text");

    const delR = document.createElement("span");
    delR.textContent = "Delete 🗑️";
    delR.classList.add("delete-btn");
    delR.style.cursor = "pointer";

    delR.addEventListener("click", () => {
      const loggedUser = document.querySelector(".login-container .welcome-text strong")?.textContent;
      if (loggedUser === replyEl.dataset.author) {
        replyEl.remove();
      } else {
        alert("You can only delete your own reply.");
      }
    });

    replyEl.appendChild(p);
    replyEl.appendChild(delR);
    repliesDiv.appendChild(replyEl);
    alert("Reply Submitted!");
    replyInput.value = "";
  });

 listOfQuestions.appendChild(questionBox);
 alert("Question Submitted!");
  questionForm.reset();
});

/*REPORT*/
const reportForm = document.getElementById("reportForm");
const listOfReports = document.getElementById("listofreports");

reportForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const item = document.getElementById("theitem").value.trim();
  const reason = document.getElementById("reason").value.trim();
  const belong = document.getElementById("belong").value.trim();

  if (!item || !reason || !belong) {
    alert("Please fill out all fields before submitting your report.");
    return;
  }

  // Create report box
  const reportBox = document.createElement("div");
  reportBox.classList.add("question-box");

  // Report text
  const reportDetails = document.createElement("p");
  reportDetails.style.marginBottom = "4px";
  reportDetails.innerHTML = `
    <strong>Reported Item:</strong> ${item}<br>
    <strong>Reason:</strong> ${reason}<br>
    <strong>Actual Owner:</strong> ${belong}
  `;
  reportBox.appendChild(reportDetails);

  // Smaller delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("claimBtn");
  deleteBtn.style.fontSize = "12px";    
  deleteBtn.style.padding = "4px 9px";  
  deleteBtn.style.marginTop = "2";    

  // Delete function
  deleteBtn.addEventListener("click", () => {
    reportBox.remove();
  });

  // Add delete button right under text
  reportBox.appendChild(deleteBtn);

  // Add to list
  listOfReports.appendChild(reportBox);
alert("Report Submitted.");
  reportForm.reset();
});
