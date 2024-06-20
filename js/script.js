"use strict"

/** @type {HTMLElement} */
const headingPrimary = document.querySelector(".heading-primary")

// Set current year
const yearElement = document.querySelector(".year")
yearElement.textContent = new Date().getFullYear()

// Make mobile navigation work
const btnNavElement = document.querySelector(".btn-mobile-nav")
const headerElement = document.querySelector(".header")
btnNavElement.addEventListener("click", () => {
  headerElement.classList.toggle("nav-open")
})

// Enable smooth scrolling
const allLinks = document.querySelectorAll("a:link")
allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault()
    const href = link.getAttribute("href")
    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionElement = document.querySelector(href)
      sectionElement.scrollIntoView({ behavior: "smooth" })
    }
    // Close mobile navigation
    if (link.classList.contains("main-nav-link"))
      headerElement.classList.toggle("nav-open")
  })
})

// Sticky navigation
const sectionHeroElement = document.querySelector(".section-hero")

const observerHeroSection = new IntersectionObserver(function (entries) {
  const entry = entries[0]

  !entry.isIntersecting
    ? document.body.classList.add("sticky")
    : document.body.classList.remove("sticky")

}, {
  root: null,
  threshold: 0,
  rootMargin: "-80px",
})

observerHeroSection.observe(sectionHeroElement)


///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap () {
  const flex = document.createElement("div")
  flex.style.display = "flex"
  flex.style.flexDirection = "column"
  flex.style.rowGap = "1px"

  flex.appendChild(document.createElement("div"))
  flex.appendChild(document.createElement("div"))

  document.body.appendChild(flex)
  const isSupported = flex.scrollHeight === 1
  flex.parentNode.removeChild(flex)
  // console.log(isSupported)

  if (!isSupported) document.body.classList.add("no-flexbox-gap")
}
checkFlexGap()

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/* .no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
} */
