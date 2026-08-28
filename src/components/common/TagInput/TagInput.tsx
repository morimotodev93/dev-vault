"use client";

import { Tag } from "@/components/common";
import { Button, Stack } from "@/components/primitives";
import { Input } from "@/components/ui";
import { useState } from "react";

import { CloseIcon } from "@/components/icon";
import styles from "./TagInput.module.css";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: boolean;
  errorMessage?: string;
}

export function TagInput({
  label,
  value,
  onChange,
  error,
  errorMessage,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const tag = inputValue.trim();

    if (!tag) {
      return;
    }

    if (value.includes(tag)) {
      return;
    }

    onChange([...value, tag]);
    setInputValue("");
  };

  const handleRemove = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    handleAdd();
  };

  return (
    <Stack>
      {label && <label>{label}</label>}

      <Stack direction="row" gap={3}>
        <Input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a tag..."
          error={error}
          errorMessage={errorMessage}
        />

        <Button type="button" onClick={handleAdd}>
          Add
        </Button>
      </Stack>

      <Stack direction="row" gap={2} wrap>
        {value.map((tag) => (
          <Stack key={tag} direction="row" gap={1} align="center">
            <Tag size="md" className={styles.tagFlex}>
              {tag}
            </Tag>

            <Button
              type="button"
              variant="danger"
              size="xs"
              onClick={() => handleRemove(tag)}
              aria-label={`Remove ${tag}`}
            >
              <CloseIcon width={12} height={12} />
            </Button>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
