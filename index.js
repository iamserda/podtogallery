/* 
    2. 
       Write a function to create the my-photos Component
       
       Create a Column Flexbox container around my-photos
       
       Create a new img and place it, centered, above my-photos
        -This should be hidden initially
        -Also give it the my-photo class
    
       Create a "click" event for each photo in my-photos
        -When clicked, load the clicked photo into the new img tag
*/
function createHeader() {
    const h1 = document.createElement('h1');
    h1.innerText = 'Podto.app'
    document.body.prepend(h1);
    const photoDisplay = document.getElementById('photoDisplay')
    const displayH1 = h1.cloneNode(true);
    photoDisplay.appendChild(displayH1);
}

function createApp() {
    const appContainer = document.createElement('div')
    const photoDisplay = document.createElement('div')
    const photoGrid = document.createElement('div')

    // app container setup.
    appContainer.classList.add('app', 'container')
    appContainer.id = 'app'

    // photoDisplay
    photoDisplay.classList.add('display', 'container')
    photoDisplay.id = 'photoDisplay'
    photoGrid.classList.add('grid', 'container')
    photoGrid.id = 'photoGrid';
    // app >> display + grid
    appContainer.appendChild(photoDisplay);
    appContainer.appendChild(photoGrid);
    document.body.appendChild(appContainer);
}

function displayImage(src, alt) {
    const photoDisplay = document.getElementById('photoDisplay');
    photoDisplay.innerHTML = ""
    const img = document.createElement('img')
    img.src = src;
    img.alt = alt;
    photoDisplay.appendChild(img)
}

async function fetchProcess() {
    const responsePhotosJSON = await fetch('photos.json');
    const data = await responsePhotosJSON.json();
    const photoGrid = document.getElementById('photoGrid')
    data.forEach(
        photo => {
            const {
                id,
                title
            } = photo;
            // console.log(id, title)

            const img = document.createElement('img');
            img.classList.add('my-photo');
            img.src = `https://picsum.photos/id/${id}/500`;
            img.alt = `${title}`;
            photoGrid.appendChild(img);

            img.addEventListener('click', () => {
                console.log(img.src, img.alt)
                displayImage(img.src, img.alt)
            })

        }
    )

}

(
    function () {
        createApp();

        fetchProcess();
        createHeader();
    } // end of async.func
)();