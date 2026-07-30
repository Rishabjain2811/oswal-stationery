// Read More Functionality for Content Sections
document.addEventListener('DOMContentLoaded', function() {
  const contentSections = document.querySelectorAll('.content-section');
  
  contentSections.forEach(section => {
    const contentWrapper = section.querySelector('.content-wrapper');
    if (!contentWrapper) return;
    
    // Create read more button
    const readMoreBtn = document.createElement('button');
    readMoreBtn.className = 'read-more-btn';
    readMoreBtn.textContent = 'Read More';
    readMoreBtn.setAttribute('aria-expanded', 'false');
    
    // Insert button after content wrapper
    contentWrapper.appendChild(readMoreBtn);
    
    // Toggle functionality
    readMoreBtn.addEventListener('click', function() {
      const isExpanded = section.classList.contains('expanded');
      
      if (isExpanded) {
        section.classList.remove('expanded');
        readMoreBtn.textContent = 'Read More';
        readMoreBtn.setAttribute('aria-expanded', 'false');
      } else {
        section.classList.add('expanded');
        readMoreBtn.textContent = 'Read Less';
        readMoreBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });
});
