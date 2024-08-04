//функція прелоадера
document.addEventListener("DOMContentLoaded", function () {
	playPreload();
	navLinksCloseMenu();
	openResizeMenu();
	animateSectionPosition();
	smoothScrollOnPage();
	openTabs();
	reviewsSlider();
	openNewsSlider();
	articleOpenBtn();
	accordionFunction();
	updateStickyElement();
	showDate();
	reviewsFormChecked(); //там на укр.яз настроенно все
	showPopUpBook();
	showPopUpContact();
}); //кінець DOMContentLoaded

let lastScrollTop = 0;
const windowInnerWidth = window.innerWidth;
const headerNavigation = document.querySelector(".header__navigation");

//функція для анімації  прелоадеру

const playPreload = () =>{
	const preload = document.querySelector(".preloader");
	if(!preload) return;

	let progressBar = document.querySelector(".preloader__progress");
  let progressAnimationImg = document.querySelector(".preloader__wrap img");
  let progressValue = 0;
  let interval = setInterval(increaseProgress, 20);
  function increaseProgress() {
    progressValue += 5;
    progressBar.style.backgroundSize = progressValue + "%";
    progressBar.setAttribute("aria-valuenow", progressValue);
    document.querySelector(".preload-text").textContent = progressValue + "%";
    progressAnimationImg.style.animationDuration = "700ms";

    if (progressValue >= 100) {
      clearInterval(interval);
      document.querySelector(".preloader").style.display = "none";
      document.documentElement.classList.add("visible");
    }
  }
}
//функція для закриття меню при переході за посиланнями

  const navLinksCloseMenu = () =>{
		const navLinks = document.querySelectorAll("nav a");
		if(!navLinks) return;
		navLinks.forEach((link) => {
			link.addEventListener("click", () => {
				htmlElement.classList.remove("open");
			});
		});
	}
 
	//функція для визначення висоти меню в залежності того чи відбулась зміна ширини вікна та необхідності його коррекції
	const openResizeMenu = () =>{
		
		const resizeMenuBtn = document.querySelector(".resize-menu");
		const htmlElement = document.querySelector("html");
	
		const headerTop = document.querySelector(".header__top");
		const headerBottom = document.querySelector(".header__bottom");
		const headerMobMenu = document.querySelector(".header__mob-menu");
	
		function getVisibleHeight(el) {
			const rect = el.getBoundingClientRect();
			const windowHeight =
				window.innerHeight || document.documentElement.clientHeight;
	
			const topVisible = Math.max(rect.top, 0);
			const bottomVisible = Math.min(rect.bottom, windowHeight);
			const visibleHeight = bottomVisible - topVisible;
			return Math.max(0, Math.min(visibleHeight, rect.height));
		}
	
		function updateMenuPosition(scrollTop) {
			const headerTopHeight = getVisibleHeight(headerTop);
			const headerBottomHeight = getVisibleHeight(headerBottom);
			const headerNavigationHeight = headerNavigation.offsetHeight;
	
			if (htmlElement.classList.contains("open")) {
				headerMobMenu.style.top = `${headerTopHeight + headerBottomHeight}px`;
				headerMobMenu.style.height = `calc(100vh - ${
					headerTopHeight + headerBottomHeight
				}px)`;
				if (headerTopHeight <= 0 && headerBottomHeight <= 0) {
					headerMobMenu.style.top = `${headerNavigationHeight}px`;
					headerMobMenu.style.height = `calc(100vh + ${headerNavigationHeight}px)`;
				}
			} else if (scrollTop <= 0) {
				headerMobMenu.style.top = `- ${headerNavigationHeight}px`;
				headerMobMenu.style.height = `calc(100vh + ${headerNavigationHeight}px)`;
			}
		}
	
		
	
		resizeMenuBtn.addEventListener("click", function () {
			htmlElement.classList.toggle("open");
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			updateMenuPosition(scrollTop);
		});
	
		window.addEventListener("load", function () {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			updateMenuPosition(scrollTop);
		});
		window.addEventListener("scroll", function () {
			const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if (windowInnerWidth >= 1024) {
				if (scrollTop > lastScrollTop) {
					if (scrollTop > 100) {
						headerNavigation.classList.add("fixed-header-nav");
						headerNavigation.style.animationName = "smoothScroll";
					}
				} else if (scrollTop <= 0) {
					headerNavigation.classList.remove("fixed-header-nav");
					headerNavigation.style.animationName = "removeSmoothScroll";
				}
				lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
				updateMenuPosition(scrollTop);
			}
		});
	}



	//анімація позиції секції на сторінці
  const animateSectionPosition = () =>{
		const sections = document.querySelectorAll(".sectionScroll");
		if(!sections) return;
		const options = {
			root: document,
			rootMargin: "0px",
			threshold: 0.1,
		};
	
		const callback = function (entries, observer) {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !entry.target.classList.contains("animate")) {
					entry.target.classList.add("animate");
				} else if (
					!entry.isIntersecting &&
					entry.target.classList.contains("animate")
				) {
					entry.target.classList.remove("animate");
				}
			});
		};
	
		const observer = new IntersectionObserver(callback, options);
	
		sections.forEach((section) => observer.observe(section));
	
	}
 //гарний скрол по сторінці
