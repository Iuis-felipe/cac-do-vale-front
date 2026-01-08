import { FC } from "react";

interface ISkeleton {
  className?: string;
}

const Skeleton: FC<ISkeleton> = ({ className = "" }) => (
  <div
    className={`animate-pulse rounded-md bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:400%_100%] ${className}`}
  />
);

export default Skeleton