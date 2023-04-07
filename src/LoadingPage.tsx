import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "animate.css";

interface LoadingPageProps {
    children: React.ReactNode;
    isDarkMode: boolean;
}

const LoadingPage = ({ children, isDarkMode }: LoadingPageProps) => {
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
            <Box
                bgcolor={isDarkMode ? 'text.secondary' : 'primary.secondary'}
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',}}
            >
                <Box className="animate__animated animate__bounceOut">
                    <img
                    src={require('./assets/icon.png')}
                    width={"100px"}
                    height={"100px"}
                    />
                </Box>
            </Box>
        );
};
export default LoadingPage;