const smoothScrollOnPage = () =>{
 
  document.querySelectorAll('a[href^="#"').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      let href = this.getAttribute("href").substring(1);

      const scrollTarget = document.getElementById(href);

      const topOffset = document.querySelector("header").offsetHeight;
      const elementPosition = scrollTarget.getBoundingClientRect().top;
      const offsetPosition = elementPosition - topOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}


  // tabs На головній
const openTabs = () =>{
	const targetList = document.querySelectorAll(".target__tabs");
  if (!targetList) return;

    const allContentBlocks = Array.from(
      document.querySelectorAll(".target__content")
    );

    let frontBlockId = "target-1";
    const tabsLinks = document.querySelectorAll(".target__list-item");
    function addTabsActive() {
      tabsLinks.forEach((button, index) => {
        button.addEventListener("click", () => {
          tabsLinks.forEach((otherButton) => {
            otherButton.classList.remove("active");
          });
          button.classList.add("active");
          showContent(button.dataset.name, index);
        });
      });
    }
    addTabsActive();
    function updateActiveTab(index) {
      tabsLinks.forEach((button, i) => {
        if (i === index) {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    }

    function changeSlide(blockId) {
      allContentBlocks.forEach((block, index) => {
        if (block.getAttribute("id") === blockId) {
          block.style.display = "flex";
          block.style.opacity = 1;
          currentIndex = index;
        } else {
          block.style.opacity = 0;
          block.style.display = "none";
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
		const reviewsSlider = () =>{
	const reviewsSliderInit = document.querySelector(".reviewsSlider");
  if (!reviewsSliderInit)  return 
    const reviewsSlide = document.querySelectorAll(".reviews-slide");
    const reviewsArrows = document.querySelector(".reviews-arrows");
    if (reviewsSlide.length < 2 || innerWidth <= 767) {
      reviewsArrows.style.display = "none";
    } else {
      reviewsArrows.style.display = "flex";
    }
    const reviewsSwiper = new Swiper(".reviewsSlider", {
      pagination: {
        el: ".reviews-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1023: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  }
// слайдер для новин з блогу
	const openNewsSlider = () =>{
		 const newsSliderInit = document.querySelector(".newsSlider");
  if (!newsSliderInit) return;
    const newsSlide = document.querySelectorAll(".news-slide");
    const newsArrows = document.querySelector(".news-arrows");
    if (newsSlide.length < 2 || innerWidth <= 767) {
      newsArrows.style.display = "none";
    } else {
      newsArrows.style.display = "flex";
    }
    const newsSwiper = new Swiper(".newsSlider", {
      pagination: {
        el: ".news-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".news-button-next",
        prevEl: ".news-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        767: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1023: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
  
	}
 
  // для кнопки читати більше в статті
	const articleOpenBtn = () =>{
		const articleContainer = document.querySelectorAll(".article");
		if (!articleContainer) return;
		articleContainer.forEach((container) =>{
			const createBtn = document.createElement("button");
			createBtn.classList.add("article-btn");
			createBtn.innerText = "Read more";
			container.appendChild(createBtn);
	
			const articleContent = container.querySelectorAll(".state__article");
	
			createBtn.addEventListener("click", function (e) {
				e.preventDefault();
				articleContent.forEach(function (content) {
					if (content.style.height >= 482) {
						content.style.height = "482px";
						createBtn.innerText = "Read more";
					} else {
						content.style.height = "auto";
						createBtn.style.display = "none";
					}
				});
			});
	
			articleContent.forEach(function (content) {
				if (content.offsetHeight >= 482) {
					content.style.height = "482px";
					content.style.overflow = "hidden";
				}
			});
		})
			
		}
	  
const accordionFunction = () =>{
  const accordionItemsProduct = document.querySelectorAll(".accord-item");
  if (!accordionItemsProduct) return
    accordionItemsProduct.forEach((item) => {
      item.addEventListener("click", function () {
        this.classList.toggle("active");
      });
    });
  }
//для блоків гармошкою
const updateStickyElement = () =>{
 
 const stickyElement = document.querySelectorAll(".scrolling_item");
 if(!stickyElement) return
	 const resizeStickyElement = () => {
		 if (windowInnerWidth >= 1024 && stickyElement) {
			 stickyElement.forEach((sticky, index) => {
				 sticky.style.top = `calc(100px + ${50 * index}px)`;
			 });
		 } else if (windowInnerWidth <= 1023 && stickyElement) {
			 stickyElement.forEach((sticky, index) => {
				 sticky.style.top = `calc(50px + ${50 * index}px)`;
			 });
		 }
	 };
	 resizeStickyElement();
	 window.addEventListener("resize", resizeStickyElement);
 }


  // для інпуту з датою  аби встановлювалась поточна дата
	const showDate = () =>{
		dateInput = document.querySelector(".input_date");
		if (!dateInput) return; 
			const today = new Date();
			const dd = String(today.getDate()).padStart(2, "0");
			const mm = String(today.getMonth() + 1).padStart(2, "0");
			const yyyy = today.getFullYear();
	
			today = yyyy + "-" + mm + "-" + dd;
	
			dateInput.setAttribute("min", today);
			dateInput.value = today;
		}
	
	
 
  //для перевірки форми з відгуками
const reviewsFormChecked = () =>{
	if (document.querySelector(".reviewForm")) {
    const commentForm = document.getElementById("comment-form");
    const commentName = document.getElementById("name");
    const commentSurname = document.getElementById("lastName");
    const commentText = document.getElementById("message");
    const sick = document.getElementById("sick");
    const commentButton = document.getElementById("comment-button");

    commentButton.addEventListener("click", function (e) {
      const ratingElement = document.querySelector(
        'input[name="rating"]:checked'
      );
      const rating = ratingElement ? ratingElement.value : "";
      const commentPost = this.getAttribute("data-post-id");
      e.preventDefault();
      var xhr = new XMLHttpRequest();
      if (commentName.value && commentSurname && commentText) {
        xhr.open("POST", homepage_js.ajax_url, true);
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          "comment_name=" +
            commentName.value +
            "&comment_surname=" +
            commentSurname.value +
            "&rating=" +
            rating +
            "&sick=" +
            sick.value +
            "&comment_text=" +
            commentText.value +
            "&commentPost=" +
            commentPost +
            "&action=new_comment_function"
        );
        xhr.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            commentForm.reset();
            alert(
              homepage_js.currentLang === "uk"
                ? "Ваш відгук було надіслано"
                : "Ваш отзыв был отправлен"
            );
            // commentForm.textContent = '';
          } else {
            alert(
              homepage_js.currentLang === "uk"
                ? "Заповніть форму"
                : "Заполните форму"
            );
          }
        };
      } else {
        alert(
          homepage_js.currentLang === "uk"
            ? "Заповніть форму"
            : "Заполните форму"
        );
      }
    });
  }
}
  // функція для попап, який з заповненням форми при натискані кнопки Book
const showPopUpBook = () =>{
	const popUpBook = document.querySelector(".popup-book");
  const popupBg = document.querySelectorAll(".popup-bg");
	if (!popUpBook) return 
    const closePopUpBook = document.querySelector(".popup-book-close");
    const popupButtons = document.querySelectorAll(
      '[data-button="popup-book"]'
    );

    popupButtons.forEach((popBtn) => {
      popBtn.addEventListener("click", () => {
        popUpBook.classList.add("open");
      });
    });
    closePopUpBook.addEventListener("click", () => {
      popUpBook.classList.remove("open");
    });
    popupBg.forEach((bg) =>
      bg.addEventListener("click", () => {
        popUpBook.classList.remove("open");
      })
    );
  }

  // функції для попапів
 


  
 
  // функція попапу який з'являється через 30 секунд після заванатаження сторінки
	const showPopUpContact = () =>{
		const popUpContact = document.querySelector(".popup-contact");
		if (!popUpContact) return
			const popupWrapper = document.querySelectorAll(".popup");
			const popupBg = document.querySelectorAll(".popup-bg");
			const closePopUpContact = document.querySelector(".popup-contact-close");
			const popupContactButtons = document.querySelectorAll(
				'[data-button="popup-contact"]'
			);
			popupContactButtons.forEach((popBtn) => {
				popBtn.addEventListener("click", () => {
					popUpContact.classList.add("open");
				});
			});
			popupBg.forEach((bg) =>
				bg.addEventListener("click", () => {
					popUpContact.classList.remove("open");
				})
			);
			closePopUpContact.addEventListener("click", () => {
				popUpContact.classList.remove("open");
			});
		}
 