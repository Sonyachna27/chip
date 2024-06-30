document.addEventListener("DOMContentLoaded", function () {

	const resizeMenuBtn = document.querySelector('.resize-menu');
	const htmlElement = document.querySelector("html");
	const headerNav = document.querySelector(".header__nav");
	const navLinks = document.querySelectorAll("nav a");
	const headerTop = document.querySelector(".header__top");
	const headerBottom = document.querySelector(".header__bottom");
	const headerMobMenu = document.querySelector('.header__mob-menu');
	resizeMenuBtn.addEventListener("click", () => {
		htmlElement.classList.toggle("open");
		// висота хедера для встановлення відступу мобільного на кожен клік вимірюємо аби не ставити наглядач

		const headerTopHeight = headerTop.offsetHeight;
		const headerBottomHeight = headerBottom.offsetHeight;
		headerMobMenu.style.top = headerTopHeight + headerBottomHeight + `px`;
		headerMobMenu.style.height = `calc(100vh - (${headerTopHeight}px + ${headerBottomHeight}px)`;
	});

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