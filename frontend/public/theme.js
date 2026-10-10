try { document.documentElement.dataset.theme = localStorage.getItem('hero-theme') || 'dark'; }
catch { document.documentElement.dataset.theme = 'dark'; }
