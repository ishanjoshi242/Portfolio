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

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
`;

const SkillCategory = styled(motion.div)`
    background: rgba(255,255,255,0.05);
    padding: 2rem;
    border-radius: 15px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
`;

const CategoryTitle = styled.h3`
    color: ${({ theme }) => theme.accent};
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
`;

const SkillTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const SkillTag = styled(motion.span)`
    background: ${({ theme }) => theme.primary};
    padding: 0.5rem 1rem;
    border-radius: 25px;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        background: ${({ theme }) => theme.accent};
        color: ${({ theme }) => theme.bgDark};
        transform: scale(1.05);
    }
`;

const skillsData = [
    {
        category: 'Programming Languages',
        tags: ['Python', 'MySQL', 'JavaScript', 'HTML', 'CSS']
    },
    {
        category: 'Machine Learning & AI',
        tags: ['Supervised Learning', 'Computer Vision', 'Deep Learning', 'Data Analysis', 'NLP']
    },
    {
        category: 'Libraries & Frameworks',
        tags: ['Pandas', 'NumPy', 'Scikit-learn', 'OpenCV', 'Matplotlib', 'Seaborn', 'Flask', 'Ultralytics']
    },
    {
        category: 'Tools & Platforms',
        tags: ['Git', 'Jupyter Notebook', 'Google Colab', 'Power BI', 'Excel', 'Linux', 'Windows']
    }
];

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const sectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const categoryVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const tagVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    const handleRipple = (e) => {
        const tag = e.currentTarget;
        const ripple = document.createElement('span');
        const diameter = Math.max(tag.clientWidth, tag.clientHeight);
        const radius = diameter / 2;

        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${e.clientX - tag.offsetLeft - radius}px`;
        ripple.style.top = `${e.clientY - tag.offsetTop - radius}px`;
        ripple.classList.add('ripple');

        tag.appendChild(ripple);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    };

    return (
        <Section id="skills" ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={sectionVariants}>
            <div className="container">
                <SectionTitle>Technical Skills</SectionTitle>
                <SkillsGrid>
                    {skillsData.map((skillCategory, index) => (
                        <SkillCategory key={index} variants={categoryVariants}>
                            <CategoryTitle>{skillCategory.category}</CategoryTitle>
                            <SkillTags>
                                {skillCategory.tags.map((tag, tagIndex) => (
                                    <SkillTag
                                        key={tagIndex}
                                        variants={tagVariants}
                                        whileHover={{ scale: 1.05 }}
                                        onMouseEnter={handleRipple}
                                    >
                                        {tag}
                                    </SkillTag>
                                ))}
                            </SkillTags>
                        </SkillCategory>
                    ))}
                </SkillsGrid>
            </div>
        </Section>
    );
};

export default Skills;
