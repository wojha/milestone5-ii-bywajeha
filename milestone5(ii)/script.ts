document
.getElementById("resumeform")
?.addEventListener("submit", function(event) {
    event.preventDefault();

 //type assertion
const  profilePictureInput = document.getElementById(
  "profilePicture"
) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLAreaElement;


    if (
       profilePictureInput && 
      nameElement && 
      emailElement && 
      phoneElement &&
       educationElement && 
       experienceElement && 
       skillsElement 
  ) {
      
    
      
        const name = nameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.nodeValue;
        const experience = experienceElement.nodeValue;
        const skills = skillsElement.nodeValue;

      //picture element 
const profilePictureFile = profilePictureInput.files?.[0];
const profilePictureURL = profilePictureFile
 ? URL.createObjectURL(profilePictureFile)
  : "";

   
  const resumeHTML = `
          <h2>Resume</h2>
         ${
           profilePictureURL 
             ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` 
             : ""
            }
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <h3>Education</h3>
    <p>${education}</p>
    <h3>Experience</h3>
    <p>${experience}</p>
    <h3>Skills</h3>
    <p>${skills}</p>
      `;
      
 






      //display the resume in the output container 
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        // container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        //add download pdf button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
          window.print(); //open the print dialog, allowing the user to save as pdf.
        });
        buttonsContainer.appendChild(downloadButton);

        //add shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link"; 
        shareLinkButton.addEventListener("click", async () => {
          try {
            //create a unique shareable link (simulate it in this case)
            const shareableLink = `https:yourdomain.com/resumes/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;

            //use clipboard API to copy the shareable link
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copies to clipboard!");
          } catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard. Please try again.");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Form elements are missing");
    }
  });
