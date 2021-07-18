import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledHeading = styled.h1`
    margin: 0px auto 50px auto;
    padding-top: 40px;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGreen};
`

function Heading({ content }) {
    return <StyledHeading>{content}</StyledHeading>;
}

Heading.propTypes = {
    content: PropTypes.string.isRequired,
}

export default Heading; 