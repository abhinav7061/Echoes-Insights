const addIdsToHeadingsInContents = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    let headingIndex = 0;

    doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((heading) => {
        // if (!heading.id) {
        const id = `section-${headingIndex}`;
        heading.id = id;
        // }-+
        headingIndex += 1;
    });

    return doc.body.innerHTML;
};

export default addIdsToHeadingsInContents;