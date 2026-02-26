import { ContentType } from "@/types";

interface Props {
  value: ContentType;
  onChange: (value: ContentType) => void;
}

export default function ContentTypeSelector({
  value,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ContentType)}
      className="border p-2 rounded-md w-full"
    >
      <option value="blog">Blog</option>
      <option value="tweet">Tweet</option>
      <option value="linkedin">LinkedIn Post</option>
      <option value="product">Product Description</option>
    </select>
  );
}