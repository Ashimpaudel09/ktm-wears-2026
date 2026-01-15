export default function InputError({ message }: { message: string }) {
  return <p className="mt-2 text-sm text-red-600">{message}</p>;
}
