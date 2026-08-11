import { Button, Stack } from "@/components/primitives";
import { Input, Select, Textarea } from "@/components/ui";

export function SnippetForm() {
  return (
    <form>
      <Stack>
        <Input label="Title" />

        <Textarea label="Description" />

        <Select
          label="Language"
          options={[
            { value: "typescript", label: "TypeScript" },
            { value: "javascript", label: "JavaScript" },
            { value: "css", label: "CSS" },
            { value: "html", label: "HTML" },
            { value: "python", label: "Python" },
            { value: "sql", label: "SQL" },
          ]}
          placeholder="Select language"
        />

        <Textarea label="Code" />

        <Select
          label="Priority"
          options={[
            { value: "low", label: "Low" },
            { value: "medium", label: "Medium" },
            { value: "high", label: "High" },
          ]}
          placeholder="Select priority"
        />

        <Input label="Tags" />

        <Stack direction="row" justify="end" gap={3}>
          <Button variant="secondary">Cancel</Button>
          <Button type="submit">Save Snippet</Button>
        </Stack>
      </Stack>
    </form>
  );
}
