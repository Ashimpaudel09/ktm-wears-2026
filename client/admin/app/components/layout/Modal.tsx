export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="p-6">{children}</div>
    </div>
  );
}
