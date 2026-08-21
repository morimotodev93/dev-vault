import { Container, Heading, Stack, Text } from "@/components/primitives";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <>
      <section id="hero" className={styles.hero}>
        <Container>
          <Stack gap={6}>
            {/* Eyebrow */}
            <Text size="sm" className={styles.eyebrow}>
              Developer Knowledge Management
            </Text>
            <Stack>
              {/* Main Heading */}
              <Heading size="xl" className={styles.mainHeading}>
                Your Development Knowledge, Organized.
              </Heading>
              {/* Description */}
              <Stack gap={2} className={styles.description}>
                <Text>Save, organize, and reuse your code snippets,</Text>
                <Text>components, and development notes in one place.</Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </section>
    </>
  );
}
