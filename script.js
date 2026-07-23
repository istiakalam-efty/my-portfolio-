/* ==========================================================================
   Efty — PORTFOLIO SCRIPT
   Table of Contents:
   1. Preloader
   2. Cursor Glow
   3. Scroll Progress Bar
   4. Navbar Scroll State + Active Link Highlighting
   5. Mobile Hamburger Menu
   6. Smooth Scroll for Anchor Links
   7. Typing Animation (Hero Role)
   8. Scroll Reveal (IntersectionObserver)
   9. Animated Counters (Stats / Achievements)
   10. Skill Progress Bars Animation
   11. Mouse Parallax on Hero Visual
   12. Floating Particles Background (Canvas)
   13. Button Ripple Effect
   14. Back To Top Button
   15. Contact Form Validation
   16. Footer Year
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initPreloader();
    initCursorGlow();
    initScrollProgress();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initTypingAnimation();
    initScrollReveal();
    initCounters();
    initSkillBars();
    initParallax();
    initParticles();
    initRippleButtons();
    initBackToTop();
    initContactForm();
    setFooterYear();
});

/* ------------------------------ 1. PRELOADER ----------------------------- */
function initPreloader() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    window.addEventListener("load", () => {
        setTimeout(() => {
            preloader.classList.add("loaded");
        }, 600);
    });

    // Fallback in case 'load' already fired before listener attached
    if (document.readyState === "complete") {
        setTimeout(() => preloader.classList.add("loaded"), 600);
    }
}

/* ----------------------------- 2. CURSOR GLOW ---------------------------- */
function initCursorGlow() {
    const glow = document.getElementById("cursorGlow");
    if (!glow) return;

    // Skip on touch-only devices
    if (window.matchMedia("(hover: none)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        // Smooth lerp toward the actual cursor position
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

/* -------------------------- 3. SCROLL PROGRESS BAR ------------------------ */
function initScrollProgress() {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + "%";
    });
}

/* --------------------- 4. NAVBAR SCROLL + ACTIVE LINK --------------------- */
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main .section, .hero");

    if (!navbar) return;

    window.addEventListener("scroll", () => {
        // Toggle compact navbar background after slight scroll
        navbar.classList.toggle("scrolled", window.scrollY > 40);

        // Determine which section is currently in view
        let currentId = "home";
        const scrollPos = window.scrollY + window.innerHeight * 0.35;

        sections.forEach((section) => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentId = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.section === currentId);
        });
    });
}

/* --------------------------- 5. MOBILE HAMBURGER -------------------------- */
function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!hamburger || !mobileMenu) return;

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle("open");
        hamburger.classList.toggle("open", isOpen);
        hamburger.setAttribute("aria-expanded", String(isOpen));
        document.body.style.overflow = isOpen ? "hidden" : "";
    };

    hamburger.addEventListener("click", toggleMenu);

    mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("open");
            hamburger.classList.remove("open");
            hamburger.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        });
    });
}

/* --------------------------- 6. SMOOTH SCROLL ------------------------------ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId.length <= 1) return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const navHeight = document.getElementById("navbar")?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;

            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

/* --------------------------- 7. TYPING ANIMATION --------------------------- */
function initTypingAnimation() {
    const el = document.getElementById("typingText");
    if (!el) return;

    const phrases = [
        "Computer Science Engineering Student",
        "Frontend Developer",
        "Problem Solver",
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 70;
    const DELETE_SPEED = 40;
    const HOLD_TIME = 1400;

    function tick() {
        const currentPhrase = phrases[phraseIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = currentPhrase.slice(0, charIndex);

            if (charIndex === currentPhrase.length) {
                deleting = true;
                return setTimeout(tick, HOLD_TIME);
            }
        } else {
            charIndex--;
            el.textContent = currentPhrase.slice(0, charIndex);

            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(tick, deleting ? DELETE_SPEED : TYPE_SPEED);
    }

    tick();
}

/* --------------------------- 8. SCROLL REVEAL ------------------------------ */
function initScrollReveal() {
    const revealEls = document.querySelectorAll("[data-reveal]");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
}

/* --------------------------- 9. ANIMATED COUNTERS -------------------------- */
function initCounters() {
    const counters = document.querySelectorAll(".stat-number[data-count]");
    if (!counters.length) return;

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1600;
        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        }
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((el) => observer.observe(el));
}

/* --------------------------- 10. SKILL BARS -------------------------------- */
function initSkillBars() {
    const bars = document.querySelectorAll(".bar i[data-width]");
    if (!bars.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.dataset.width;
                    // Small delay for a staggered, natural fill-in feel
                    setTimeout(() => {
                        bar.style.width = width + "%";
                    }, 120);
                    observer.unobserve(bar);
                }
            });
        },
        { threshold: 0.4 }
    );

    bars.forEach((bar) => observer.observe(bar));
}

