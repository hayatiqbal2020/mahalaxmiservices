// Spinner shown inside a card while its data loads.
export default function Loader({ label = "Loading…" }: { label?: string }) {
  return <div className="adm-loader" role="status">{label}</div>;
}
