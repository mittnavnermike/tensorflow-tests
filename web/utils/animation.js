export const easings = {
  default: { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] }
}

export const transitions = {
  stagger: {
    initial: {
      opacity: 1
    },
    animate: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.15
      }
    }
  },
  fadeInUp: {
    animate: {
      opacity: 1,
      y: 0,
      transition: easings.default
    },
    initial: {
      opacity: 0,
      y: 50,
      transition: easings.default
    }
  },
  fadeIn: {
    animate: {
      opacity: 1,
      transition: easings.default
    },
    initial: {
      opacity: 0,
      transition: easings.default
    }
  }
}
