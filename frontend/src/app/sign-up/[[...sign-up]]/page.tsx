import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-void">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-surface border border-border shadow-2xl",
            headerTitle: "text-zinc-100",
            headerSubtitle: "text-zinc-400",
            formFieldLabel: "text-zinc-300",
            formFieldInput: "bg-void border-border text-zinc-100 placeholder:text-zinc-500",
            formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-white",
            footerActionLink: "text-primary-400 hover:text-primary-300",
            identityPreviewText: "text-zinc-300",
            formFieldSuccessText: "text-success",
            formFieldErrorText: "text-error",
            dividerLine: "bg-border",
            dividerText: "text-zinc-500",
            socialButtonsBlockButton: "bg-surface-elevated border-border text-zinc-100 hover:bg-surface",
            socialButtonsBlockButtonText: "text-zinc-100",
            alternativeMethodsBlockButton: "text-zinc-300 hover:text-zinc-100",
          },
        }}
      />
    </div>
  );
}
