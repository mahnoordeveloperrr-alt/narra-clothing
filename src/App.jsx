import { useState, useEffect, useRef } from 'react';
import heroTexture from './assets/12345.webp';
import './App.css';

// ──────────────────────────────────────
// Image paths (same as original HTML)
// Ensure these images exist in public/img/
// ──────────────────────────────────────
const IMAGES = {
  heroTexture: 'img/12345.webp',
  heritagePreview: 'img/44.webp',
  lookbook1: 'img/77.jpg',
  lookbook2: 'img/55.webp',
  lookbook3: 'img/99.jpg',
  lookbook4: 'img/10.jpg',
  lookbook5: 'img/222.jpg',
  process1: 'img/44.webp',
  process2: 'img/10.jpg',
  process3: 'img/55.webp',
  process4: 'img/99.jpg',
  process5: 'img/77.jpg',
  clientPhoto: 'img/55.webp',
  collectionMen: 'img/11.webp',
  collectionWomen: 'img/22.jpg',
  collectionLeather: 'img/111.webp',
};

// ──────────────────────────────────────
// Process steps data
// ──────────────────────────────────────
const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Personal Consultation',
    description: 'We discuss your style, preferences, and the occasion.',
    image: IMAGES.process1,
  },
  {
    number: '02',
    title: 'Fabric & Design',
    description:
      'We source the finest Italian and Scottish fabrics, curated just for you.',
    image: IMAGES.process2,
  },
  {
    number: '03',
    title: 'Precision Tailoring',
    description:
      'Our master cutters and tailors bring the design to life with exacting detail.',
    image: IMAGES.process3,
  },
  {
    number: '04',
    title: 'Quality Assurance',
    description:
      'Every garment undergoes rigorous inspection before it reaches you.',
    image: IMAGES.process4,
  },
  {
    number: '05',
    title: 'Delivery & Aftercare',
    description:
      'Your piece arrives beautifully packaged, with care instructions included.',
    image: IMAGES.process5,
  },
];

