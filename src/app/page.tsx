// app/page.tsx
import { Spacer, Stack } from "@/components/primitives";
import { Hero, QuickStats, RecentSnippets } from "./home";

export default function Home() {
  return (
    <main>
      <Stack gap={6}>
        <Hero />
        <QuickStats />
        <RecentSnippets />
        <Spacer />
      </Stack>
    </main>
  );
}
