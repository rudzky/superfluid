"use client";
import Form from "./Form";

interface Props {
  slug: string;
}

export default function CreateProject({ slug }: Props) {
  return (
    <div>
      <Form />
      {slug}
    </div>
  );
}
