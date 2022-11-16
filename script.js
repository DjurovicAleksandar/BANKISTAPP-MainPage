'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const titleGreen = document.querySelectorAll('.highlight');
//buttonss
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo1 = document.querySelector('.btn--scroll-to');

//sections
const sectionOne = document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');

const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
let curSlide = 0;
const maxSlide = slides.length;
//dots
const dots = document.querySelector('.dots');

const createDots = function () {
  slides.forEach((_, i) => {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class='dots__dot' data-slide='${i}'></button>`
    );
  });
};

createDots();

//functions
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//butttons
btnsOpenModal.forEach(button =>
  button.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  })
);
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo1.addEventListener('click', function (e) {
  e.preventDefault();

  const s1coords = sectionOne.getBoundingClientRect();

  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  // sectionOne.scrollIntoView({ behavior: `smooth` });
});

const textColor = function () {
  btnScrollTo1.style.color = `orangered`;
  // setTimeout(() => (btnScrollTo1.style.color = `var(--color-primary)`), 300);
};

btnScrollTo1.addEventListener('mouseenter', textColor);
btnScrollTo1.addEventListener('mouseleave', function () {
  btnScrollTo1.style.color = `var(--color-primary)`;
});

document.querySelectorAll('.btn--text').forEach(button =>
  button.addEventListener('mouseenter', function () {
    button.style.color = `orangered`;
    button.addEventListener('mouseleave', function () {
      button.style.color = `var(--color-primary)`;
    });
  })
);

titleGreen.forEach(field =>
  field.addEventListener('mouseenter', function (e) {
    e.preventDefault();
    field.style.cursor = 'pointer';
    field.style.opacity = 0.85;
    field.addEventListener('mouseleave', function () {
      field.style.opacity = 1;
    });
  })
);

const radnomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;

const randomColor = () =>
  `rgb(${radnomNumber(0, 255)},${radnomNumber(0, 255)},${radnomNumber(
    0,
    255
  )})`;

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute(`href`);
    if (e.target.closest('.btn--show-modal')) return;

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
  if (e.target.closest('.goToOtherPage')) {
    window.location.href = '../Login & Create/index.html';
  }
});

const maestral = document.querySelector('h2').parentElement.children;

// [...maestral].forEach(ma => (ma.style.color = `red`));

const operationsContainer = document.querySelector(
  '.operations__tab-container'
);
const operationsBtn = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');

operationsContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  operationsBtn.forEach(btn => btn.classList.remove('operations__tab--active'));
  operationContent.forEach(con =>
    con.classList.remove('operations__content--active')
  );

  //add
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

const fadeNav = function (e) {
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');
  logo.style.cursor = `pointer`;
  siblings.forEach(sibling => {
    if (sibling !== link) sibling.style.opacity = this;
  });
  if (logo !== link) logo.style.opacity = this;
};

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', fadeNav.bind(0.5));

nav.addEventListener('mouseout', fadeNav.bind(1));

const navStickStart = nav.getBoundingClientRect();
const headerHeight = document
  .querySelector('.header')
  .getBoundingClientRect().height;

const obsCallBack = function (entires, observer) {
  const [entrie] = entires;
  if (!entrie.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${(10 / 100) * headerHeight}px`, // ili -neki broj piksela, jer ovo predstavlja marginu elemnta koga posmatramo, u ovom slucaju header
};

const observer = new IntersectionObserver(obsCallBack, obsOptions);
observer.observe(document.querySelector('.header'));

//LAZy LOADING

const lazyLoad = function (entires, obeserver) {
  const [entry] = entires;

  if (!entry.isIntersecting) return;
  console.log(entry);
  entry.target.classList.remove('section--hidden'); // da se aktivira na datom tresholdu
  obeserver.unobserve(entry.target); // da ne posmatra datu metu
};

const sectionObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0.3,
});

//Lazy load IMGS

const lazyImgs = document.querySelectorAll('.features__img');
const imgLoad = function (entires, observer) {
  const [entry] = entires;

  if (!entry.isIntersecting) return;

  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0,
  rootMargin: `${200}px`,
});

lazyImgs.forEach(img => {
  imgObserver.observe(img);
});

//Slides
const activateDots = function (broj) {
  document.querySelectorAll('.dots__dot').forEach((dot, i) => {
    dot.classList.remove('dots__dot--active');
  });

  document
    .querySelector(`.dots__dot[data-slide='${broj}']`)
    .classList.add('dots__dot--active');
  console.log(`DOTS ${broj}`);
};
activateDots(0);

const swipeSlide = function (slideX) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - slideX) * 100}%)`;
  });
};
swipeSlide(0);

const previousSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  swipeSlide(curSlide);
  activateDots(curSlide);
  console.log(curSlide);
};
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  swipeSlide(curSlide);
  activateDots(curSlide);
};
// slider.style.transform = 'scale(0.2)  translateX(-300%)';
// slider.style.overflow = 'visible';

btnLeft.addEventListener('click', previousSlide);
btnRight.addEventListener('click', nextSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === `ArrowLeft`) previousSlide();

  if (e.key === `ArrowRight`) nextSlide();
});

dots.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    swipeSlide(slide);
    activateDots(slide);
    curSlide = slide;
  }
});
