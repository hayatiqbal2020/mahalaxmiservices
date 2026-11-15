// Breadcrumb + page title, shown at the top of every admin page.
export default function PageHead({
  title,
  note,
}: {
  title: string;
  note?: React.ReactNode;
}) {
  return (
    <div className="adm-head">
      <div>
        <span className="adm-crumb">Admin <i>/</i> {title}</span>
        <h1>{title}</h1>
      </div>
      {note && <div className="adm-head-note">{note}</div>}
    </div>
  );
}
