import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';

const Nav = styled(motion.nav)`
    position: fixed;
    top: 0;
    width: 100%;
    background: ${({ theme }) => theme.bgDark}; /* Use bgDark for consistent dark nav */
    backdrop-filter: blur(10px);
    z-index: 1000;
    padding: 1rem 0;
    transition: all 0.3s ease;
    box-shadow: ${({ scrolled }) => scrolled ? '0 2px 10px rgba(0,0,0,0.2)' : 'none'};
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Logo = styled.a`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
`;

const ThemeToggleWrapper = styled.div`
    position: relative;
    margin-left: auto;
    margin-right: 2rem;

    @media (max-width: 768px) {
        margin-right: 1rem;
        margin-left: 1rem;
    }
`;

const ThemeSwitchInput = styled.input`
    display: none;
`;

const ThemeSwitchLabel = styled.label`
    display: block;
    width: 60px;
    height: 30px;
    background: ${({ theme }) => theme.currentTheme === 'light' ? `linear-gradient(135deg, ${theme.primary}, ${theme.accent})` : `linear-gradient(135deg, ${theme.textDark}, #374151)`};
    border-radius: 25px;
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 5px 15px rgba(99, 102, 241, 0.3);
    }

    @media (max-width: 768px) {
        width: 50px;
        height: 25px;
    }
`;

const ThemeSwitchSlider = styled.span`
    position: absolute;
    top: 3px;
    left: 3px;
    width: 24px;
    height: 24px;
    background: white;
    border-radius: 50%;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

    ${ThemeSwitchInput}:checked + ${ThemeSwitchLabel} & {
        transform: translateX(30px);
        background: ${({ theme }) => theme.textDark};
    }

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
        top: 2.5px;
        left: 2.5px;
        ${ThemeSwitchInput}:checked + ${ThemeSwitchLabel} & {
            transform: translateX(25px);
        }
    }
`;

const Icon = styled(motion.span)`
    position: absolute;
    font-size: 12px;
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.primary}; /* Icon color */
`;

const SunIcon = styled(Icon)`
    opacity: ${({ checked }) => (checked ? 0 : 1)};
    transform: ${({ checked }) => (checked ? 'rotate(-180deg)' : 'rotate(0deg)')};
`;

const MoonIcon = styled(Icon)`
    opacity: ${({ checked }) => (checked ? 1 : 0)};
    transform: ${({ checked }) => (checked ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

const NavLinks = styled.ul`
    display: flex;
    list-style: none;
    gap: 2rem;

    @media (max-width: 768px) {
        display: none; /* Hidden by default on mobile */
        &.mobile-active {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: ${({ theme }) => theme.bgDark};
            padding: 2rem 0;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            transition: left 0.3s ease;
        }
    }
`;

const NavLinkItem = styled.li`
    @media (max-width: 768px) {
        margin: 1rem 0;
        text-align: center;
    }
`;

const NavLink = styled.a`
    color: ${({ theme }) => theme.textLight};
    text-decoration: none;
    transition: color 0.3s ease;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

const Hamburger = styled.button`
    display: none;
    background: none;
    border: none;
    color: ${({ theme }) => theme.textLight};
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;

    @media (max-width: 768px) {
        display: block;
    }
`;

const Navbar = ({ toggleTheme, currentTheme }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavLinkClick = (e, id) => {
        e.preventDefault();
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setMobileMenuOpen(false); // Close menu on link click
    };

    return (
        <Nav scrolled={scrolled ? 1 : 0} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
            <NavContainer>
                <Logo href="#home">Ishan Joshi</Logo>
                <ThemeToggleWrapper>
                    <ThemeSwitchInput
                        type="checkbox"
                        id="theme-switch"
                        checked={currentTheme === 'dark'}
                        onChange={toggleTheme}
                    />
                    <ThemeSwitchLabel htmlFor="theme-switch" theme={{ currentTheme }}>
                        <ThemeSwitchSlider theme={{ currentTheme }}>
                            <SunIcon checked={currentTheme === 'dark'}>☀️</SunIcon>
                            <MoonIcon checked={currentTheme === 'dark'}>🌙</MoonIcon>
                        </ThemeSwitchSlider>
                    </ThemeSwitchLabel>
                </ThemeToggleWrapper>
                <NavLinks className={mobileMenuOpen ? 'mobile-active' : ''}>
                    <NavLinkItem><NavLink href="#home" onClick={(e) => handleNavLinkClick(e, '#home')}>Home</NavLink></NavLinkItem>
                    <NavLinkItem><NavLink href="#about" onClick={(e) => handleNavLinkClick(e, '#about')}>About</NavLink></NavLinkItem>
                    <NavLinkItem><NavLink href="#skills" onClick={(e) => handleNavLinkClick(e, '#skills')}>Skills</NavLink></NavLinkItem>
                    <NavLinkItem><NavLink href="#projects" onClick={(e) => handleNavLinkClick(e, '#projects')}>Projects</NavLink></NavLinkItem>
                    <NavLinkItem><NavLink href="#experience" onClick={(e) => handleNavLinkClick(e, '#experience')}>Experience</NavLink></NavLinkItem>
                    <NavLinkItem><NavLink href="#contact" onClick={(e) => handleNavLinkClick(e, '#contact')}>Contact</NavLink></NavLinkItem>
                </NavLinks>
                <Hamburger onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    ☰
                </Hamburger>
            </NavContainer>
        </Nav>
    );
};

export default Navbar;
