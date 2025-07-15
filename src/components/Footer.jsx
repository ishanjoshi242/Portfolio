import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background: ${({ theme }) => theme.bgDark};
    color: ${({ theme }) => theme.textLight};
    text-align: center;
    padding: 2rem 0;
    font-size: 0.9rem;
    border-top: 1px solid rgba(255,255,255,0.1);
`;

const Footer = () => {
    return (
        <FooterContainer>
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Ishan Chandra Joshi. All rights reserved.</p>
            </div>
        </FooterContainer>
    );
};

export default Footer;
