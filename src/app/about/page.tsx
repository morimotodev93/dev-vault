import {
  Container,
  Heading,
  Link,
  Spacer,
  Stack,
  Text,
} from "@/components/primitives";

import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <Container>
      <Stack gap={8}>
        {/* Hero */}
        <Stack gap={3}>
          <Heading as="h1" size="xl">
            About Dev Vault
          </Heading>

          <Text>
            Dev Vault is a personal knowledge base for organizing reusable code,
            development notes, and practical references.
          </Text>
        </Stack>

        {/* Overview */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            What is Dev Vault?
          </Heading>

          <Text>
            Dev Vault collects and organizes code snippets into searchable
            collections that can be reused across projects.
          </Text>

          <Text>
            The goal is to make it easy to store what I learn, find it again
            later, and apply it to future work.
          </Text>
        </Stack>

        {/* About Me */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            About Me
          </Heading>

          <Text>
            I am a web developer focused on building practical and maintainable
            web applications.
          </Text>

          <Text>
            I enjoy learning through implementation and organizing what I learn
            into reusable knowledge.
          </Text>
        </Stack>

        {/* Purpose */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            Purpose
          </Heading>

          <Text>
            Dev Vault started as a practical way to keep track of code and
            patterns worth reusing, and grew into a portfolio project for
            practicing modern web development along the way.
          </Text>

          <Text>
            The focus throughout has been on more than just features — a clear
            structure, thoughtful components, and a workflow I can keep building
            on.
          </Text>
        </Stack>

        {/* Features */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            Features
          </Heading>

          <Text>Dev Vault currently includes:</Text>

          <Text>• Snippet management</Text>
          <Text>• Search, filtering, sorting, and pagination</Text>
          <Text>• Collections for organizing related snippets</Text>
          <Text>• Collection metadata and ratings</Text>
          <Text>• Reusable component-based UI</Text>
        </Stack>

        {/* Technology */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            Technology
          </Heading>

          <Text>
            Dev Vault is built with Next.js, React, TypeScript, Prisma, and
            SQLite.
          </Text>

          <Text>
            The project uses the Next.js App Router and follows a
            component-oriented architecture.
          </Text>
        </Stack>

        {/* Development */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            Development
          </Heading>

          <Text>
            The project is developed incrementally, with an emphasis on
            practical implementation, testing, refactoring, and documentation.
          </Text>

          <Text>
            Design and architectural decisions are documented alongside the
            implementation to keep the project understandable as it evolves.
          </Text>
        </Stack>

        {/* Portfolio */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            Portfolio Project
          </Heading>

          <Text>
            As a portfolio piece, Dev Vault shows how I approach full-stack
            development — data modeling, CRUD workflows, UI composition, and
            documentation — all built with an eye toward maintainability.
          </Text>
        </Stack>

        {/* Links */}
        <Stack gap={3}>
          <Heading as="h2" size="lg">
            Links
          </Heading>

          <Text>
            GitHub:{" "}
            <Link
              external
              appearance="content"
              variant="primary"
              href="https://github.com/morimotodev93/dev-vault"
              className={styles.githubLink}
            >
              View Repository
            </Link>
          </Text>
          <Text>Live Demo: Coming soon</Text>
        </Stack>
      </Stack>

      <Spacer mobile={48} desktop={80} />
    </Container>
  );
}
