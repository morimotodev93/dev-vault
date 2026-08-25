// app/page.tsx
import { Link, Spacer, Stack } from "@/components/primitives";
import { Hero, QuickStats, RecentSnippets } from "./home";

export default function Home() {
  return (
    <main>
      <Stack gap={6}>
        <Hero />
        <QuickStats />
        <RecentSnippets />
        {/* dev用の移動ボタン */}
        <Link href="/snippets">Snippets</Link>
        <Spacer />
        <Link href="/collections">Collections</Link>
        <Spacer />
      </Stack>
    </main>
  );
}
