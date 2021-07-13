const buildLightbox = () => {
	//Create element and add classes/id's
	const lightbox = document.createElement('div');
	lightbox.id = 'lightbox';
	const leftArrowWrapper = document.createElement('div');
	leftArrowWrapper.classList.add('lb-nav-wrapper', 'left');
	const rightArrowWrapper = document.createElement('div');
	rightArrowWrapper.classList.add('lb-nav-wrapper', 'right');
	const imgWrapper = document.createElement('div');
	imgWrapper.classList.add('image-wrapper');
	const infoWrapper = document.createElement('info');
	infoWrapper.classList.add('info-wrapper');
    const title = document.createElement('h4')
    title.classList.add('artwork-title')
    const medium = document.createElement('p')
    medium.classList.add('artwork-medium')
    const dimensions = document.createElement('p')
    dimensions.classList.add('artwork-dimensions')
    const year = document.createElement('p')
    year.classList.add('artwork-year')
    const description = document.createElement('p')
    description.classList.add('artwork-description')
	const leftArrow = document.createElement('i');
	leftArrow.classList.add('icon-left-open');
	const rightArrow = document.createElement('i');
	rightArrow.classList.add('fas', 'icon-right-open');
	const img = document.createElement('img');
	const fragment = new DocumentFragment();
	//Construct elements in fragment
	fragment.appendChild(lightbox);
	lightbox.appendChild(leftArrowWrapper);
	lightbox.appendChild(imgWrapper);
	imgWrapper.appendChild(img);
    imgWrapper.appendChild(infoWrapper);
    infoWrapper.appendChild(title);
    infoWrapper.appendChild(medium);
    infoWrapper.appendChild(dimensions);
    infoWrapper.appendChild(year);
    infoWrapper.appendChild(description);
	lightbox.appendChild(rightArrowWrapper);
	leftArrowWrapper.appendChild(leftArrow);
	rightArrowWrapper.appendChild(rightArrow);
	//Add Fragement to DOM
	document.body.prepend(fragment);
	//Set variables for items in the DOM to add listeners too
	const allImages = Array.from(document.querySelectorAll('.wp-block-image'))
	const galleryItems = allImages.filter(el => el.dataset.lightboxEnabled === "true")
	const arrows = document.getElementsByClassName('lb-nav-wrapper');
	//Declare image count
	let activeImgCount = null;

	function setLightboxInfo(el) {
		title.textContent = el.dataset.workTitle;
		medium.textContent = el.dataset.workMedium;
		dimensions.textContent = el.dataset.workDimensions;
		year.textContent = el.dataset.workDate;
		description.textContent = el.dataset.workDescription;
	}

	const setNewLbImage = (e) => {
		lightbox.classList.add('active');
        activeImgCount = galleryItems.indexOf(e.currentTarget);
		img.src = e.currentTarget.firstChild.src;
		setLightboxInfo(e.currentTarget)
		if (activeImgCount === 0) {
			leftArrowWrapper.classList.add('disabled');
		} else {
			leftArrowWrapper.classList.remove('disabled');
		};
		if (activeImgCount === galleryItems.length - 1) {
			rightArrowWrapper.classList.add('disabled');
		} else {
			rightArrowWrapper.classList.remove('disabled');
		};
	};

	const changeActiveImg = () => {
		const next = galleryItems[activeImgCount];
		img.src = next.firstChild.src;
		title.textContent = next.dataset.workTitle;
		if (activeImgCount === 0) {
			leftArrowWrapper.classList.add('disabled');
		} else {
			leftArrowWrapper.classList.remove('disabled');
		};
		if (activeImgCount === galleryItems.length - 1) {
			rightArrowWrapper.classList.add('disabled');
		} else {
			rightArrowWrapper.classList.remove('disabled');
		};
	};

	const navToNext = () => {
		activeImgCount += 1;
		changeActiveImg();
	};

	const navToPrev = () => {
		activeImgCount -= 1;
		changeActiveImg();
	};

	//Event Listener To Activate Lightbox
	galleryItems.forEach(image => {
		image.addEventListener('click', e => setNewLbImage(e));
	});
	//Event Listener For Arrows
	Array.from(arrows)[0].addEventListener('click', navToPrev);
	Array.from(arrows)[1].addEventListener('click', navToNext);
	document.addEventListener('keydown', e => {
		if (lightbox.classList.contains('active')) {
			if (e.key === 'ArrowLeft' && activeImgCount > 1) {
				navToPrev();
			} else if (e.key === 'ArrowRight' && activeImgCount < galleryItems.length) {
				navToNext();
			}
		}
	});
	//Event Listener To Disable Lightbox
	lightbox.addEventListener('click', e => {
		if (e.target !== e.currentTarget) return;
		lightbox.classList.remove('active');
		activeImgCount = null;
	});
};

document.addEventListener('DOMContentLoaded', () => {
	buildLightbox();
});