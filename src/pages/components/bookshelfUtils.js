const handleAddToBookshelf = (bookshelf, setBookshelf) => (bookTitle, editionCount) => {
    const book = { title: bookTitle, edition_count: editionCount };
    const bookIndex = bookshelf.findIndex(b => b.title === bookTitle && b.edition_count === editionCount);

    if (bookIndex !== -1) {
        const updatedBookshelf = bookshelf.filter((_, index) => index !== bookIndex);
        setBookshelf(updatedBookshelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    } else {
        const updatedBookshelf = [...bookshelf, book];
        setBookshelf(updatedBookshelf);
        localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
    }
};

export { handleAddToBookshelf };
