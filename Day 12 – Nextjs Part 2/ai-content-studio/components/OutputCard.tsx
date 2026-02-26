interface Props {
  content: string;
}

export default function OutputCard({ content }: Props) {
  if (!content) return null;

  return (
    <div className="mt-6 p-6 bg-gray-100 rounded-lg whitespace-pre-wrap">
      {content}
    </div>
  );
}