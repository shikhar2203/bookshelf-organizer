import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularIndeterminate from './components/CircularIndeterminate';
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import TextField from '@mui/material/TextField';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { handleAddToBookshelf } from './components/bookshelfUtils';

const BookSearch = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:900px)');

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 800);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            if (debouncedSearchTerm) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://openlibrary.org/search.json?q=${debouncedSearchTerm}&limit=10&page=1`);
                    setBooks(response.data.docs);
                } catch (err) {
                    setError(err);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBooks();
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);

    const addToBookshelf = handleAddToBookshelf(bookshelf, setBookshelf);

    return (
        <div style={{ marginTop: '10px', marginBlock: '10px' }}>
            <div style={{ float: isSmallScreen ? 'none' : 'right', marginTop: '10px', paddingRight: '10px' }}>
                <Link style={{ textTransform: "none" }} to={{ pathname: "/bookshelf" }}>
                    <Button sx={{
                        backgroundColor: 'green', padding: '10px', borderRadius: '60', marginLeft: '20px', backgroundColor: 'green',
                        borderRadius: '10px',
                        ":hover": {
                            backgroundColor: 'rgb(115, 220, 109)',
                            cursor: 'pointer'
                        }
                    }}>
                        <Typography variant='h8' sx={{
                            color: 'white', textTransform: 'none', ":hover": {
                                cursor: 'pointer'
                            },
                        }}>
                            My Bookshelf
                        </Typography>
                    </Button>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

                <Typography variant="h5" gutterBottom>
                    Search by Book Name
                </Typography>
                <TextField
                    label="Enter Book Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginBottom: '20px', width: isSmallScreen ? '75vw' : '25vw' }}
                    size="small"
                />
            </div>
            {searchTerm.length === 0 ? (
                <Typography variant="h4" color="textSecondary" align="center" style={{ marginTop: '20vh', fontWeight: 'bold' }}>
                    Type then book name in the search box...
                </Typography>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '8vw', marginRight: '8vw' }}>
                    {error ? (
                        <p>Error fetching data: {error.message}</p>
                    ) : (
                        loading ? (
                            <CircularIndeterminate />
                        ) : (
                            <Grid container spacing={5}>
                                {books.map((items) => (
                                    <Grid item sm={6} xs={12} md={3} key={items.key}>
                                        <Box sx={{
                                            borderRadius: '20px',
                                            border: '1px solid black',
                                            padding: '10px',
                                            width: isSmallScreen ? '80vw' : isMediumScreen ? '40vw' : "18vw",
                                            height: '40vh',
                                            position: 'relative', // Add this to position the button
                                        }}>
                                            <Typography variant="h6" color="initial">
                                                <span style={{ fontWeight: 'bold' }}>Book Title: </span> {items.title}
                                            </Typography>
                                            <Typography variant="h6" color="initial">
                                                <span style={{ fontWeight: 'bold' }}>Edition Count: </span> {items.edition_count}
                                            </Typography>
                                            <Button
                                                onClick={() => addToBookshelf(items.title, items.edition_count)}
                                                variant="contained"
                                                color={bookshelf.some(b => b.title === items.title && b.edition_count === items.edition_count) ? "error" : "success"}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: '10px',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    borderRadius: '10px',
                                                }}
                                            >
                                                <Typography variant="h8" color="initial" style={{ color: 'white', textTransform: 'none' }}>
                                                    {bookshelf.some(b => b.title === items.title && b.edition_count === items.edition_count) ? "Remove" : "Add to Bookshelf"}
                                                </Typography>
                                            </Button>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default BookSearch;
