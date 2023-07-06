const Methods = {
  getDurationTime: (duration: any) => {
    const padTimeValueString = (value: any) =>
      value.toString().padStart(2, "0");

    if (!Number.isFinite(duration)) {
      return "";
    }
    let seconds = Math.floor(duration % 60),
      minutes = Math.floor((duration / 60) % 60),
      hours = Math.floor((duration / (60 * 60)) % 24);

    const isHrsZero = hours === 0;
    hours = isHrsZero ? 0 : padTimeValueString(hours);
    minutes = padTimeValueString(minutes);
    seconds = padTimeValueString(seconds);

    if (isHrsZero) {
      return minutes + ":" + seconds;
    }

    return hours + ":" + minutes + ":" + seconds;
  },
};

export default Methods;
