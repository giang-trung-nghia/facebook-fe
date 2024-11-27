import React from 'react';
import {Avatar, Box, IconButton, Typography} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
const AboutOverview: React.FC = () => {
  return (
    <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", width: "100%"}}>
      <Typography variant="h6">
        Overview
      </Typography>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem"}}>
          <Avatar/>
          <Box sx={{display: "flex"}}>
            <Typography>Live in</Typography>
            <Typography marginLeft={'0.2rem'} fontWeight={'bold'}>Ha Noi</Typography>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <MoreHorizIcon/>
          </IconButton>
        </Box>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem"}}>
        <Avatar/>
        <Box sx={{display: "flex"}}>
          <Typography>Graduated in</Typography>
          <Typography marginLeft={'0.2rem'} fontWeight={'bold'}>Ha Noi University of Science and Technology
            (HUST)</Typography>
        </Box>
      </Box>
      <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem"}}>
        <Avatar/>
        <Box sx={{display: "flex"}}>
          <Typography>Work at</Typography>
          <Typography marginLeft={'0.2rem'} fontWeight={'bold'}>Facebook Inc.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutOverview;