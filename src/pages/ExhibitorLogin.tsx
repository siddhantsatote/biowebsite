import { FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { isExhibitorAuthenticated, setExhibitorSession } from "@/lib/exhibitorAuth";
import { sha256Hash } from "@/lib/crypto";

const ExhibitorLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isExhibitorAuthenticated()) {
    return <Navigate to="/exhibitor/panel" replace />;
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isFirebaseConfigured || !db) {
      toast.error("Firebase is not configured");
      setIsSubmitting(false);
      return;
    }

    const querySnapshot = await getDocs(
      query(collection(db, "exhibitors"), where("email", "==", email.trim().toLowerCase()), limit(1))
    );

    if (querySnapshot.empty) {
      toast.error("Invalid login", { description: "Exhibitor account not found." });
      setIsSubmitting(false);
      return;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    
    const enteredHash = await sha256Hash(password);
    const valid = enteredHash === data.password_hash;
    if (!valid) {
      toast.error("Invalid login", { description: "Incorrect password." });
      setIsSubmitting(false);
      return;
    }

    setExhibitorSession({
      id: doc.id,
      booth_name: data.booth_name,
      company_name: data.company_name,
      contact_name: data.contact_name,
      email: data.email,
    });

    toast.success("Welcome back", { description: `Logged in as ${data.booth_name}` });
    navigate("/exhibitor/panel", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container-x flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card/80 p-6 shadow-card md:p-8">
          <p className="chip text-[0.68rem] tracking-[0.16em]">Exhibitor access</p>
          <h1 className="mt-4 font-display text-4xl">Exhibitor Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Login to scan attendee QR passes.</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ex-email">Email</Label>
              <Input
                id="ex-email"
                type="email"
                required
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                placeholder="booth@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ex-password">Password</Label>
              <Input id="ex-password" type="password" required value={password} onChange={(evt) => setPassword(evt.target.value)} />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            New exhibitor?{" "}
            <Link to="/exhibitor/register" className="font-medium text-primary underline-offset-4 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ExhibitorLogin;
