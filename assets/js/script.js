document.addEventListener("DOMContentLoaded", function () {

	const resizeMenuBtn = document.querySelector('.resize-menu');
	const htmlElement = document.querySelector("html");
	const headerNav = document.querySelector(".header__nav");
	const navLinks = document.querySelectorAll("nav a");

	resizeMenuBtn.addEventListener("click", () =>
		htmlElement.classList.toggle("open")
	);

	navLinks.forEach((link) => {
		link.addEventListener("click", () => {
		htmlElement.classList.remove("open");
		});
	});


	//гарний скрол по сторінці
	document.querySelectorAll('a[href^="#"').forEach(link => {

		link.addEventListener('click', function(e) {
			e.preventDefault();
	
			let href = this.getAttribute('href').substring(1);
	
			const scrollTarget = document.getElementById(href);
	
			const topOffset = document.querySelector('header').offsetHeight;
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
	
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
	});



}); //кінець DOMContentLoaded