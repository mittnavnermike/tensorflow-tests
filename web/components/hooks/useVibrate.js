/**
 *
 * Not well supported yet unfortunately.
 * https://caniuse.com/#feat=vibration
 */
const useVibrate = (sequence = [200, 100, 200]) => {
  const vibrate = () => {
    if (typeof window !== 'undefined' && window?.navigator?.vibrate) {
      window.navigator.vibrate(sequence)
    }
  }
  return vibrate
}

export default useVibrate
