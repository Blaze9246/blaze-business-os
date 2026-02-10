export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-void">
      <div className="max-w-md w-full mx-4 p-8 bg-surface border border-border rounded-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-zinc-100 mb-2">Create Account</h1>
          <p className="text-zinc-500">Get started with Blaze Business OS</p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">First Name</label>
              <input
                type="text"
                placeholder="John"
                className="w-full px-4 py-3 bg-void border border-border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Last Name</label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full px-4 py-3 bg-void border border-border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 bg-void border border-border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-2">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-void border border-border rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-medium rounded-xl transition-all"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Already have an account?{' '}
          <a href="/sign-in/" className="text-primary-400 hover:text-primary-300">Sign in</a>
        </p>
      </div>
    </div>
  );
}
