// app/page.tsx
import { Stack } from "@/components/primitives";
import { Hero, QuickStats, RecentSnippets } from "./home";

export default function Home() {
  return (
    <Stack gap={6}>
      <Hero />
      <QuickStats />
      <RecentSnippets />
    </Stack>
  );
}
