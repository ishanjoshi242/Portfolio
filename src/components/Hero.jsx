import React, { useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled(motion.section)`
    height: 100vh;
    background: linear-gradient(135deg, ${({ theme }) => theme.bgDark} 0%, ${({ theme }) => theme.primary} 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: ${({ theme }) => theme.textLight};
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
        opacity: 0.3;
    }
`;

const HeroContent = styled(motion.div)`
    position: relative;
    z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
    font-size: 3.5rem;
    margin-bottom: 1rem;
    background: linear-gradient(45deg, ${({ theme }) => theme.textLight}, ${({ theme }) => theme.accent});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: floating 3s ease-in-out infinite;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const HeroSubtitle = styled(motion.h2)`
    font-size: 1.5rem;
    margin-bottom: 2rem;
    opacity: 0.9;
`;

const HeroDescription = styled(motion.p)`
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
`;

const CtaButton = styled(motion.a)`
    display: inline-block;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.bgDark};
    padding: 12px 30px;
    border-radius: 50px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(245, 158, 11, 0.3);
    }
`;

const Particle = styled.div`
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    animation: float ${props => props.duration}s ease-in-out infinite;
    animation-delay: ${props => props.delay}s;
    left: ${props => props.left}%;
    top: ${props => props.top}%;
`;

const Hero = () => {
    useEffect(() => {
        const handleParallax = () => {
            const scrolled = window.pageYOffset;
            const heroElement = document.getElementById('home');
            if (heroElement) {
                heroElement.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        };
        window.addEventListener('scroll', handleParallax);
        return () => window.removeEventListener('scroll', handleParallax);
    }, []);

    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const buttonVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.5 } }
    };

    const typingEffect = (text) => {
        const chars = text.split('');
        return chars.map((char, index) => (
            <motion.span
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05, duration: 0.1 }}
            >
                {char}
            </motion.span>
        ));
    };

    return (
        <HeroSection id="home">
            {Array.from({ length: 50 }).map((_, i) => (
                <Particle
                    key={i}
                    duration={3 + Math.random() * 4}
                    delay={Math.random() * 2}
                    left={Math.random() * 100}
                    top={Math.random() * 100}
                />
            ))}
            <HeroContent
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.2 } }
                }}
            >
                <HeroTitle variants={textVariants}>
                    {typingEffect("Ishan Chandra Joshi")}
                </HeroTitle>
                <HeroSubtitle variants={textVariants}>Machine Learning Engineer</HeroSubtitle>
                <HeroDescription variants={textVariants}>
                    Passionate about analyzing complex datasets to drive intelligent decision-making and automation. Currently working at AVL India, building cutting-edge ML solutions.
                </HeroDescription>
                <CtaButton href="#contact" variants={buttonVariants}>Get In Touch</CtaButton>
            </HeroContent>
        </HeroSection>
    );
};

export default Hero;
