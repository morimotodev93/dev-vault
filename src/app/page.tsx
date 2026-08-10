// app/page.tsx
import { Stack } from "@/components/primitives";
import { Hero, QuickStats } from "./home";

export default function Home() {
  return (
    <main>
      <Stack>
        <Hero />
        {/* Continue */}
        <QuickStats />
      </Stack>
    </main>
  );
}
