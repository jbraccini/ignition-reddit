import split from "lodash/split";
import upperCase from "lodash/upperCase";

export const DEFAULT_EMPTY_VALUE = "-";

export const initials = (name: string) => {
  if (!name) return DEFAULT_EMPTY_VALUE;
  return split(upperCase(name), " ")
    .map((n: string) => n[0])
    .join("");
};

export const stringToColor = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
};
