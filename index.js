const key = config.MY_KEY
const form = document.querySelector('.search-bar')
const searchBox = document.querySelector('.search-textbox')
const searchButton = document.querySelector('.search-button')
const searchResults = document.querySelector('.search-results')
const stillImages = document.querySelectorAll('.img')
const lightbox = document.querySelector('.lightbox')
const lightboxImg = document.querySelector('.lightbox img')
const lightboxInput = document.querySelector('.lightbox input')


// Submit form to start app
form.addEventListener('submit', (e) => {
    if(searchBox.value === '') {
        return
    } else {
        e.preventDefault()
        makeRequest()
        searchBox.value = ''
    }
}) 

// API Fetch
const makeRequest = async () => {
    const response =  await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${key}&q=${searchBox.value}`)
    const data = await response.json()
    console.log(data)
    const mappedData = data.data.map(item => ({
        still: item.images.downsized_still.url,
        gif: item.images.original.url   
    }))
    showGiphy(mappedData)
}

// Show Items in search results container
const showGiphy = (items) => {
    clearContainer()
    items.forEach(item => {
        const image = document.createElement('a')
        image.classList.add('gif-item')
        image.innerHTML = `
        <a href="${item.gif}">
            <img class="img" src="${item.still}" />
        </a>
        `
        searchResults.appendChild(image)
        showLightbox(image) // call showlightbox and pass in image 

    })
}

// Clear search results ontainer
const clearContainer = () => {
    searchResults.innerHTML = ''
}

// Show Lightbox on click, pass images from showGiphy function in as an argument in order to access those images
const showLightbox = (images) => {
    images.addEventListener('click', (e) => {
        e.preventDefault()
        const target = e.target
        if(target.tagName === 'IMG') {
            // alert(target.parentElement.href)
            document.body.classList.add('no-scroll')
            lightboxImg.src = target.parentElement.href
            lightboxInput.value = target.parentElement.href
            lightbox.classList.add('show')
        }
    })
}

// Close LightBox
lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) {
        document.body.classList.remove('no-scroll')
        lightbox.classList.remove('show')
        lightboxImg.src = ''
    }
})

