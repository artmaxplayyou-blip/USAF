document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const mainContent = document.querySelector('.main-content');

  // Анимация исчезновения экрана загрузки
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.addEventListener('transitionend', () => {
      loader.style.display = 'none';
      
      // Плавное появление основного контента
      mainContent.style.opacity = '1';
      mainContent.style.transform = 'translateY(0)';
    });
  }, 2500); // Длительность анимации загрузки — 2.5 секунды

  // Плавная навигация между страницами (предотвращение резких переходов)
  document.querySelectorAll('a[href^="index.html"], a[href^="report.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Затухание текущего контента
      mainContent.style.opacity = '0';
      mainContent.style.transform = 'translateY(30px)';
      
      setTimeout(() => {
        window.location.href = link.getAttribute('href');
      }, 1000);
    });
  });
});
