import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isAdminAuthenticated, setAdminAuthenticated, verifyAdminCredentials } from "@/lib/adminAuth";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const valid = verifyAdminCredentials(username.trim(), password);
    if (!valid) {
      toast.error("Invalid admin credentials", {
        description: "Please check your username and password.",
      });
      setIsSubmitting(false);
      return;
    }

    setAdminAuthenticated();
    toast.success("Admin login successful");
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container-x flex min-h-screen items-center justify-center py-10">
        <div className="w-full max-w-md rounded-2xl border border-border/70 bg-card/80 p-6 shadow-card md:p-8">
          <p className="chip text-[0.68rem] tracking-[0.16em]">Admin access</p>
          <h1 className="mt-4 font-display text-4xl leading-tight">Admin Login</h1>
          <p className="mt-2 text-sm text-muted-foreground">Sign in to access registration records.</p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="admin-username">Username</Label>
              <Input
                id="admin-username"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                placeholder="Enter admin username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AdminLogin;
