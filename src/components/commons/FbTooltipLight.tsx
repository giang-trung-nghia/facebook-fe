import React from "react";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 16,
  },
}));

interface BaseTooltipProps extends TooltipProps {
  disableAnimation?: boolean; // To disable animation
  placement?: "top" | "right" | "bottom" | "left"; // Tooltip placement
  distance?: number; // Distance options
  size?: "sm" | "md" | "lg"; // Tooltip size
  title: string;
}

export const FbTooltipLight: React.FC<BaseTooltipProps> = ({
  title,
  placement,
  children,
  distance = 10,
  disableAnimation = false,
  size = "md",
  ...props
}) => {

  const getSize = () => {
    switch (size) {
      case "sm":
        return "0.75rem";
      case "md":
        return "0.875rem";
      case "lg":
        return "1rem";
      default:
        return "0.875rem";
    }
  };

  return (
    <LightTooltip
      {...props}
      title={title}
      placement={placement}
      enterDelay={disableAnimation ? 0 : 300}
      leaveDelay={disableAnimation ? 0 : 200}
      slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, distance * -1],
                  },
                },
              ],
            },
          }}
    >
      {children}
    </LightTooltip>
  );
};
