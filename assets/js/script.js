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


	// tabs На головній 

	const targetList = document.querySelector('.target__tabs');
	if(targetList){
	  const allContentBlocks = Array.from(document.querySelectorAll('.target__content'));
	  const alltargetLinks = Array.from(document.querySelectorAll('.target__list-item'));
	  
	  let currentIndex = 0;
	  let frontBlockId = "target-1";
	  const tabsLinks = document.querySelectorAll('.target__list-item');
	  function addTabsActive () {
		  tabsLinks.forEach((button, index) => {
			button.addEventListener('click', () => {
			  tabsLinks.forEach((otherButton) => {
				otherButton.classList.remove('active');
			  });
			  button.classList.add('active');
			  showContent(button.dataset.name, index);
			});
		  });
		}
	  addTabsActive ();
	  function updateActiveTab(index) { 
		  tabsLinks.forEach((button, i) => {
			  if (i === index) {
				  button.classList.add('active'); 
			  } else {
				  button.classList.remove('active'); 
			  }
		  });
	  }
	  
	  function changeSlide(blockId) {
		  allContentBlocks.forEach((block, index) => {
			  if (block.getAttribute('id') === blockId) {
				  block.style.display = 'flex';
				  block.style.opacity = 1;
				  currentIndex = index;
			  } else {
				  block.style.opacity = 0;
				  block.style.display = 'none';
			  }
		  });
		  frontBlockId = blockId;
	  }
	  function showContent(itemName, index) {
        changeSlide(itemName, index);
        updateActiveTab(index);
    	}
    addTabsActive();
    showContent(frontBlockId, 0);
	}

	// слайдер для відгуків

	const reviewsSliderInit = document.querySelector('.reviewsSlider');
	if (reviewsSliderInit){
		const reviewsSlide = document.querySelectorAll('.reviews-slide');
		const reviewsArrows = document.querySelector('.reviews-arrows');
		if(reviewsSlide.length < 2){
			reviewsArrows.style.display = 'none';
		} else{
			reviewsArrows.style.display = 'flex';
		}
		const reviewsSwiper = new Swiper(".reviewsSlider", {
			pagination: {
			  el: ".reviews-pagination",
			  clickable: true,
			},
			navigation: {
			nextEl: '.reviews-button-next',
			prevEl: '.reviews-button-prev',
			},
				slidesPerView: 1,
			spaceBetween: 10,
			breakpoints: {
			767: {
			slidesPerView: 2,
			spaceBetween: 20
			},
			1023: {
			slidesPerView: 3,
			spaceBetween: 20
			}
		},
		  });
	}
	// слайдер для новин з блогу

	const newsSliderInit = document.querySelector('.newsSlider');
	if (newsSliderInit){
		const newsSlide = document.querySelectorAll('.news-slide');
		const newsArrows = document.querySelector('.news-arrows');
		if(newsSlide.length < 2){
			newsArrows.style.display = 'none';
		} else{
			newsArrows.style.display = 'flex';
		}
		const newsSwiper = new Swiper(".newsSlider", {
			pagination: {
			  el: ".news-pagination",
			  clickable: true,
			},
			navigation: {
			nextEl: '.news-button-next',
			prevEl: '.news-button-prev',
			},
				slidesPerView: 1,
			spaceBetween: 10,
			breakpoints: {
			767: {
			slidesPerView: 2,
			spaceBetween: 20
			},
			1023: {
			slidesPerView: 3,
			spaceBetween: 20
			}
		},
		  });
	}
	// для кнопки читати більше в статті
	const articleContainer = document.querySelector("#article");

	if (articleContainer) {
		const createBtn = document.createElement('button');
		createBtn.classList.add('article-btn');
		createBtn.innerText = 'Read more'; 
		articleContainer.appendChild(createBtn);

		const articleContent = document.querySelectorAll('.state__article');

		createBtn.addEventListener("click", function(e) {
			e.preventDefault();
			articleContent.forEach(function(content) {
				if (createBtn.innerText === 'Read Less') {
					content.style.height = "482px";
					createBtn.innerText = 'Read more';
				} else {
					content.style.height = "auto";
					createBtn.innerText = 'Read Less';
				}
			});
		});

		articleContent.forEach(function(content) {
			if (content.offsetHeight >= 482) {
				content.style.height = "482px";
				content.style.overflow = 'hidden';
			}
		});
	}

	const accordionItemsProduct = document.querySelectorAll(".accord-item");
	if (accordionItemsProduct) {
	  accordionItemsProduct.forEach((item) => {
		item.addEventListener("click", function () {
		  this.classList.toggle("active");
		});
	  });
	}
  
	const stikyElement = document.querySelectorAll(".scrolling_item");
	const resizeStikyElement = () => {
	  windowInnerWidth = window.innerWidth; 
  
	  if (windowInnerWidth >= 1024 && stikyElement) {
		stikyElement.forEach((stiky, index) => {
		  stiky.style.top = `calc(100px + ${50 * index}px)`;
		});
	  } else if (windowInnerWidth <= 1023 && stikyElement) {
		stikyElement.forEach((stiky, index) => {
		  stiky.style.top = `calc(50px + ${50 * index}px)`;
		});
	  }
	};
	resizeStikyElement();
	window.addEventListener("resize", resizeStikyElement);

	  // функція для аккордеону


	  var today = new Date();
	  var dd = String(today.getDate()).padStart(2, '0');
	  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
	  var yyyy = today.getFullYear();
	  
	  today = yyyy + '-' + mm + '-' + dd;
	  
	  dateInput = document.querySelector('.input_date');
	  dateInput.setAttribute('min', today);
	  dateInput.value = today;
	

}); //кінець DOMContentLoaded