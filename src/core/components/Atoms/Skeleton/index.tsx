import { FC } from "react";
import { SkeletonProps } from "@mui/material";
import { SkeletonStyled } from "./Skeleton.styled";

interface ISkeleton extends Pick<SkeletonProps, 'variant' | 'width' | 'height' | 'sx'> {
  className?: string;
}

const Skeleton: FC<ISkeleton> = ({ className, variant = 'rectangular', width, height, sx }) => (
  <SkeletonStyled
    variant={variant}
    width={width}
    height={height}
    className={className}
    sx={sx}
  />
);

export default Skeleton;