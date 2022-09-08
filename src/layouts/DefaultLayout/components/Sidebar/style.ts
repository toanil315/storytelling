import styled from 'styled-components'
import { color } from 'src/utils/colors'

export const SidebarWrapper = styled.div`
    width: 15%;
    height: 100vh;

    background-color: white;
    padding: 33px 20px 40px;
`

export const MenuWrapper = styled.div`
    & > .title {
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        color: ${color.text};
        margin-bottom: 10px;
    }

    & > ul {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`

export const SidebarItemWrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    margin-left: -10px;
    border-radius: 10px;
    cursor: pointer;

    & > span {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        padding-left: 10px;
    }

    &:hover {
        background-color: ${color.lightGray};
    }
`

export const SidebarItemActive = styled(SidebarItemWrapper)`
    background-color: ${color.primary} !important;
    

    & > span {
        font-weight: 500;
    }
`