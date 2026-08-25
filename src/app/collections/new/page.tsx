// src/app/collections/new
import { CollectionForm } from "@/app/collections/_components";
import { Container, Heading, Spacer, Stack } from "@/components/primitives";

export default function New() {
  return (
    <>
      <Container>
        <Stack gap={6}>
          <Heading as={"h2"} level={2} size="lg">
            Collection Register
          </Heading>
          <CollectionForm />
        </Stack>
        <Spacer mobile={48} desktop={80} />
      </Container>
    </>
  );
}
