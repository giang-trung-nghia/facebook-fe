import React from "react";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

// Custom Tooltip style to make it bright
const StyledTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,  // bright background color
    color: 'rgba(0, 0, 0, 0.87)',  // dark text color for better readability
    fontSize: "0.875rem",  // default font size (adjust as needed)
    borderRadius: "4px",
    boxShadow: theme.shadows[3],  // optional, for some depth
  },
}));

interface BaseTooltipProps extends TooltipProps {
  disableAnimation?: boolean;  // To disable animation
  placement?: "top" | "right" | "bottom" | "left";  // Tooltip placement
  distance?: "near" | "medium" | "far";  // Distance options
  size?: "small" | "medium" | "large";  // Tooltip size
}

const FbTooltip: React.FC<BaseTooltipProps> = ({
  disableAnimation = false,
  placement = "top",
  distance = "medium",
  size = "medium",
  children,
  ...props
}) => {
  // Get the distance based on the option
  const getDistance = () => {
    switch (distance) {
      case "near":
        return 2;  // short distance
      case "medium":
        return 4;  // default distance
      case "far":
        return 8;  // far distance
      default:
        return 4;
    }
  };

  // Get the font size based on the option
  const getSize = () => {
    switch (size) {
      case "small":
        return "0.75rem";
      case "medium":
        return "0.875rem";
      case "large":
        return "1rem";
      default:
        return "0.875rem";
    }
  };

  return (
    <StyledTooltip
      {...props}
      title={props.title}
      placement={placement}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, getDistance()],  // Adjust distance based on selection
            },
          },
        ],
      }}
      enterDelay={disableAnimation ? 0 : 300}  // Adjust animation delay
      leaveDelay={disableAnimation ? 0 : 200}
    >
      <span style={{ fontSize: getSize() }}>{children}</span>
    </StyledTooltip>
  );
};

export default FbTooltip;
