import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const Section = styled(motion.section)`
    padding: 80px 0;
    background: ${({ theme }) => theme.currentBg};
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

const AboutContent = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
`;

const AboutText = styled.div`
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.currentText};
    transition: color 0.3s ease;
`;

const AboutStats = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const StatCard = styled(motion.div)`
    background: ${({ theme }) => theme.currentCardBg};
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 10px 30px ${({ theme }) => theme.currentShadow};
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.currentText};

    &:hover {
        transform: translateY(-5px);
    }
`;

const StatNumber = styled.div`
    font-size: 2.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.primary};
    margin-bottom: 0.5rem;
`;

const Counter = ({ target, suffix = '' }) => {
    const [count, setCount] = React.useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000; // 2 seconds
        let startTime = null;

        const animateCount = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = (currentTime - startTime) / duration;
            const current = Math.min(progress, 1) * target;
            setCount(Math.ceil(current));
            if (progress < 1) {
                requestAnimationFrame(animateCount);
            }
        };

        requestAnimationFrame(animateCount);
    }, [isInView, target]);

    return <StatNumber ref={ref}>{count}{suffix}</StatNumber>;
};

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <Section id="about" ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={sectionVariants}>
            <div className="container">
                <SectionTitle>About Me</SectionTitle>
                <AboutContent>
                    <AboutText>
                        <p>I'm a passionate Machine Learning Engineer currently working at AVL India, where I apply cutting-edge AI technologies to solve complex real-world problems. With a strong foundation in Python, SQL, and various ML frameworks, I specialize in developing intelligent systems that drive automation and decision-making.</p>
                        <p>My journey in technology has been marked by innovative projects ranging from faulty bearing detection systems to smart road safety management solutions. I believe in the power of data-driven insights and am constantly exploring new ways to leverage machine learning for impactful solutions.</p>
                        <p>When I'm not coding, you'll find me exploring the latest developments in AI, contributing to open-source projects, or sharing knowledge with the developer community.</p>
                    </AboutText>
                    <AboutStats>
                        <StatCard variants={cardVariants}>
                            <Counter target={3} suffix="+" />
                            <div>Major Projects</div>
                        </StatCard>
                        <StatCard variants={cardVariants}>
                            <Counter target={7} suffix="+" />
                            <div>Certifications</div>
                        </StatCard>
                        <StatCard variants={cardVariants}>
                            <Counter target={1} />
                            <div>Current Role</div>
                        </StatCard>
                        <StatCard variants={cardVariants}>
                            <Counter target={4} suffix="th" />
                            <div>Hackathon Ranking</div>
                        </StatCard>
                    </AboutStats>
                </AboutContent>
            </div>
        </Section>
    );
};

export default About;
