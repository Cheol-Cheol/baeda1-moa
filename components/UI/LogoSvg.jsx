import React from "react";
import { WithLocalSvg } from "react-native-svg";
import LogoImage from "../../assets/images/logo.svg";

const LogoSvg = ({ width, height }) => {
  return <WithLocalSvg width={width} height={height} asset={LogoImage} />;
};

export default LogoSvg;
