export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <linearGradient id="gRed" x1="0" x2="1">
          <stop offset="0" stopColor="#9e120c"></stop><stop offset=".35" stopColor="#e3342b"></stop><stop offset=".6" stopColor="#ff5a4f"></stop><stop offset="1" stopColor="#a8150f"></stop>
        </linearGradient>
        <linearGradient id="gMetal" x1="0" x2="1">
          <stop offset="0" stopColor="#6d6d75"></stop><stop offset=".5" stopColor="#e2e2e8"></stop><stop offset="1" stopColor="#55555d"></stop>
        </linearGradient>
        <linearGradient id="gFlame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#d7261e"></stop><stop offset=".5" stopColor="#ff6a00"></stop><stop offset="1" stopColor="#ffb400"></stop>
        </linearGradient>
      </defs>
      <symbol id="flame" viewBox="0 0 24 24"><path d="M12 2c1 3.5 5 5.6 5 10.5A5 5 0 0 1 7 13c0-2 1-3.6 2.2-4.6-.1 1.7.6 3 1.8 3.6C10.6 8.5 11 5 12 2Z" fill="#fff"></path></symbol>
    </svg>
  );
}
