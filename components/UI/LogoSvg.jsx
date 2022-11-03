import React from "react";
import { WithLocalSvg } from "react-native-svg";

const LogoSvg = ({ width, height, asset }) => {
  return <WithLocalSvg width={width} height={height} asset={asset} />;
};

export default LogoSvg;
