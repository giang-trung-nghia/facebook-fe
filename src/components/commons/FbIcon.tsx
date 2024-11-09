import { IconButton } from "@mui/material";

type Props = {
  src: string;
  alt: string;
  sz?: "s" | "m" | "l";
  disabled?: boolean;
  onClick?: () => void;
  shape?: "round" | "rectangle";
};

const sizeMap = {
  s: 24,
  m: 40,
  l: 56,
};

export const FbIcon = ({
  src,
  sz = "m",
  alt,
  disabled = false,
  onClick,
  shape = "round",
}: Props) => {
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: shape === "rectangle" ? "100%" : sizeMap[sz],
        height: sizeMap[sz],
        borderRadius: shape === "round" ? "50%" : "8px",
        padding: 0,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: sizeMap[sz], height: sizeMap[sz] }}
      />
    </IconButton>
  );
};
