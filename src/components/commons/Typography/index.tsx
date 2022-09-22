import styled from "styled-components";
import { typography, color, compose } from "styled-system";

const StyledText = styled.p({ margin: 0 }, compose(typography, color));

const Text = (props: any) => {
  return <StyledText {...props} />;
};

export default Text;
