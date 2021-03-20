// creating and adding an h1 nodeElement.
function createHeader() {
  const h1 = document.createElement("h1");
  h1.innerText = "Podto.app";
  document.body.prepend(h1);
  const photoDisplay = document.getElementById("photoDisplay");
  photoDisplay.appendChild(h1.cloneNode(true));
}
// creating the app, the actual photo display area, and the grid of 9 photos.
function createApp() {
  const appContainer = document.createElement("div");
  const photoDisplay = document.createElement("div");
  const photoGrid = document.createElement("div");

  // app container setup.
  appContainer.classList.add("app", "container");
  appContainer.id = "app";

  // photoDisplay
  photoDisplay.classList.add("display", "container");
  photoDisplay.id = "photoDisplay";
  photoGrid.classList.add("grid", "container");
  photoGrid.id = "photoGrid";

  // app >> display + grid
  appContainer.appendChild(photoDisplay);
  appContainer.appendChild(photoGrid);
  document.body.appendChild(appContainer);
}

// receives an image src, alt text, and displays the image.
function displayImage(src, alt) {
  const photoDisplay = document.getElementById("photoDisplay");
  photoDisplay.innerHTML = "";
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  photoDisplay.appendChild(img);
}

// get data from API or in this case photos.json
// the api randomly returns no pictures
// for now, I have selected to show case specific pictures.
// A single update to this function **URL** reconnects to the picSUM API.
async function fetchProcess() {
  const responsePhotosJSON = await fetch("photos.json");
  const data = await responsePhotosJSON.json();
  const photoGrid = document.getElementById("photoGrid");
  data.forEach((photo) => {
    const { id, title } = photo;
    // console.log(id, title)

    const img = document.createElement("img");
    img.classList.add("my-photo");
    img.src = `https://picsum.photos/id/${ id }/500`;
    img.alt = `${ title }`;
    photoGrid.appendChild(img);

    img.addEventListener("click", () => {
      console.log(img.src, img.alt);
      displayImage(img.src, img.alt);
    });
  });
}

// this is IIFE and I find them extremely useful
// in a development setting.
(function () {
  createApp();
  fetchProcess();
  createHeader();
})(); // end of async.func