// ──────────────────────────────────────
// MAIN APP COMPONENT
// ──────────────────────────────────────
export default function App() {
  // ─── State ───────────────────────────
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [activeProcessIndex, setActiveProcessIndex] = useState(null);
  const [hoveredProcessIndex, setHoveredProcessIndex] = useState(null);

  // ─── Refs ────────────────────────────
  const heroRef = useRef(null);
  const artTextRef = useRef(null);
  const heroContentRef = useRef(null);
  const magneticCardRefs = useRef([]);
  const heritageRevealRefs = useRef([]);

  // ─── Modal handlers ──────────────────
  const openModal = () => {
    setActiveTab('login');
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const switchToRegister = (e) => {
    e.preventDefault();
    setActiveTab('register');
  };

  const switchToLogin = (e) => {
    e.preventDefault();
    setActiveTab('login');
  };

  // ─── Form submissions ────────────────
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert('Login functionality would go here.');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    alert('Registration functionality would go here.');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your inquiry. We will be in touch shortly.');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  // ─── Hero parallax ───────────────────
  useEffect(() => {
    const hero = heroRef.current;
    const artText = artTextRef.current;
    const content = heroContentRef.current;

    if (!hero || !artText) return;

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const moveX = ((x - centerX) / centerX) * 15;
      const moveY = ((y - centerY) / centerY) * 10;

      artText.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.3
        }px) scale(1.02)`;
      if (content) {
        content.style.transform = `translate(${moveX * 0.2}px, ${moveY * 0.2
          }px)`;
      }
    };

    const handleMouseLeave = () => {
      artText.style.transform = 'translate(0,0) scale(1)';
      if (content) content.style.transform = 'translate(0,0)';
    };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // ─── Magnetic cards ──────────────────
  useEffect(() => {
    const cards = magneticCardRefs.current.filter(Boolean);

    const handleCardMouseMove = (card, e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * 8;
      const rotateY = ((x - centerX) / centerX) * -8;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    };

    const handleCardMouseLeave = (card) => {
      card.style.transform =
        'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
    };

    const mouseMoveHandlers = cards.map((card) => {
      const handler = (e) => handleCardMouseMove(card, e);
      card.addEventListener('mousemove', handler);
      return { card, handler };
    });

    const mouseLeaveHandlers = cards.map((card) => {
      const handler = () => handleCardMouseLeave(card);
      card.addEventListener('mouseleave', handler);
      return { card, handler };
    });

    return () => {
      mouseMoveHandlers.forEach(({ card, handler }) =>
        card.removeEventListener('mousemove', handler)
      );
      mouseLeaveHandlers.forEach(({ card, handler }) =>
        card.removeEventListener('mouseleave', handler)
      );
    };
  }, []);

  // ─── Heritage reveal (IntersectionObserver) ──
  useEffect(() => {
    const elements = heritageRevealRefs.current.filter(Boolean);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // ─── Close modal on overlay click ────
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  // ─── Refs setter helpers ─────────────
  const setMagneticCardRef = (index) => (el) => {
    magneticCardRefs.current[index] = el;
  };

  const setHeritageRevealRef = (index) => (el) => {
    heritageRevealRefs.current[index] = el;
  };

  // ─── JSX ──────────────────────────────
  return (
    <>
      {/* ========== NAVBAR ========== */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">
            <i className="fas fa-crown"></i>
          </span>{' '}
          NARRA
        </div>

        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          <i className="fas fa-bars"></i>
        </button>

        <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#heritage">Heritage</a>
          <a href="#lookbook">Lookbook</a>
          <a href="#craftsmanship">Craftsmanship</a>
          <a href="#collections">Collections</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="icons">
          <i
            className="fas fa-search"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              setIsMenuOpen(false);
            }}
          ></i>
          <i className="fas fa-user" onClick={openModal}></i>
          <i className="fas fa-shopping-bag"></i>
        </div>

        {/* Search Bar */}
        <div
          className={`search-bar-container ${isSearchOpen ? 'active' : ''}`}
        >
          <input type="text" placeholder="Search for products..." />
          <button type="button">Search</button>
          <span
            className="close-search"
            onClick={() => setIsSearchOpen(false)}
          >
            <i className="fas fa-times"></i>
          </span>
        </div>
      </header>

      {/* ========== LOGIN / REGISTER MODAL ========== */}
      <div
        className={`modal-overlay ${isModalOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
      >
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </button>

          <div className="modal-tabs">
            <button
              className={`modal-tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`modal-tab ${activeTab === 'register' ? 'active' : ''
                }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          <form
            className={`modal-form ${activeTab === 'login' ? 'active' : ''}`}
            onSubmit={handleLoginSubmit}
          >
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign In</button>
            <p className="modal-footer-text">
              Don&apos;t have an account?{' '}
              <a href="#register" onClick={switchToRegister}>
                Register here
              </a>
            </p>
          </form>

          <form
            className={`modal-form ${activeTab === 'register' ? 'active' : ''
              }`}
            onSubmit={handleRegisterSubmit}
          >
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit">Create Account</button>
            <p className="modal-footer-text">
              Already have an account?{' '}
              <a href="#login" onClick={switchToLogin}>
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* ========== HERO SECTION ========== */}
      <section className="hero" ref={heroRef}>
        <div className="content" ref={heroContentRef}>
          <div className="left">
            <h1>
              One collection.
              <br />
              Timeless elegance.
            </h1>
          </div>
          <div className="right">
            <p>
              Discover meticulously crafted garments that embody heritage,
              sophistication, and quiet luxury.
            </p>
            <button>
              Explore Lookbook{' '}
              <i className="fas fa-arrow-right" style={{ marginLeft: 8 }}></i>
            </button>
          </div>
        </div>
        <div className="art-wrapper">
          <div className="art-text" ref={artTextRef} style={{
            backgroundImage: `url(${IMAGES.heroTexture})`
          }}>
            LUXE
          </div>
        </div>
      </section>

      {/* ========== BENEFITS ========== */}
      <section className="benefits">
        <div className="heading">
          <h1>
            Welcome to <span className="highlight">NARRA</span> — where old
            money aesthetics meet{' '}
            <span className="highlight">modern craftsmanship.</span> Every
            stitch tells a story of tradition.
          </h1>
          <button className="btn">
            View Collections <span>↗</span>
          </button>
        </div>
        <div className="grid">
          <div className="left-card">
            <h2>
              The Old Money
              <br />
              Difference
            </h2>
            <div className="arrow">
              <i className="fas fa-long-arrow-alt-right"></i>
            </div>
          </div>
          <div className="right-grid">
            <div className="card magnetic" ref={setMagneticCardRef(0)}>
              <span className="icon">
                <i className="fas fa-scissors"></i>
              </span>
              <p>Handcrafted by master tailors</p>
            </div>
            <div className="card magnetic" ref={setMagneticCardRef(1)}>
              <span className="icon">
                <i className="fas fa-ruler-combined"></i>
              </span>
              <p>Impeccable, bespoke fit</p>
            </div>
            <div className="card magnetic" ref={setMagneticCardRef(2)}>
              <span className="icon">
                <i className="fas fa-leaf"></i>
              </span>
              <p>Sustainably sourced fabrics</p>
            </div>
            <div className="card magnetic" ref={setMagneticCardRef(3)}>
              <span className="icon">
                <i className="fas fa-globe"></i>
              </span>
              <p>Worldwide delivery & care</p>
            </div>
            <div className="star">
              <i className="fas fa-gem"></i>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HERITAGE ========== */}
      <section className="heritage-showcase" id="heritage">
        <div className="heritage-wrapper">
          <h1
            className="heritage-heading heritage-reveal"
            ref={setHeritageRevealRef(0)}
          >
            After years of curating collections for
            <br />
            discerning gentlemen and women,
            <br />
            <span>Old Money Clothing</span> embodies
            <br />
            timeless elegance, heritage craftsmanship
            <br />
            and quiet luxury...
          </h1>
          <div
            className="heritage-feature heritage-reveal"
            ref={setHeritageRevealRef(1)}
          >
            <div className="heritage-preview-card">
              <img src={IMAGES.heritagePreview} alt="Old Money Fashion" />
            </div>
            <div className="heritage-details">
              <span>LOOKBOOK</span>
              <h2>
                OLD MONEY
                <br />
                CLOTHING
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LOOKBOOK ========== */}
      <section className="portfolio full-width-section" id="lookbook">
        <div className="bento-grid">
          <div className="title-card">
            <h2>
              Our
              <br />
              Lookbook
            </h2>
            <span>↗</span>
          </div>
          <div className="item tall">
            <img src={IMAGES.lookbook1} alt="Lookbook 1" />
          </div>
          <div className="item large">
            <img src={IMAGES.lookbook2} alt="Lookbook 2" />
          </div>
          <div className="item large">
            <img src={IMAGES.lookbook3} alt="Lookbook 3" />
          </div>
          <div className="item">
            <img src={IMAGES.lookbook4} alt="Lookbook 4" />
          </div>
          <div className="item small">
            <img src={IMAGES.lookbook5} alt="Lookbook 5" />
          </div>
        </div>
      </section>

      {/* ========== CRAFTSMANSHIP ========== */}
      <section
        className="shoot-process full-width-section"
        id="craftsmanship"
      >
        <div className="shoot-process-inner">
          <div className="process-header">
            <h2>How We Craft Perfection</h2>
            <p>
              From the initial sketch to the final stitch, every garment is a
              labour of love.
            </p>
          </div>
          <div className="process-list">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.number}
                className={`process-item${activeProcessIndex === index ? ' active' : ''
                  }${hoveredProcessIndex === index ? ' hovered' : ''}`}
                onClick={() => setActiveProcessIndex(index)}
                onMouseEnter={() => setHoveredProcessIndex(index)}
                onMouseLeave={() => setHoveredProcessIndex(null)}
              >
                <div className="left">
                  <span className="number">{step.number}</span>
                  <h3>{step.title}</h3>
                </div>
                <div className="preview-card">
                  <img src={step.image} alt={step.title} />
                </div>
                <div className="right">{step.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== COLLECTIONS ========== */}
      <div
        className="client-services-wrapper full-width-section"
        id="collections"
      >
        <div className="client-services-inner">
          <section className="client-story-section">
            <div className="featured-photo">
              <img src={IMAGES.clientPhoto} alt="Client" />
            </div>
            <div className="client-feedback">
              <div className="feedback-navigation">
                <button>←</button>
                <button>→</button>
              </div>
              <p className="feedback-text">
                &ldquo;The attention to detail and the perfect drape of the
                fabric makes me feel invincible. Truly a piece of art.&rdquo;
              </p>
              <span className="feedback-author">
                Eleanor Winslow | Bespoke Suit
              </span>
            </div>
          </section>

          <section className="photography-services">
            <div className="services-header">
              <h1>Our Signature Collections</h1>
              <p>Curated pieces designed to become heirlooms.</p>
            </div>
            <div className="service-gallery">
              <div className="service-card">
                <img src={IMAGES.collectionMen} alt="Men's Tailoring" />
                <div className="service-info">
                  <h3>Men&apos;s Tailoring</h3>
                  <span>from $850</span>
                </div>
              </div>
              <div className="service-card">
                <img src={IMAGES.collectionWomen} alt="Women's Couture" />
                <div className="service-info">
                  <h3>Women&apos;s Couture</h3>
                  <span>from $920</span>
                </div>
              </div>
              <div className="service-card service-card-wide">
                <img src={IMAGES.collectionLeather} alt="Leather Goods" />
                <div className="service-info">
                  <h3>Leather Goods</h3>
                  <span>from $340</span>
                </div>
              </div>
            </div>
            <button className="booking-button">Book a Consultation →</button>
          </section>
        </div>
      </div>

      {/* ========== CONTACT ========== */}
      <section className="contact-section full-width-section" id="contact">
        <div className="contact-inner">
          <div className="contact-header">
            <h2>
              Begin your journey
              <br />
              with NARRA
            </h2>
            <p>
              We would be honoured to create something extraordinary for you.
            </p>
          </div>
          <div className="contact-grid">
            <div className="contact-info-cards">
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-card-info">
                  <h4>Email</h4>
                  <a href="mailto:concierge@narra.com">concierge@narra.com</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-phone"></i>
                </div>
                <div className="contact-card-info">
                  <h4>Phone</h4>
                  <a href="tel:+12125551234">+1 (212) 555-1234</a>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-location-dot"></i>
                </div>
                <div className="contact-card-info">
                  <h4>Atelier</h4>
                  <span>Madison Avenue, New York</span>
                </div>
              </div>
              <div className="contact-card">
                <div className="contact-card-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="contact-card-info">
                  <h4>Hours</h4>
                  <span>Mon – Sat · 10am – 7pm</span>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3>Send a message</h3>
              <p>We usually reply within a few hours.</p>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" required />
                  <input type="email" placeholder="Email Address" required />
                </div>
                <input type="text" placeholder="Subject" />
                <textarea
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
                <button type="submit">Send Inquiry →</button>
              </form>
              <div className="contact-social-row">
                <a href="#ig">IG</a>
                <a href="#fb">FB</a>
                <a href="#tw">TW</a>
                <a href="#pi">PI</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="portfolio-footer full-width-section">
        <div className="footer-inner">
          <div className="newsletter-section">
            <h3>Sign up and receive 10% off your first order</h3>
            <form
              className="newsletter-form"
              onSubmit={handleNewsletterSubmit}
            >
              <input type="email" placeholder="Email Address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <hr />
          <div className="footer-brand">
            <h2>narra</h2>
          </div>
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#wholesale">Wholesale</a>
              <a href="#terms">Terms of Use</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-links">
              <a href="#shop">Shop</a>
              <a href="#about">About Us</a>
              <a href="#contact">Contact</a>
              <a href="#locator">Store Locator</a>
            </div>
            <div className="footer-socials">
              <a href="#ig">IG</a>
              <a href="#fb">FB</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}