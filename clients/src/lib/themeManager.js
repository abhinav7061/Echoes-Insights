export default function applyTheme() {
    const element = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function onWindowMatch() {
        if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
            element.classList.add('dark');
        } else {
            element.classList.remove('dark');
        }
    }

    onWindowMatch();

    darkQuery.addEventListener('change', (event) => {
        if (!("theme" in localStorage)) {
            if (event.matches) {
                element.classList.add('dark');
            } else {
                element.classList.remove('dark');
            }
        }
    });
}
