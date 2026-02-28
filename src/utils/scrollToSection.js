export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const handleHashLink = (e, hash) => {
  e.preventDefault();
  const sectionId = hash.replace('#', '');
  scrollToSection(sectionId);
  // Update URL without page reload
  window.history.pushState(null, '', hash);
};
