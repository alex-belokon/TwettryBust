export function countingTime(timeRequest) {
  const now = new Date();
  const diff = Math.abs(now.getTime() - new Date(timeRequest).getTime());
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 2) {
    return new Date(timeRequest).toLocaleString();
  } else if (hours >= 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (minutes >= 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (seconds >= 1) {
    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  } else {
    return 'just now';
  }
}