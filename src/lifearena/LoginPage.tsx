import { useState, type FormEvent } from "react";
import { ArrowRight, Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { supabase } from "@/lib/supabase";

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("Momentum123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!email.includes("@") || password.length < 8) {
      setError("Enter a valid email and your password (at least 8 characters).");
      return;
    }

    setError("");
    setIsSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setIsSubmitting(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    onSuccess();
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-5 py-7 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between">
          <Link to="/"><BrandMark /></Link>
          <span className="text-xs font-semibold text-muted-foreground">WELCOME BACK</span>
        </header>

        <div className="flex flex-1 items-center justify-center py-12">
          <section className="w-full max-w-md animate-fade-in">
            <p className="mb-3 text-xs font-bold uppercase text-primary">Back to the arena</p>
            <h1 className="font-display text-4xl font-bold leading-tight">Log in to continue.</h1>
            <p className="mt-3 text-base text-muted-foreground">
              Pick up your journey exactly where you left it.
            </p>

            <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
              <Button type="button" variant="outline" className="h-12 w-full bg-card text-foreground">
                Continue with Google
              </Button>
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground">
                <span className="h-px flex-1 bg-border" />OR<span className="h-px flex-1 bg-border" />
              </div>

              <label className="block text-xs font-semibold">
                Email Address
                <span className="relative mt-2 block">
                  <Mail className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    disabled={isSubmitting}
                    className="h-11 w-full rounded-md border border-border bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </span>
              </label>

              <label className="block text-xs font-semibold">
                Password
                <span className="relative mt-2 block">
                  <LockKeyhole className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    disabled={isSubmitting}
                    className="h-11 w-full rounded-md border border-border bg-card px-10 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-1 top-1 size-9 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </span>
              </label>

              {error && <p role="alert" className="text-xs text-destructive">{error}</p>}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full font-bold shadow-[0_0_24px_var(--glow-primary)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Logging in...
                  </>
                ) : (
                  <>
                    Log in <ArrowRight />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              New to LifeArena?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create an account
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
