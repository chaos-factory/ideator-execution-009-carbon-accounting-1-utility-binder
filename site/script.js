/**
 * Utility Binder Landing Page - Minimal JavaScript Behaviors
 * Handles: sticky header shadow, notice bar dismiss, modal dialog, smooth scrolling
 */

(function() {
    'use strict';
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    /**
     * Sticky Header - Add shadow on scroll
     */
    function initStickyHeader() {
        const header = document.getElementById('main-header');
        if (!header) return;
        
        function updateHeaderShadow() {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Initial check
        updateHeaderShadow();
        
        // Update on scroll (throttled)
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateHeaderShadow();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
    
    /**
     * Notice Bar - Dismissible with localStorage
     */
    function initNoticeBar() {
        const noticeBar = document.getElementById('notice-bar');
        const dismissBtn = document.getElementById('dismiss-notice');
        
        if (!noticeBar || !dismissBtn) return;
        
        // Check if notice was previously dismissed
        const noticeDismissed = localStorage.getItem('utilityBinderNoticeDismissed');
        if (noticeDismissed === 'true') {
            noticeBar.style.display = 'none';
            return;
        }
        
        // Handle dismiss
        dismissBtn.addEventListener('click', function() {
            noticeBar.style.display = 'none';
            localStorage.setItem('utilityBinderNoticeDismissed', 'true');
        });
    }
    
    /**
     * Modal Dialog for Demo Video
     */
    function initModal() {
        const modal = document.getElementById('demo-modal');
        const openButtons = document.querySelectorAll('#demo-video-btn, #demo-video-btn-2');
        const closeButton = document.getElementById('close-modal');
        const modalOverlay = modal ? modal.querySelector('.modal-overlay') : null;
        const videoIframe = document.getElementById('demo-video');
        
        if (!modal) return;
        
        // Placeholder video URL (can be updated with actual demo video)
        const videoSrc = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        
        // Focus trap elements
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        let firstFocusableElement;
        let lastFocusableElement;
        
        function openModal() {
            modal.removeAttribute('hidden');
            if (videoIframe) {
                videoIframe.src = videoSrc;
            }
            
            // Set up focus trap
            const focusableContent = modal.querySelectorAll(focusableElements);
            firstFocusableElement = focusableContent[0];
            lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            // Focus first element
            if (closeButton) {
                closeButton.focus();
            }
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
        
        function closeModal() {
            modal.setAttribute('hidden', '');
            if (videoIframe) {
                videoIframe.src = '';
            }
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
        
        // Open modal on button clicks
        openButtons.forEach(function(btn) {
            btn.addEventListener('click', openModal);
        });
        
        // Close modal on close button
        if (closeButton) {
            closeButton.addEventListener('click', closeModal);
        }
        
        // Close modal on overlay click
        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeModal);
        }
        
        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.hasAttribute('hidden')) {
                closeModal();
            }
        });
        
        // Focus trap
        modal.addEventListener('keydown', function(e) {
            if (modal.hasAttribute('hidden')) return;
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
    
    /**
     * Smooth Scrolling for Anchor Links
     */
    function initSmoothScroll() {
        // Respect reduced motion preference
        if (prefersReducedMotion) return;
        
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                
                // Ignore empty hashes or just "#"
                if (!href || href === '#' || href === '#app' || href === '#sample-pack' || href === '#contact' || href === '#transcript') {
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.getElementById('main-header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    /**
     * Product Dropdown Menu (Accessible)
     */
    function initDropdown() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        const hasDropdown = document.querySelector('.has-dropdown');
        
        if (!dropdownToggle || !dropdownMenu) return;
        
        // Toggle on click
        dropdownToggle.addEventListener('click', function() {
            const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
            dropdownToggle.setAttribute('aria-expanded', !isExpanded);
        });
        
        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!hasDropdown.contains(e.target)) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close on ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && dropdownToggle.getAttribute('aria-expanded') === 'true') {
                dropdownToggle.setAttribute('aria-expanded', 'false');
                dropdownToggle.focus();
            }
        });
        
        // Handle keyboard navigation in dropdown
        const dropdownLinks = dropdownMenu.querySelectorAll('a');
        dropdownLinks.forEach(function(link, index) {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    const nextLink = dropdownLinks[index + 1] || dropdownLinks[0];
                    nextLink.focus();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    const prevLink = dropdownLinks[index - 1] || dropdownLinks[dropdownLinks.length - 1];
                    prevLink.focus();
                }
            });
        });
    }
    
    /**
     * Initialize all behaviors on DOM ready
     */
    function init() {
        initStickyHeader();
        initNoticeBar();
        initModal();
        initSmoothScroll();
        initDropdown();
    }
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
