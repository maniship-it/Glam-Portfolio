import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";

// Lazy load the Academy page as it's not the critical path
const Academy = lazy(() => import("@/pages/Academy"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/academy">
        {() => (
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          }>
            <Academy />
          </Suspense>
        )}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

/*
No component in the site uses useQuery/useMutation, so QueryClientProvider was
shipping @tanstack/react-query (~24KB) on the critical path for nothing. The
configured client is still in src/lib/queryClient.ts — to start using queries
again, re-import it and wrap <TooltipProvider> in <QueryClientProvider>.
*/
function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;