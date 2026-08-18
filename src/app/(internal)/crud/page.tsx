import {
  Container,
  Grid,
  Heading,
  Link,
  Stack,
  Surface,
  Text,
} from "@/components/primitives";

export default function CrudTestPage() {
  return (
    <Container as="main">
      <Stack gap={8}>
        {/* Header */}
        <Stack gap={2}>
          <Heading level={1} size="3xl">
            CRUD Test
          </Heading>

          <Text color="muted">
            Verify and test the current Snippet management features.
          </Text>
        </Stack>

        {/* CRUD Operations */}
        <Stack gap={4}>
          <Heading level={2} size="xl">
            CRUD Operations
          </Heading>

          <Grid col={2} gap={4}>
            <Surface bordered>
              <Stack gap={4}>
                <Stack gap={2}>
                  <Heading level={3} size="lg">
                    Create
                  </Heading>

                  <Text color="muted">
                    Create a new snippet and verify form validation and data
                    persistence.
                  </Text>
                </Stack>

                <Link href="/snippets/new" variant="button">
                  New Snippet
                </Link>
              </Stack>
            </Surface>

            <Surface bordered>
              <Stack gap={4}>
                <Stack gap={2}>
                  <Heading level={3} size="lg">
                    Read
                  </Heading>

                  <Text color="muted">
                    Browse the snippet list and inspect individual snippet
                    details.
                  </Text>
                </Stack>

                <Link href="/snippets" variant="button">
                  View Snippets
                </Link>
              </Stack>
            </Surface>

            <Surface bordered>
              <Stack gap={4}>
                <Stack gap={2}>
                  <Heading level={3} size="lg">
                    Update
                  </Heading>

                  <Text color="muted">
                    Open an existing snippet and verify editing and data
                    persistence.
                  </Text>
                </Stack>

                <Link href="/snippets" variant="button">
                  Edit from List
                </Link>
              </Stack>
            </Surface>

            <Surface bordered>
              <Stack gap={4}>
                <Stack gap={2}>
                  <Heading level={3} size="lg">
                    Delete
                  </Heading>

                  <Text color="muted">
                    Delete an existing snippet and verify the result in the
                    snippet list.
                  </Text>
                </Stack>

                <Link href="/snippets" variant="button">
                  Delete from List
                </Link>
              </Stack>
            </Surface>
          </Grid>
        </Stack>

        {/* Snippet Features */}
        <Stack gap={4}>
          <Heading level={2} size="xl">
            Snippet Features
          </Heading>

          <Surface bordered>
            <Stack gap={4}>
              <Stack gap={2}>
                <Heading level={3} size="lg">
                  Current Features
                </Heading>

                <Text color="muted">
                  Features currently available for testing.
                </Text>
              </Stack>

              <Stack gap={2}>
                <Text>Search</Text>
                <Text>Pagination</Text>
                <Text>Language Filter</Text>
                <Text>Priority Filter</Text>
                <Text>Favorite Filter</Text>
                <Text>Favorite Toggle</Text>
                <Text>Multiple Tags</Text>
              </Stack>

              <Link href="/snippets" variant="button">
                Open Snippets
              </Link>
            </Stack>
          </Surface>
        </Stack>
      </Stack>
    </Container>
  );
}
