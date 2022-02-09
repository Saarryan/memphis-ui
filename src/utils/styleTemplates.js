export function getBorderRadius(radiusType) {
  switch (radiusType) {
    case "circle":
      return "50px";
    case "square":
      return "0px";
    case "semi-round":
      return "5px";
    default:
      return "0px";
  }
}

export function getBorderColor(borderColorType) {
  switch (borderColorType) {
    case "none":
      return "transparent";
    case "gray":
      return "#d8d8d8";
  }
}

export function getFontColor(colorType) {
  switch (colorType) {
    case "none":
      return "transparent";
    case "black":
      return "#5D4AEE";
    case "lightPurple":
      return "#F0F1F7";
    case "navy":
      return "#2b2e3f";
    case "gray":
      return "#5E5E68";
    case "white":
      return "#f7f7f7";
    default:
      return "#5D4AEE";
  }
}

export function getBackgroundColor(backgroundColor) {
  switch (backgroundColor) {
    case "lightPurple":
      return "#F0F1F7";
    case "loginPurple":
      return "#8277D9";
    case "white":
      return "#F7F7F7";
    case "white-login":
      return "#F9F9F9";
    case "darkPurple":
      return "#5D4AEE";
    case "orange":
      return "#fbbd71";
    case "red":
      return "#CD5C5C";
    case "navy":
      return "rgba(43,46,63,0.85)";
    case "turquoise":
      return "#5CA6A0";
    case "none":
      return "#fff";
    case "none":
      return "transparent";
    default:
      return "#F0F1F7";
  }
}

export function getBoxShadows(boxShadowsType) {
  switch (boxShadowsType) {
    case "none":
      return "transparent";
    case "gray":
      return "0px 0px 2px 0px rgba(0,0,0,0.5)";
    case "gray2":
      return "0px 1px 2px 0px rgba(0,0,0,0.5)";
    case "login-input":
      return "0px 1px 2px 0px rgba(0,0,0,0.21)";
  }
}
