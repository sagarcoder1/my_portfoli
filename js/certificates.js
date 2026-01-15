const certificatesData = [
    {
        id: 'meta-frontend',
        title: 'Front-End Development Virtual Internship',
        issuer: 'Bharat Intern',
        date: 'Aug 2025',
        category: 'web',
        credentialId: 'BI-FE-0825',
        credentialUrl: '',
        image: 'images/Screenshot 2025-11-18 110228.jpg',
        description: 'Completed real-world UI projects focused on responsive layouts, reusable design systems, and collaborative Git workflows.',
        skills: ['HTML', 'CSS', 'JavaScript', 'Responsive UI']
    },
    {
        id: 'meta-design',
        title: 'Product Design Foundations',
        issuer: 'Google UX Design (Coursera)',
        date: 'May 2025',
        category: 'design',
        credentialId: 'UX-2548-25',
        credentialUrl: '',
        image: 'images/WhatsApp Image 2025-07-03 at 22.08.19_671054b7.jpg',
        description: 'Covered user research, persona mapping, and high-fidelity prototyping using Figma, with emphasis on accessibility.',
        skills: ['UX Research', 'Wireframing', 'Figma', 'Accessibility']
    },
    {
        id: 'aws-cloud',
        title: 'AWS Academy Cloud Foundations',
        issuer: 'Amazon Web Services',
        date: 'Feb 2025',
        category: 'cloud',
        credentialId: 'AWS-CLF-0225',
        credentialUrl: '',
        image: 'images/WhatsApp Image 2025-07-03 at 22.08.20_5b55060a.jpg',
        description: 'Learned core AWS services, shared responsibility model, and cost-optimized architectures for scalable deployments.',
        skills: ['AWS', 'Cloud Basics', 'Security', 'DevOps']
    },
    {
        id: 'sih-hackathon',
        title: 'Smart India Hackathon Finalist',
        issuer: 'Ministry of Education, Govt. of India',
        date: 'Dec 2024',
        category: 'hackathon',
        credentialId: 'SIH-2024-FINALS',
        credentialUrl: '',
        image: 'images/WhatsApp Image 2025-07-03 at 22.08.21_b4d09501.jpg',
        description: 'Developed a civic-tech solution within 36 hours, delivering APIs, dashboards, and detailed documentation.',
        skills: ['Problem Solving', 'APIs', 'Team Leadership', 'Presentation']
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const certificateGrid = document.getElementById('certificateGrid');
    if (!certificateGrid) {
        return;
    }

    const searchInput = document.getElementById('certificateSearch');
    const filterButtons = document.querySelectorAll('.certificate-filters button');
    const countElement = document.getElementById('certificateCount');
    const latestElement = document.getElementById('latestCertificate');

    const modal = document.getElementById('certificateModal');
    const modalClose = document.getElementById('certificateModalClose');
    const modalImage = document.getElementById('certificateModalImage');
    const modalTitle = document.getElementById('certificateModalTitle');
    const modalIssuer = document.getElementById('certificateModalIssuer');
    const modalCategory = document.getElementById('certificateModalCategory');
    const modalDescription = document.getElementById('certificateModalDescription');
    const modalMeta = document.getElementById('certificateModalMeta');
    const modalActions = document.getElementById('certificateModalActions');

    let activeFilter = 'all';
    let searchTerm = '';

    const sortedByDate = [...certificatesData].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (countElement) countElement.textContent = certificatesData.length;
    if (latestElement && sortedByDate.length) latestElement.textContent = sortedByDate[0].title;

    function matchesSearch(certificate) {
        if (!searchTerm.trim()) return true;
        const haystack = [
            certificate.title,
            certificate.issuer,
            certificate.date,
            certificate.description,
            certificate.credentialId,
            ...(certificate.skills || [])
        ]
            .join(' ')
            .toLowerCase();

        return haystack.includes(searchTerm.toLowerCase());
    }

    function matchesFilter(certificate) {
        return activeFilter === 'all' || certificate.category === activeFilter;
    }

    function renderCertificates() {
        certificateGrid.innerHTML = '';

        const filtered = certificatesData.filter(cert => matchesFilter(cert) && matchesSearch(cert));

        if (!filtered.length) {
            const emptyState = document.createElement('div');
            emptyState.className = 'certificate-empty';
            emptyState.innerHTML = `
                <i class="fas fa-folder-open"></i>
                <p>No certificates match "${searchTerm}".</p>
                <span>Try a different keyword or choose another filter.</span>
            `;
            certificateGrid.appendChild(emptyState);
            return;
        }

        filtered.forEach(cert => {
            const card = document.createElement('article');
            card.className = 'certificate-card';
            card.dataset.category = cert.category;
            card.innerHTML = `
                <div class="certificate-media">
                    ${cert.image ? `<img src="${cert.image}" alt="${cert.title} certificate">` : `<span class="certificate-initials">${cert.title.slice(0, 1)}</span>`}
                    <span class="certificate-category">${formatCategory(cert.category)}</span>
                </div>
                <div class="certificate-body">
                    <h3>${cert.title}</h3>
                    <p class="certificate-issuer">${cert.issuer}</p>
                    <p class="certificate-date">${cert.date}</p>
                    <p class="certificate-description">${cert.description}</p>
                    <div class="certificate-skills">
                        ${(cert.skills || []).map(skill => `<span>${skill}</span>`).join('')}
                    </div>
                </div>
                <div class="certificate-footer">
                    <div>
                        ${cert.credentialId ? `<span class="credential-id">ID: ${cert.credentialId}</span>` : ''}
                    </div>
                    <div class="certificate-actions">
                        ${cert.credentialUrl ? `<a href="${cert.credentialUrl}" target="_blank" rel="noopener noreferrer" class="btn-link">View Credential</a>` : ''}
                        <button type="button" class="btn-link view-details" data-id="${cert.id}">Details</button>
                    </div>
                </div>
            `;
            certificateGrid.appendChild(card);
        });
    }

    function formatCategory(category) {
        const labels = {
            web: 'Web Development',
            design: 'Design',
            cloud: 'Cloud',
            hackathon: 'Hackathon'
        };
        return labels[category] || 'General';
    }

    function openModal(certificate) {
        if (!modal) return;
        modalImage.src = certificate.image || '';
        modalImage.alt = `${certificate.title} certificate`;
        modalTitle.textContent = certificate.title;
        modalIssuer.textContent = `${certificate.issuer} • ${certificate.date}`;
        modalCategory.textContent = formatCategory(certificate.category);
        modalDescription.textContent = certificate.description;

        modalMeta.innerHTML = '';
        if (certificate.credentialId) {
            const idItem = document.createElement('li');
            idItem.innerHTML = `<strong>Credential ID:</strong> ${certificate.credentialId}`;
            modalMeta.appendChild(idItem);
        }
        if (certificate.skills?.length) {
            const skillsItem = document.createElement('li');
            skillsItem.innerHTML = `<strong>Skills:</strong> ${certificate.skills.join(', ')}`;
            modalMeta.appendChild(skillsItem);
        }

        modalActions.innerHTML = '';
        if (certificate.credentialUrl) {
            const link = document.createElement('a');
            link.href = certificate.credentialUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'btn';
            link.textContent = 'Open Credential';
            modalActions.appendChild(link);
        }

        modal.setAttribute('aria-hidden', 'false');
        modal.classList.add('open');
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    certificateGrid.addEventListener('click', event => {
        const button = event.target.closest('.view-details');
        if (!button) return;
        const certificate = certificatesData.find(cert => cert.id === button.dataset.id);
        if (certificate) {
            openModal(certificate);
        }
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modal) {
        modal.addEventListener('click', event => {
            if (event.target === modal) closeModal();
        });
    }
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal?.classList.contains('open')) {
            closeModal();
        }
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            activeFilter = button.dataset.filter;
            renderCertificates();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', event => {
            searchTerm = event.target.value.trim();
            renderCertificates();
        });
    }

    renderCertificates();
});

