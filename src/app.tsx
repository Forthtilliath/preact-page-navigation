import { Header } from "@/components/layout/header";
import Router, { Route } from "preact-router";
import { lazy, Suspense } from "preact/compat";

const Home = lazy(() => import("@/components/pages/home"));
const Page1 = lazy(() => import("@/components/pages/page-1"));
const Page2 = lazy(() => import("@/components/pages/page-2"));

export function App() {
  return (
    <div class="container mx-auto">
      <Header />

      <main class="grid grid-cols-[1fr_250px] gap-10 mb-6">
        <Suspense fallback={<div>loading...</div>}>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/page-1" component={Page1} />
            <Route path="/page-2" component={Page2} />
            <div default>404</div>
          </Router>
        </Suspense>
      </main>
    </div>
  );
}
