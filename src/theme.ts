export const theme = {
  colors: {
    grey: "#babeca",
    white: "#ffffff",
    aliceblue: "aliceblue",
  },
  get shadow() {
    return {
      topLeft: `box-shadow: 
      12px 12px 16px 0 rgba(0, 0, 0, 0.25),
      -8px -8px 12px 0 rgba(255, 255, 255, 0.3)`,
      topRight: `box-shadow:
      -8px 8px 12px 0 rgba(0, 0, 0, 0.3),
      12px -12px 16px rgba(255, 255, 255, 0.25)`,
      bottomRight: `box-shadow: 
      -8px -8px 12px 0 rgba(0, 0, 0, 0.3),
      12px 12px 16px rgba(255, 255, 255, 0.25)`,
      bottomLeft: `box-shadow: 
      8px -8px 12px 0 rgba(0, 0, 0, 0.3),
      -12px 12px 16px rgba(255, 255, 255, 0.25)`,
      insetDeep: `box-shadow: inset 2px 2px 5px ${this.colors.grey}, inset -5px -5px 10px ${this.colors.white}`,
      insetShallow: `box-shadow: inset 1px 1px 2px ${this.colors.grey}, inset -1px -1px 2px ${this.colors.white}`,
    };
  },
  device: {
    mobile: `(min-width: 0px)`,
    tablet: `(min-width: 768px)`,
    desktop: `(min-width: 1024px)`,
  },
};
