
// Initial ramen data
const ramens = [
  {
      id: 1,
      name: "Shoyu Ramen",
      restaurant: "Ichiran",
      image: "https://i.pinimg.com/736x/28/81/bc/2881bc8ee24701966f5cb2268c86a578.jpg",
      rating: 5,
      comment: "Delicious!",
  },
  {
      id: 2,
      name: "Miso Ramen",
      restaurant: "Menya",
      image: "https://i.pinimg.com/736x/8c/02/4e/8c024e17dad1ca6fb322542a6cb0f630.jpg",
      rating: 4,
      comment: "Very flavorful!",
  },
  {
      id: 3,
      name: "Tonkotsu Ramen",
      restaurant: "Ramen-ya",
      image: "https://i.pinimg.com/236x/ad/9d/42/ad9d42112b99724dfd8b92c7858c8acd.jpg",
      rating: 3,
      comment: "Rich broth!",
  },
];

// Start everything when the page loads
document.addEventListener("DOMContentLoaded", main);

function main() {
  displayRamens();
  addSubmitListener();
  setupEditAndDelete();
  if (ramens.length) handleClick(ramens[0]);
}

// Show all ramen thumbnails
function displayRamens() {
  const menu = document.getElementById("ramen-menu");
  menu.innerHTML = "";
  ramens.forEach((ramen) => {
      const img = document.createElement("img");
      img.src = ramen.image || "https://via.placeholder.com/150";
      img.alt = ramen.name || "Unknown Ramen";
      img.addEventListener("click", () => handleClick(ramen));
      menu.appendChild(img);
  });
}

// Update the detail section when a ramen is clicked
function handleClick(ramen) {
  const detailImg = document.querySelector("#ramen-detail img");
  const name = document.getElementById("ramen-name");
  const restaurant = document.getElementById("ramen-restaurant");
  const rating = document.getElementById("ramen-rating");
  const comment = document.getElementById("ramen-comment");

  detailImg.src = ramen.image || "https://via.placeholder.com/300";
  detailImg.alt = ramen.name || "Mysterious Ramen";
  name.textContent = ramen.name || "Unnamed Ramen";
  restaurant.textContent = ramen.restaurant || "Unknown Spot";
  rating.textContent = ramen.rating ? ${ramen.rating}/10 : "N/A";
  comment.textContent = ramen.comment || "No thoughts yet!";
}

// Handle form submission to add new ramen
function addSubmitListener() {
  const form = document.getElementById("new-ramen-form");
  form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("new-ramen-name").value;
      const restaurant = document.getElementById("new-ramen-restaurant").value;
      const image = document.getElementById("new-ramen-image").value;
      const rating = parseInt(document.getElementById("new-ramen-rating").value);
      const comment = document.getElementById("new-ramen-comment").value;

  if (isNaN(rating) || rating < 0 || rating > 10) {
      alert("Rating must be between 0 and 10!");
      return;
  }

  const newRamen = {
      id: ramens.length + 1,
      name,
      restaurant,
      image,
      rating,
      comment,
  };

  ramens.push(newRamen);
  displayRamens();
  form.reset();
  });
}

// Set up the delete button functionality
function setupEditAndDelete() {
  const deleteRamen = document.getElementById("delete-ramen");
  deleteRamen.addEventListener("click", () => {
      const ramenName = document.getElementById("ramen-name").textContent;
      const index = ramens.findIndex(r => r.name === ramenName);
      if (index !== -1) {
          ramens.splice(index, 1);
          displayRamens();
          if (ramens.length) {
              handleClick(ramens[0]);
          } else {
              handleClick({
                  image: "https://via.placeholder.com/300",
                  name: "No Ramen",
                  restaurant: "N/A",
                  rating: "N/A",
                  comment: "No comments"
              });
          }
      }
  });
}

