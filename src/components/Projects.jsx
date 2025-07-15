import React, { useRef } from 'react';
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

const ProjectsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
    background: ${({ theme }) => theme.currentCardBg};
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px ${({ theme }) => theme.currentShadow};
    transition: all 0.3s ease;
    position: relative;
    color: ${({ theme }) => theme.currentText};
`;

const ProjectHeader = styled.div`
    background: linear-gradient(135deg, ${({ theme }) => theme.primary}, ${({ theme }) => theme.accent});
    color: white;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.1);
        transform: rotate(45deg);
        transition: all 0.3s ease;
    }

    ${ProjectCard}:hover &::before {
        right: -30%;
    }
`;

const ProjectTitle = styled.h3`
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 2;
`;

const ProjectType = styled.div`
    opacity: 0.9;
    font-size: 0.9rem;
    position: relative;
    z-index: 2;
`;

const ProjectBody = styled.div`
    padding: 1.5rem;
`;

const ProjectDescription = styled.p`
    margin-bottom: 1rem;
    line-height: 1.6;
`;

const ProjectTech = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const TechTag = styled.span`
    background: ${({ theme }) => theme.currentBg};
    color: ${({ theme }) => theme.primary};
    padding: 0.3rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    border: 1px solid ${({ theme }) => theme.primary};
    transition: all 0.3s ease;
`;

const projectsData = [
    {
        title: 'BearMath',
        type: 'Final Year Project • Ongoing',
        description: 'Developed a faulty bearing detection system using YOLO for accurate and efficient object detection. Integrated multiple technologies for seamless deployment and real-time monitoring.',
        tech: ['Python', 'OpenCV', 'YOLO', 'Flask', 'Ultralytics']
    },
    {
        title: 'Vigil Eye',
        type: 'Learning Project • 2024',
        description: 'Smart Road Safety Management system using ML-based accident detection from CCTV footage. Automatically alerts authorities in real-time and analyzes traffic patterns to enhance road safety.',
        tech: ['Python', 'OpenCV', 'Ultralytics', 'Machine Learning']
    },
    {
        title: 'Eyeris',
        type: 'Learning Project • 2024',
        description: 'Iris-Based Cursor Control system using deep learning for hands-free cursor control. Enhances accessibility and transforms gaming and virtual reality experiences through eye-tracking technology.',
        tech: ['Deep Learning', 'Computer Vision', 'Eye Tracking', 'Real-time Processing']
    }
];

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <Section id="projects" ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={sectionVariants}>
            <div className="container">
                <SectionTitle>Featured Projects</SectionTitle>
                <ProjectsGrid>
                    {projectsData.map((project, index) => (
                        <ProjectCard
                            key={index}
                            variants={cardVariants}
                            whileHover={{ translateY: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectHeader>
                                <ProjectTitle>{project.title}</ProjectTitle>
                                <ProjectType>{project.type}</ProjectType>
                            </ProjectHeader>
                            <ProjectBody>
                                <ProjectDescription>{project.description}</ProjectDescription>
                                <ProjectTech>
                                    {project.tech.map((tag, tagIndex) => (
                                        <TechTag key={tagIndex}>{tag}</TechTag>
                                    ))}
                                </ProjectTech>
                            </ProjectBody>
                        </ProjectCard>
                    ))}
                </ProjectsGrid>
            </div>
        </Section>
    );
};

export default Projects;
