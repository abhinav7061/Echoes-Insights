const preprocessContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    doc.querySelectorAll('a[target="_blank"]').forEach(link => {
        if (link.href.startsWith(window.location.href + '#') || link.href.startsWith('#')) {
            link.removeAttribute('target');
        }
    });

    return doc.body.innerHTML;
};

export default preprocessContent;