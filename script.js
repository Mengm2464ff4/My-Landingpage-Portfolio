
        ( () => {
            'use strict';

            /*  Mobile Menu  */
            const hamburger = document.getElementById( 'hamburger' );
            const navDrawer = document.getElementById( 'navDrawer' );
            const navOverlay = document.getElementById( 'navOverlay' );
            const drawerClose = document.getElementById( 'drawerClose' );

            const openMenu = () => {
                hamburger.classList.add( 'open' );
                navDrawer.classList.add( 'open' );
                navOverlay.classList.add( 'active' );
                document.body.style.overflow = 'hidden';
                hamburger.setAttribute( 'aria-expanded', 'true' );
            };
            const closeMenu = () => {
                hamburger.classList.remove( 'open' );
                navDrawer.classList.remove( 'open' );
                navOverlay.classList.remove( 'active' );
                document.body.style.overflow = '';
                hamburger.setAttribute( 'aria-expanded', 'false' );
            };

            hamburger?.addEventListener( 'click', () =>
                navDrawer.classList.contains( 'open' ) ? closeMenu() : openMenu() );
            drawerClose?.addEventListener( 'click', closeMenu );
            navOverlay?.addEventListener( 'click', closeMenu );
            document.addEventListener( 'keydown', e => { if ( e.key === 'Escape' ) closeMenu(); } );

            document.querySelectorAll( '.nav-link' ).forEach( link => {
                link.addEventListener( 'click', e => {
                    const href = link.getAttribute( 'href' );
                    if ( href?.startsWith( '#' ) ) {
                        e.preventDefault();
                        closeMenu();
                        document.querySelector( href )?.scrollIntoView( { behavior: 'smooth' } );
                    }
                } );
            } );

            /*  Theme Toggle */
            const themeBtn = document.getElementById( 'themeToggle' );
            const themeIcon = themeBtn?.querySelector( 'i' );
            if ( localStorage.getItem( 'theme' ) === 'dark' ) {
                document.body.classList.add( 'dark' );
                if ( themeIcon ) themeIcon.className = 'fas fa-sun';
            }
            themeBtn?.addEventListener( 'click', () => {
                const dark = document.body.classList.toggle( 'dark' );
                localStorage.setItem( 'theme', dark ? 'dark' : 'light' );
                if ( themeIcon ) themeIcon.className = dark ? 'fas fa-sun' : 'fas fa-moon';
            } );

            window.addEventListener( 'scroll', () =>
                document.getElementById( 'navbar' )?.classList.toggle( 'scrolled', scrollY > 20 ) );

            const skillObs = new IntersectionObserver( entries => {
                entries.forEach( e => {
                    if ( e.isIntersecting ) {
                        const el = e.target;
                        el.style.width = el.dataset.w + '%';
                        skillObs.unobserve( el );
                    }
                } );
            }, { threshold: 0.3 } );
            document.querySelectorAll( '.progress-fill' ).forEach( f => skillObs.observe( f ) );

            /* ── Projects Data ── */
            const BASE_PROJECTS = [
                {
                    title: 'Personal Portfolio Website',
                    desc: 'Responsive personal portfolio showcasing skills and projects, built with HTML, CSS, and JavaScript with dark mode and smooth animations.',
                    tags: [ 'HTML5', 'CSS3', 'JavaScript' ],
                    img: 'images/Portfolio.png',
                    demo: 'https://mengm2464ff4.github.io/My-Landingpage-Portfolio/', code: 'https://github.com/Mengm2464ff4/My-Landingpage-Portfolio'
                },
                {
                    title: 'Simple E-Commerce Page',
                    desc: 'Product listing and shopping cart layout with responsive design, interactive elements, and local storage for cart persistence.',
                    tags: [ 'React JS', 'Tailwind CSS'],
                    img: 'images/E-CommerceProject.png',
                    demo: 'https://mengm2464ff4.github.io/E-CommerceProject/', code: 'https://github.com/Mengm2464ff4/E-CommerceProject'
                },
                {
                    title: 'Portfolio Website',
                    desc: 'Fully responsive personal portfolio with dark mode toggle, smooth scroll animations, mobile-first layout, and a PDF CV generator built with jsPDF.',
                    tags: [ 'React JS', "Tailwind CSS", 'Frame motion' ],
                    img: 'images/PortfolioJS.png',
                    demo: 'https://my-portfolio-gold-chi-45.vercel.app/', code: 'https://github.com/Mengm2464ff4/My-Portfolio'
                }

            ];
            const MORE_PROJECTS = [
                {
                    title: 'Weather Dashboard',
                    desc: 'Real-time weather app using OpenWeather API with dynamic icons, city search, and temperature unit toggling.',
                    tags: [ 'API', 'React JS', 'Fetch', 'Error handling' , 'Tailwind CSS' ],
                    img: 'images/Weather-App.png',
                    demo: 'https://dashboard-ui-five-liard.vercel.app/', code: 'https://github.com/Mengm2464ff4/DashboardUI'
                },
                {
                    title: 'Task Manager App',
                    desc: 'Task management app with drag-and-drop functionality and local storage persistence for saving tasks between sessions.',
                    tags: [ 'React JS', 'LocalStorage', 'Tailwind CSS' ],
                    img: 'images/Task-manager.png',
                    demo: 'https://task-manager-gamma-sooty-58.vercel.app/', code: 'https://github.com/Mengm2464ff4/Task-Manager'
                },
            ];

            const grid = document.getElementById( 'projectsGrid' );
            const loadBtn = document.getElementById( 'loadMoreBtn' );
            let showAll = false;

            function renderProjects() {
                if ( !grid ) return;
                const data = showAll ? [ ...BASE_PROJECTS, ...MORE_PROJECTS ] : BASE_PROJECTS;
                grid.innerHTML = '';
                data.forEach( ( p, i ) => {
                    const card = document.createElement( 'div' );
                    card.className = 'project-card';
                    card.style.animationDelay = `${ i * 0.1 }s`;
                    card.innerHTML = `
        <div class="proj-img"><img src="${ p.img }" alt="${ p.title }" loading="lazy"></div>
        <div class="proj-info">
          <h3>${ p.title }</h3>
          <p>${ p.desc }</p>
          <div class="proj-tags">${ p.tags.map( t => `<span class="tag">${ t }</span>` ).join( '' ) }</div>
          <div class="proj-btns">
            <button class="pbtn pbtn-demo" onclick="window.open('${ p.demo }','_blank')"><i class="fas fa-external-link-alt"></i> Live Demo</button>
            <button class="pbtn pbtn-code" onclick="window.open('${ p.code }','_blank')"><i class="fab fa-github"></i> Code</button>
          </div>
        </div>`;
                    grid.appendChild( card );
                } );
            }

            loadBtn?.addEventListener( 'click', () => {
                showAll = !showAll;
                renderProjects();
                loadBtn.innerHTML = showAll
                    ? '<i class="fab fa-github"></i> Show less'
                    : '<i class="fab fa-github"></i> Explore more projects';
            } );
            renderProjects();

            /* ── Contact Form ── */
            const form = document.getElementById( 'internForm' );
            const feedback = document.getElementById( 'formFeedback' );
            form?.addEventListener( 'submit', e => {
                e.preventDefault();
                const name = document.getElementById( 'name' ).value.trim();
                const email = document.getElementById( 'email' ).value.trim();
                const msg = document.getElementById( 'message' ).value.trim();
                if ( !name || !email || !msg ) {
                    feedback.style.color = '#ef4444';
                    feedback.textContent = '⚠ Please fill in all fields.'; return;
                }
                if ( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( email ) ) {
                    feedback.style.color = '#ef4444';
                    feedback.textContent = '⚠ Please enter a valid email address.'; return;
                }
                feedback.style.color = '#10b981';
                feedback.textContent = `✓ Thanks ${ name }! I'll be in touch soon.`;
                form.reset();
                setTimeout( () => feedback.textContent = '', 4000 );
            } );

            /*  Professional CV Generator */
            const dlBtn = document.getElementById( 'downloadCVBtn' );

        async function generateCV() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const W = 210, H = 297;

    // Palette
    const navy = [15, 23, 42];
    const blue = [29, 78, 216];
    const teal = [14, 148, 136];
    const white = [255, 255, 255];
    const dgray = [55, 65, 81];
    const lgray = [180, 195, 215];

    // Left sidebar 
    doc.setFillColor(...navy);
    doc.rect(0, 0, 63, H, 'F');

    // Profile image
    const cx = 31.5, cy = 44, cr = 22;
    let imgData = null;
    try {
        const imgEl = document.querySelector('.profile-image');
        if (imgEl && imgEl.naturalWidth > 0 && !imgEl.src.includes('placehold')) {
            const size = 220; 
            const c = document.createElement('canvas');
            c.width = size;
            c.height = size;
            const ctx = c.getContext('2d');
            // Clip path: perfect circle
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            // Draw the image cropped to a square (center-crop)
            const s = Math.min(imgEl.naturalWidth, imgEl.naturalHeight);
            const ox = (imgEl.naturalWidth - s) / 2;
            const oy = (imgEl.naturalHeight - s) / 2;
            ctx.drawImage(imgEl, ox, oy, s, s, 0, 0, size, size);
            imgData = c.toDataURL('image/png'); // PNG keeps transparency for clean edges
        }
    } catch (_) {}

    doc.setFillColor(...teal);
    doc.circle(cx, cy, cr + 1.5, 'F');
    doc.setFillColor(...navy);
    doc.circle(cx, cy, cr, 'F');

    if (imgData) {
        doc.addImage(imgData, 'PNG', cx - cr, cy - cr, cr * 2, cr * 2);
    } else {
        doc.setFillColor(...blue);
        doc.circle(cx, cy, cr, 'F');
        doc.setTextColor(...white);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(20);
        doc.text('VV', cx, cy + 3.5, { align: 'center' });
    }

    // Name
    doc.setTextColor(...white);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.text('VUTHY VUTHA', cx, 76, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(99, 179, 237);
    doc.text('FRONT-END DEVELOPER', cx, 83, { align: 'center' });
    doc.setDrawColor(40, 60, 90);
    doc.setLineWidth(0.4);
    doc.line(8, 89, 55, 89);

    let lY = 97;
    const leftSec = t => {
        doc.setTextColor(...teal);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.text(t.toUpperCase(), 8, lY);
        doc.setDrawColor(40, 60, 90);
        doc.setLineWidth(0.35);
        doc.line(8, lY + 1.5, 55, lY + 1.5);
        lY += 8;
    };
    const leftLine = txt => {
        doc.setTextColor(...lgray);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.4);
        const lines = doc.splitTextToSize(txt, 44);
        doc.text(lines, 8, lY);
        lY += lines.length * 4.8;
    };

    leftSec('Contact');
    leftLine('Phone:  096-31-93-606');
    leftLine('Email:  SongMeng66667777@gmail.com');
    leftLine('GitHub:  github.com/Mengm2464ff4');
    leftLine('Location:  271 Street, Phnom Penh');
    lY += 4;

    leftSec('Tech Skills');
    [
        ['HTML5', 90], ['CSS3', 85], ['JavaScript', 80], ['React.js', 70],
        ['Tailwind CSS', 75], ['Git & GitHub', 75], ['Responsive Design', 88]
    ].forEach(([n, p]) => {
        doc.setTextColor(200, 215, 230);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.4);
        doc.text(n, 8, lY);
        doc.setTextColor(...teal);
        doc.text(`${p}%`, 55, lY, { align: 'right' });
        lY += 3.5;
        doc.setFillColor(40, 60, 90);
        doc.roundedRect(8, lY, 47, 2.8, 1.4, 1.4, 'F');
        doc.setFillColor(...blue);
        doc.roundedRect(8, lY, 47 * p / 100, 2.8, 1.4, 1.4, 'F');
        lY += 6;
    });
    lY += 2;

    leftSec('Languages');
    leftLine('Khmer — Native / Fluent');
    leftLine('English — Proficient');
    lY += 4;

    leftSec('Soft Skills');
    ['Communication', 'Problem Solving', 'Creativity', 'Team Work', 'Fast Learner'].forEach(s => {
        doc.setTextColor(...lgray);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.4);
        doc.text(`• ${s}`, 8, lY);
        lY += 5;
    });

    // Right column 
    let rY = 16;
    const rX = 72, rW = 128;

    const rightSec = t => {
        doc.setTextColor(...navy);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11.5);
        doc.text(t, rX, rY);
        doc.setFillColor(...blue);
        doc.rect(rX, rY + 1.8, 28, 1.1, 'F');
        doc.setFillColor(...teal);
        doc.rect(rX + 30, rY + 1.8, 7, 1.1, 'F');
        rY += 9;
    };
    const body = (txt, indent = 0) => {
        doc.setTextColor(...dgray);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.4);
        const lines = doc.splitTextToSize(txt, rW - indent);
        doc.text(lines, rX + indent, rY);
        rY += lines.length * 5.1;
    };
    const bold = txt => {
        doc.setTextColor(...navy);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9.5);
        doc.text(txt, rX, rY);
        rY += 6;
    };
    const small = (txt, col = dgray) => {
        doc.setTextColor(...col);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.8);
        doc.text(txt, rX, rY);
        rY += 5;
    };

    rightSec('About Me');
    body('Motivated and creative student at Norton University, majoring in English (Media). With a strong passion for front-end web development, I have been learning HTML, CSS, and JavaScript to build responsive, user-friendly websites. Fluent in Khmer and proficient in English, I bring strong communication skills, adaptability, and a genuine eagerness to learn. Actively seeking a front-end internship or junior role to contribute enthusiasm and growing technical expertise to a dynamic team.');
    rY += 5;

    rightSec('Projects');
    bold('Personal Portfolio Website');
    small('React JS · Tailwind CSS · Frame Motion  —  github.com/Mengm2464ff4', blue);
    body('Built a modern, fully responsive portfolio using a mobile-first approach, integrating dark mode, smooth scroll animations, and a custom interactive cursor to enhance user engagement.');
    rY += 3;
    bold('Simple E-Commerce Page');
    small('React JS · Tailwind CSS · Responsive Design', blue);
    body('Product listing with shopping cart, add-to-cart functionality and responsive Tailwind CSS layout for all screen sizes.');
    rY += 3;
    bold('Weather Dashboard');
    small('React JS · OpenWeather API · Fetch', blue);
    body('Real-time weather application with city search, dynamic condition icons, temperature unit toggling, and graceful API error handling.');
    rY += 5;

    rightSec('Education');
    bold('Front-End Development Training');
    small('ETEC Center  ·  2024', teal);
    body('Intensive training covering HTML, CSS, JavaScript, responsive design, and modern development tooling and workflows.');
    rY += 3;
    bold('Bachelor of Arts — English (Media)');
    small('Norton University  ·  Ongoing', teal);
    body('Developing communication, analytical, and media skills alongside practical web development expertise.');
    rY += 5;

    rightSec('Additional Info');
    body('• Actively building projects on GitHub (github.com/Mengm2464ff4)');
    body('• Self-learning React.js, Tailwind CSS, and modern ES6+ JavaScript');
    body('• Available immediately for internships / junior front-end roles');
    rY += 4;

    rightSec('References');
    body('Available upon request. Feel free to contact me directly:');
    small('096-31-93-606   | https://mail.google.com/mail/u/0/?fs=1&to=SongMeng66667777@gmail.com', blue);

    // Footer strip
    doc.setFillColor(...navy);
    doc.rect(0, H - 10, W, 10, 'F');
    doc.setTextColor(130, 155, 195);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(6.8);
    doc.text('Available for internships & junior front-end developer roles — Vuthy Vutha © 2025', W / 2, H - 4, { align: 'center' });

    doc.save('Vuthy_Vutha_FrontEnd_CV.pdf');
}
            dlBtn?.addEventListener( 'click', e => {
                e.preventDefault();
                generateCV().catch( () => alert( 'CV generation failed. Please try again.' ) );
            } );

        } )();