/* --------------------------- 11. MOUSE PARALLAX ---------------------------- */
function initParallax() {
    const visual = document.getElementById("floatProfile");
    const heroSection = document.getElementById("home");
    if (!visual || !heroSection) return;
    if (window.matchMedia("(hover: none)").matches) return;

    heroSection.addEventListener("mousemove", (e) => {
        const rect = heroSection.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        const maxShift = 18;
        visual.style.transform = `translate(${relX * maxShift}px, ${relY * maxShift}px)`;
    });

    heroSection.addEventListener("mouseleave", () => {
        visual.style.transform = "translate(0, 0)";
    });
}

/* --------------------------- 12. FLOATING PARTICLES ------------------------ */
function initParticles() {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;

    const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 70;
    const COLORS = ["rgba(63,94,251,", "rgba(91,124,250,", "rgba(37,64,201,"];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 1.8 + 0.6,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                alpha: Math.random() * 0.5 + 0.2,
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges
            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.alpha + ")";
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    createParticles();
    draw();

    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            createParticles();
        }, 250);
    });
}

/* --------------------------- 13. BUTTON RIPPLE ------------------------------ */
function initRippleButtons() {
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach((btn) => {
        btn.style.position = btn.style.position || "relative";
        btn.addEventListener("click", function (e) {
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement("span");

            ripple.classList.add("ripple");
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = e.clientX - rect.left - size / 2 + "px";
            ripple.style.top = e.clientY - rect.top - size / 2 + "px";

            btn.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    });
}

/* --------------------------- 14. BACK TO TOP -------------------------------- */
function initBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener("scroll", () => {
        btn.classList.toggle("show", window.scrollY > 500);
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* --------------------------- 15. CONTACT FORM VALIDATION -------------------- */
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    const fields = {
        name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
        email: { input: document.getElementById("email"), error: document.getElementById("emailError") },
        subject: { input: document.getElementById("subject"), error: document.getElementById("subjectError") },
        message: { input: document.getElementById("message"), error: document.getElementById("messageError") },
    };

    const successMsg = document.getElementById("formSuccess");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(field, message) {
        field.input.closest(".form-group").classList.toggle("invalid", Boolean(message));
        field.error.textContent = message || "";
    }

    function validateField(key) {
        const field = fields[key];
        const value = field.input.value.trim();

        switch (key) {
            case "name":
                if (value.length < 2) return setError(field, "Please enter your full name."), false;
                break;
            case "email":
                if (!emailPattern.test(value)) return setError(field, "Please enter a valid email address."), false;
                break;
            case "subject":
                if (value.length < 3) return setError(field, "Subject should be a bit more descriptive."), false;
                break;
            case "message":
                if (value.length < 10) return setError(field, "Message should be at least 10 characters."), false;
                break;
        }

        setError(field, "");
        return true;
    }

    // Live validation as the user types (after first blur)
    Object.keys(fields).forEach((key) => {
        fields[key].input.addEventListener("blur", () => validateField(key));
        fields[key].input.addEventListener("input", () => {
            if (fields[key].input.closest(".form-group").classList.contains("invalid")) {
                validateField(key);
            }
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const results = Object.keys(fields).map((key) => validateField(key));
        const allValid = results.every(Boolean);

        if (!allValid) {
            successMsg.classList.remove("show");
            return;
        }

        // Simulate successful submission (no backend wired up)
        successMsg.classList.add("show");
        form.reset();

        setTimeout(() => successMsg.classList.remove("show"), 5000);
    });
}

/* --------------------------- 16. FOOTER YEAR --------------------------------- */
function setFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}