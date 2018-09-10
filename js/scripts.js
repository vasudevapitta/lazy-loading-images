const images = document.querySelectorAll('.js-lazy-image');
const config = {
	// if the image gets within 50px in the Y axis, start the download.
	rootMargin: '50px 0px',
	threshold: 0.01
};

if (!('IntersectionObserver' in window)) {
	// no support for intersection observer, load the images immediately
	Array.from(images).forEach(image => loadImage(image));
} else {

	// observer for the images on the page
	var observer = new IntersectionObserver(onIntersection, config);
	images.forEach(image => {
		observer.observe(image);
	});
}

function onIntersection(entries) {
	
	// loop through the entries
	entries.forEach(entry => {
		
		// are we in viewport?
		if (entry.intersectionRatio > 0) {

			// stop watching
			observer.unobserve(entry.target);
			
			// load image
			loadImage(entry.target);
		}
	});
}

function loadImage(e) {
	e.src = e.dataset.src;
	e.classList.add('fade-in');
}