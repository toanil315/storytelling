import styled from "styled-components";

export const SearchbarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px 14px 15px;
    background-color: white;
    border-radius: 24px;

    & > input {
        width: 80%;
        min-width: 280px;
        background-color: transparent;
        border: 0;
        padding: 0 20px;

        font-size: 14px;
        font-weight: 400;
        line-height: 22px;

        &:focus {
            outline: none;
        }
    }
`