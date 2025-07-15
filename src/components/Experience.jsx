import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const Section = styled(motion.section)`
    padding: 80px 0;
    background: ${({ theme }) => theme.bgDark};
    color: ${({ theme }) => theme.textLight};
`;

const SectionTitle = styled.h2`
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: ${({ theme }) => theme.textLight};
    position: relative;

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

const ExperienceContent = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const ExperienceCard = styled(motion.div)`
    background: rgba(255,255,255,0.05);
    padding: 2rem;
    border-radius: 15px;
    margin-bottom: 2rem;
    border-left: 4px solid ${({ theme }) => theme.accent};
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255,255,255,0.08);
        transform: translateX(10px);
    }
`;

const ExperienceHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

const ExperienceTitle = styled.h3`
    color: ${({ theme }) => theme.accent};
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
`;

const ExperienceCompany = styled.div`
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.textLight};
`;

const ExperiencePeriod = styled.div`
    color: ${({ theme }) => theme.primary};
    font-weight: bold;
`;

const ExperienceDescription = styled.p`
    color: ${({ theme }) => theme.textLight};
    line-height: 1.6;
`;

const experienceData = [
    {
        title: 'Machine Learning Engineer',
        company: 'AVL India',
        period: 'Current Position',
        description: 'Working on cutting-edge machine learning solutions and AI-driven automation systems. Developing and implementing ML models for complex engineering challenges, contributing to innovative projects that drive technological advancement in the automotive industry.'
    },
    {
        title: 'B.Tech. Information Technology',
        company: 'Meerut Institute of Engineering and Technology',
        period: '2021 - 2025',
        description: 'Specializing in Machine Learning and Data Science. Achieved multiple recognitions including 4th rank in "Dev Gathering\'24" Hackathon and College Topper in "CodeXcelerate: Unleashing the Ninjas" Competition.'
    }
];

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <Section id="experience" ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={sectionVariants}>
            <div className="container">
                <SectionTitle>Professional Experience</SectionTitle>
                <ExperienceContent>
                    {experienceData.map((exp, index) => (
                        <ExperienceCard key={index} variants={cardVariants}>
                            <ExperienceHeader>
                                <div>
                                    <ExperienceTitle>{exp.title}</ExperienceTitle>
                                    <ExperienceCompany>{exp.company}</ExperienceCompany>
                                </div>
                                <ExperiencePeriod>{exp.period}</ExperiencePeriod>
                            </ExperienceHeader>
                            <ExperienceDescription>{exp.description}</ExperienceDescription>
                        </ExperienceCard>
                    ))}
                </ExperienceContent>
            </div>
        </Section>
    );
};

export default Experience;
