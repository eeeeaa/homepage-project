main();

async function main() {
  const data = await fetch("./assets/rawdata/projects.json");
  const jsonData = await data.json();
  populateInfoTopSection(jsonData);
  populateWorkList(jsonData);
  populateInfoBottomSection(jsonData);
}

function populateInfoTopSection(jsonData) {
  const myName = document.querySelector(".profile-name");
  const aboutMe = document.querySelector(".about-me-description");
  const profileImg = document.querySelector(".profile-image");

  profileImg.src = jsonData.information.profileImage;
  myName.textContent = jsonData.information.name;
  aboutMe.textContent = jsonData.information.aboutme;
}

function populateInfoBottomSection(jsonData) {
  const address = document.querySelector(".contact-info-address");
  const phone = document.querySelector(".contact-info-phone-number");
  const email = document.querySelector(".contact-info-email");

  address.textContent = jsonData.information.address;
  phone.textContent = jsonData.information.phonenumber;
  email.textContent = jsonData.information.email;
}

function populateWorkList(jsonData) {
  const listElement = document.querySelector(".portfolio-list");

  for (let project of jsonData.projects) {
    listElement.appendChild(
      createCard({
        projectImage: project.projectImage,
        projectName: project.projectName,
        githubLink: project.githubLink,
        otherLink: project.otherLink,
        projectDescription: project.projectDescription,
      })
    );
  }
}

function createCard({
  projectImage,
  projectName,
  githubLink,
  otherLink,
  projectDescription,
}) {
  const container = document.createElement("div");
  container.classList.toggle("work-card");

  const coverImg = document.createElement("img");
  coverImg.classList.toggle("work-image");
  coverImg.src = projectImage;
  coverImg.alt = "placeholder work image";

  const header = createWorkCardHeader({ projectName, githubLink, otherLink });

  const description = document.createElement("div");
  description.classList.toggle("work-description");
  description.textContent = projectDescription;

  container.append(coverImg, header, description);
  return container;
}

function createWorkCardHeader({ projectName, githubLink, otherLink }) {
  const header = document.createElement("div");
  header.classList.toggle("work-card-header");

  const workName = document.createElement("h1");
  workName.classList.toggle("work-name");
  workName.textContent = projectName;

  const linkSection = document.createElement("div");
  linkSection.classList.toggle("link-section");
  const linkList = document.createElement("ul");
  linkList.classList.toggle("link-list");
  linkList.classList.toggle("small-icon");

  const linkGitContainer = document.createElement("li");
  const linkGit = document.createElement("a");
  linkGit.href = githubLink;
  linkGit.classList.toggle("devicon-github-original");
  linkGit.classList.toggle("small-icon");
  linkGitContainer.appendChild(linkGit);

  const linkOtherContainer = document.createElement("li");

  const linkOther = document.createElement("a");
  linkOther.href = otherLink;

  const linkOtherIcon = document.createElement("img");
  linkOtherIcon.style.width = "18px";
  linkOtherIcon.style.height = "18px";
  linkOtherIcon.src = "./assets/icon/open-in-new.svg";
  linkOtherIcon.alt = "open project link";

  linkOther.appendChild(linkOtherIcon);
  linkOtherContainer.appendChild(linkOther);

  linkList.append(linkGitContainer, linkOtherContainer);

  linkSection.append(linkList);

  header.append(workName, linkSection);

  return header;
}
