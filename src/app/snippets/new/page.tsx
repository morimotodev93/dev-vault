// src/app/snippets/new
import { SnippetForm } from "@/app/snippets/_components/SnippetForm";
import { Container, Heading, Stack } from "@/components/primitives";

export default function New() {
  return (
    <>
      <Container>
        <Stack gap={6}>
          <Heading as={"h2"} size="lg">
            Snippets Register
          </Heading>
          <SnippetForm />
        </Stack>
      </Container>
    </>
  );
}
