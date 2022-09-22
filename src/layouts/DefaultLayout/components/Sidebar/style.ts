import styled from "styled-components";

export const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const SidebarItemWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: -10px;
  border-radius: 10px;
  cursor: pointer;

  & p {
    padding-left: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

export const SidebarItemActive = styled(SidebarItemWrapper)`
  background-color: ${({ theme }) => theme.colors.primary} !important;

  & > span {
    font-weight: 500;
  }
`;
