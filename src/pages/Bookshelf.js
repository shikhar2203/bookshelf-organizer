import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { handleAddToBookshelf } from './components/bookshelfUtils';

const Bookshelf = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const isMediumScreen = useMediaQuery('(max-width:900px)');
    const [bookshelf, setBookshelf] = useState([]);

    useEffect(() => {
        const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
        setBookshelf(storedBookshelf);
    }, []);

    const addToBookshelf = handleAddToBookshelf(bookshelf, setBookshelf);

    return (
        <div style={{ marginTop: '10px' }}>
            <div style={{ float: isSmallScreen ? 'none' : 'right', marginTop: '10px', paddingRight: '10px' }}>
                <Link style={{ textTransform: "none" }} to={{ pathname: "/" }}>
                    <Button sx={{
                        backgroundColor: 'green', padding: '10px', marginLeft: '20px',
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
                            Go Back
                        </Typography>
                    </Button>
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
                    My Bookshelf
                </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '8vw', marginRight: '8vw' }}>
                {bookshelf.length === 0 ? (
                    <Typography variant="h4" color="textSecondary" align="center" style={{ marginTop: '20vh', fontWeight: 'bold' }}>
                        Your Bookshelf is Empty
                    </Typography>
                ) : (
                    <Grid container spacing={5}>
                        {bookshelf.map((items) => (
                            <Grid item sm={6} xs={12} md={3} key={items.key}>
                                <Box sx={{
                                    borderRadius: '20px',
                                    border: '1px solid black',
                                    padding: '10px',
                                    width: isSmallScreen ? '80vw' : isMediumScreen ? '35vw' : "18vw",
                                    height: '40vh',
                                    position: 'relative',
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
                )}
            </div>
        </div>
    );
};

export default Bookshelf;