import Pagination from "@mui/material/Pagination";

import { styled } from "@mui/material/styles";

const CustomPagination = styled(Pagination)`
  & > ul li .MuiButtonBase-root{
    background: #9191a3;
  }
  ,
  & > ul li .MuiButtonBase-root:hover {
    background: #85e5d8;
  },
  & > ul li .MuiButtonBase-root.Mui-selected {
    background: white;
  }
  ,
`;

export default CustomPagination;
