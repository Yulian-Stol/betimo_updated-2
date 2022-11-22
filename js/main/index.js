const arrowLeft = document.getElementsByClassName('home-carousel-arrow-left')[0];
const arrowRight = document.getElementsByClassName('home-carousel-arrow-right')[0];
const homeHeader = document.getElementsByClassName('home-header')[0];
const headerItems = document.getElementsByClassName('home-header-items')[0];
const hamburger = document.getElementsByClassName('hamburger')[0];
const menu = document.getElementsByClassName('navbar-menu-container')[0];
const productLink = document.getElementsByClassName('navbar-menu-item product')[0];
const submenu = document.getElementsByClassName('product-submenu')[0];
const navbarTop = document.getElementsByClassName('navbar-top')[0];

const padding = 60;
const transition = 'all 0.5s';

let direction;
let menuOpen = false;
let submenuOpen = false;

//----------------------MODAL-----------------------
const modals = (modalSelector) => {
	const	modal = document.querySelectorAll(modalSelector);

	if (modal) {
		let i = 1;

		modal.forEach(item => {
			const wrap = item.id;
			const link = document.querySelectorAll('.' + wrap);

			link.forEach(linkItem => {
				let close = item.querySelector('.close');
					if (linkItem) {
						linkItem.addEventListener('click', (e) => {
							if (e.target) {
								e.preventDefault();
							}
							item.classList.add('active');
						});
					}

					if (close) {
						close.addEventListener('click', () => {
							item.classList.remove('active');
						});
					}

				item.addEventListener('click', (e) => {
					if (e.target === item) {
						item.classList.remove('active');
					}
				});
			});
		});
	}

};
modals('.modal');

productLink.addEventListener('click', (event) => {
    //event.preventDefault();
    event.stopImmediatePropagation();
    if(window.innerWidth < 1200) {
        submenuOpen = !submenuOpen;
        submenuOpen ? productLink.classList.add('active'): productLink.classList.remove('active');
    }
})

headerItems.addEventListener('transitionend', () => {
    if (direction === 1) {
        headerItems.prepend(headerItems.lastElementChild);
    } else {
        headerItems.appendChild(headerItems.firstElementChild);
    }

    headerItems.style.transition = 'none';
    headerItems.style.transform = 'translateX(0)';
    setTimeout(() => {
        headerItems.style.transition = transition;
    });
})

arrowLeft.addEventListener('click', () => {
    if (direction === -1) {
        direction = 1;
        headerItems.appendChild(headerItems.firstElementChild);
    }

    homeHeader.style.justifyContent = 'flex-end';
    const headerItemWidth = getHeaderItemWidth();
    console.log(headerItemWidth)
    headerItems.style.transition = transition;
    headerItems.style.transform = `translateX(${headerItemWidth}px)`;
})

arrowRight.addEventListener('click', () => {
    direction = -1;

    homeHeader.style.justifyContent = 'flex-start';
    const headerItemWidth = getHeaderItemWidth();
    headerItems.style.transition = transition;
    headerItems.style.transform = `translateX(${-headerItemWidth}px)`;
})

hamburger.addEventListener('click', () => {
    if(window.innerWidth < 1200) {
        menuOpen = !menuOpen;
        if (menuOpen) {
            navbarTop.classList.add('open');
            hamburger.classList.add('open');
            menu.classList.add('active');
            menu.style.overflowY = 'auto';
        } else {
            navbarTop.classList.remove('open');
            hamburger.classList.remove('open');
            menu.classList.remove('active');
            menu.style.overflowY = 'auto';
            if(submenuOpen) {
                submenuOpen = false;
                productLink.classList.remove('active');
            }
        }
    }
})

const getHeaderItemWidth = () => {
    return document.getElementsByClassName('home-header-item')[0].scrollWidth;
}

window.addEventListener('resize', () => {
    if(window.innerWidth < 1200) {
        menu.style.overflowY = 'auto';
    } else {
        menu.style.overflowY = 'unset';
    }
})
