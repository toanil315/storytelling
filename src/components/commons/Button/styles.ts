import { color } from "src/utils/colors";
import styled from "styled-components";

export const ButtonBase = styled.button`
    display: flex;
    align-items: center;
    padding: 14px 22px;
    gap: 10px;
    border-radius: 24px;
`

export const ButtonWhite = styled(ButtonBase)`
    background-color: ${color.white};
    color: ${color.text};
`