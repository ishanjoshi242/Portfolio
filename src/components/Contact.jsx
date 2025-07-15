import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';

const Section = styled(motion.section)`
    padding: 80px 0;
    background: ${({ theme }) => theme.currentBg};
    text-align: center;
    transition: background-color 0.3s ease;
`;

const SectionTitle = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: ${({ theme }) => theme.currentText};
    position: relative;
    transition: color 0.3s ease;

    &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: ${({ theme }) => theme.primary};
        border-radius: 2px;
    }
`;

const ContactContent = styled.div`
    max-width: 600px;
    margin: 0 auto;

    p {
        color: ${({ theme }) => theme.currentText};
        transition: color 0.3s ease;
    }
`;

const ContactInfo = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
`;

const ContactItem = styled(motion.div)`
    background: ${({ theme }) => theme.currentCardBg};
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px ${({ theme }) => theme.currentShadow};
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.currentText};

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }
`;

const ContactIconWrapper = styled(motion.div)`
    width: 50px;
    height: 50px;
    background: ${({ theme }) => theme.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    color: white;
    transition: all 0.3s ease;
`;

const ContactItemTitle = styled.h3`
    color: ${({ theme }) => theme.secondary};
    margin-bottom: 0.5rem;
`;

const ContactLink = styled.a`
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.accent};
    }
`;

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <Section id="contact" ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={sectionVariants}>
            <div className="container">
                <SectionTitle>Let's Connect</SectionTitle>
                <ContactContent>
                    <p>Ready to discuss your next ML project or explore collaboration opportunities? I'd love to hear from you!</p>
                    <ContactInfo>
                        <ContactItem
                            variants={itemVariants}
                            whileHover={{ translateY: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                        >
                            <ContactIconWrapper whileHover={{ scale: 1.2, rotate: 10, background: 'var(--accent)' }}>
                                <FaEnvelope />
                            </ContactIconWrapper>
                            <ContactItemTitle>Email</ContactItemTitle>
                            <ContactLink href="mailto:ishanjoshi.official@gmail.com">ishanjoshi.official@gmail.com</ContactLink>
                        </ContactItem>

                        <ContactItem
                            variants={itemVariants}
                            whileHover={{ translateY: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                        >
                            <ContactIconWrapper whileHover={{ scale: 1.2, rotate: 10, background: 'var(--accent)' }}>
                                <FaPhone />
                            </ContactIconWrapper>
                            <ContactItemTitle>Phone</ContactItemTitle>
                            <ContactLink href="tel:+919079638779">+91-9079638779</ContactLink>
                        </ContactItem>

                        <ContactItem
                            variants={itemVariants}
                            whileHover={{ translateY: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                        >
                            <ContactIconWrapper whileHover={{ scale: 1.2, rotate: 10, background: 'var(--accent)' }}>
                                <FaLinkedin />
                            </ContactIconWrapper>
                            <ContactItemTitle>LinkedIn</ContactItemTitle>
                            <ContactLink href="https://linkedin.com/in/ishan-chandra-joshi/" target="_blank" rel="noopener noreferrer">ishan-chandra-joshi</ContactLink>
                        </ContactItem>

                        <ContactItem
                            variants={itemVariants}
                            whileHover={{ translateY: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                        >
                            <ContactIconWrapper whileHover={{ scale: 1.2, rotate: 10, background: 'var(--accent)' }}>
                                <FaGithub />
                            </ContactIconWrapper>
                            <ContactItemTitle>GitHub</ContactItemTitle>
                            <ContactLink href="https://github.com/ishanjoshi242" target="_blank" rel="noopener noreferrer">ishanjoshi242</ContactLink>
                        </ContactItem>
                    </ContactInfo>
                </ContactContent>
            </div>
        </Section>
    );
};

export default Contact;
