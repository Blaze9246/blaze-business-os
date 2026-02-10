import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-zinc-100 mb-6">User Profile</h1>
      <div className="max-w-4xl">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-surface border border-border shadow-xl",
              navbar: "bg-surface border-r border-border",
              navbarButton: "text-zinc-400 hover:text-zinc-100",
              headerTitle: "text-zinc-100",
              headerSubtitle: "text-zinc-400",
              formFieldLabel: "text-zinc-300",
              formFieldInput: "bg-void border-border text-zinc-100 placeholder:text-zinc-500",
              formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-white",
              formButtonReset: "text-zinc-400 hover:text-zinc-100",
              profileSectionTitle: "text-zinc-100",
              profileSectionSubtitle: "text-zinc-400",
              badge: "bg-primary-500/20 text-primary-400",
              identityPreviewText: "text-zinc-300",
              identityPreviewEditButton: "text-primary-400 hover:text-primary-300",
            },
          }}
        />
      </div>
    </div>
  );
}
