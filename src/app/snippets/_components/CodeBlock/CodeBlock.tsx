"use client";

import { Button, Stack } from "@/components/primitives";
import { useState } from "react";
import styles from "./CodeBlock.module.css";

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <Stack className={styles.codeBlock}>
      <Button onClick={handleCopy} className={styles.copyButton}>
        {copied ? "Copied" : "Copy"}
      </Button>

      <pre className={styles.code}>
        <code>{code}</code>
      </pre>
    </Stack>
  );
}
