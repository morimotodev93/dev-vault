// src/app/snippets/new
import { SnippetForm } from "@/app/snippets/_components/SnippetForm";
import { Container, Heading, Spacer, Stack } from "@/components/primitives";

export default function New() {
  return (
    <>
      <Container>
        <Stack gap={6}>
          <Heading level={2} size="lg">
            Snippets Register
          </Heading>
          <SnippetForm />
        </Stack>
        <Spacer mobile={40} desktop={60} />
      </Container>
    </>
  );
}
