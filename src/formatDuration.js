import 'moment-duration-format';

export default function formatDuration(d) {
  return d.format('mm:ss.SSS', { trim: false });
}
