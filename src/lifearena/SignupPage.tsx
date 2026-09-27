import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Target,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "./BrandMark";
import { supabase } from "@/lib/supabase";

export function SignupPage({
  onContinue,
}: {
  onContinue: (data: { name: string; handle: string }) => void;
}) {
  const [name, setName] = useState("Alex Mercer");
  const [handle, setHandle] = useState("alexmercer");
  const [email, setEmail] = useState("alex@example.com");
  const [password, setPassword] = useState("Momentum123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (
      !name.trim() ||
      !handle.trim() ||
      !email.includes("@") ||
      password.length < 8 ||
      !/\d/.test(password)
    ) {
      setError("Complete every field and use an 8-character password with at least one number.");
      return;
    }

    const cleanName = name.trim();
    const cleanHandle = handle.trim().replace(/^@/, "");

    setError("");
    setIsSubmitting(true);
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: cleanName, handle: cleanHandle } },
    });
    setIsSubmitting(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    onContinue({ name: cleanName, handle: cleanHandle });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-5 py-7 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between">
          <BrandMark />
          <span className="text-xs font-semibold text-muted-foreground">EARLY ACCESS</span>
        </header>
        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.02fr_.9fr]">
          <section className="max-w-xl animate-fade-in">
            <div className="mb-5 h-2 w-44 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-3 rounded-full bg-success" />
            </div>
            <p className="mb-3 text-xs font-bold uppercase text-primary">Your arena starts here</p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
              Start building your life.
            </h1>
            <p className="mt-3 max-w-md text-base text-muted-foreground">
              Create your account and turn your goals into a journey you can actually follow.
            </p>
            <form className="mt-8 space-y-4" onSubmit={submit} noValidate>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full bg-card text-foreground"
              >
                Continue with Google
              </Button>
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                OR
                <span className="h-px flex-1 bg-border" />
              </div>
              {[
                { label: "Full Name", value: name, set: setName, icon: UserRound, type: "text" },
                { label: "Username", value: handle, set: setHandle, icon: UserRound, type: "text" },
                { label: "Email Address", value: email, set: setEmail, icon: Mail, type: "email" },
              ].map((field) => (
                <label className="block text-xs font-semibold" key={field.label}>
                  {field.label}
                  <span className="relative mt-2 block">
                    <field.icon className="absolute left-3 top-3.5 size-4 text-muted-foreground" />
                    <input
                      value={field.value}
                      onChange={(e) => field.set(e.target.value)}
                      type={field.type}
                      disabled={isSubmitting}
                      className="h-11 w-full rounded-md border border-border bg-card pl-10 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </span>
                </label>
              ))}
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
                <span className="mt-1 block text-[11px] font-normal text-muted-foreground">
                  Minimum 8 characters with at least one number.
                </span>
              </label>
              {error && (
                <p role="alert" className="text-xs text-destructive">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-12 w-full font-bold shadow-[0_0_24px_var(--glow-primary)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating account...
                  </>
                ) : (
                  <>
                    Create Account <ArrowRight />
                  </>
                )}
              </Button>
            </form>
          </section>
          <aside className="hidden rounded-lg border border-border bg-card p-8 shadow-2xl lg:block">
            <div className="flex justify-end gap-2 text-[10px] font-bold">
              <span className="rounded bg-muted px-3 py-1 text-primary">LVL 01</span>
              <span className="rounded bg-muted px-3 py-1 text-primary">0 XP</span>
            </div>
            <div className="my-7 h-px bg-border" />
            <div className="flex items-center gap-4">
              <div className="relative flex size-16 items-center justify-center rounded-lg border border-primary/50 bg-muted font-display text-3xl text-primary">
                {name.trim().charAt(0).toUpperCase() || "A"}
                <Check className="absolute -bottom-1 -right-1 size-5 rounded-full bg-success p-1 text-success-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold">{name || "Your name"}</h2>
                <p className="text-sm text-muted-foreground">
                  @{handle || "username"} • New Explorer
                </p>
              </div>
            </div>
            <div className="mt-8 h-1.5 overflow-hidden rounded-full bg-background">
              <div className="h-full w-2 bg-primary" />
            </div>
            <p className="mt-2 text-right text-xs font-bold text-primary">0 / 250 XP to LVL 02</p>
            <div className="mt-7 rounded-md border border-border bg-background/40 p-5">
              <div className="flex gap-4">
                <div className="flex size-11 items-center justify-center rounded-md bg-muted text-primary">
                  <Target />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Your journey starts here.</h3>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Complete onboarding to unlock your personalized AI roadmap.
                  </p>
                </div>
              </div>
            </div>
            <blockquote className="mt-5 rounded-md bg-background p-5 text-sm italic text-muted-foreground">
              “The secret of getting ahead is getting started.”
            </blockquote>
          </aside>
        </div>
      </div>
    </main>
  );
}
