import { Box, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "animate.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
      display: 'flex',
      width: 150,
      height: 150,
      borderRadius: '50%',
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100px',
      height: '100px',
    },
}));
  
interface LoadingPageProps {
    children: React.ReactNode;
    isDarkMode: boolean;
}

const LoadingPage = ({ children, isDarkMode }: LoadingPageProps) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true);

    //hide the overflow
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
        document.body.style.overflow = 'unset'; 
        };
    }, []);

    //loading componemnt (future improvement)
    useEffect(() => {
        setTimeout(async() => {
        setLoading(false);
        }, 1000);
    },[]);

    return !loading ? (
        <React.Fragment>{children}</React.Fragment>
        ) : (
            <Box className={classes.root}>
                <Box className="animate__animated animate__bounceOut">
                    <Box className={classes.circle}>
                        <img
                            src={require('./assets/icon.png')}
                            className={classes.image}
                        />
                    </Box>
                </Box>
            </Box>
        );
};
export default LoadingPage;

