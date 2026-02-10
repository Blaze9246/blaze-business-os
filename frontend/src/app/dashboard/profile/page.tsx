export default function ProfilePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-zinc-100 mb-6">User Profile</h1>
      <div className="max-w-md bg-surface border border-border rounded-xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
            <span className="text-2xl font-bold text-white">Z</span>
          </div>
          <div>
            <p className="text-lg font-semibold text-zinc-100">Zain Moolla</p>
            <p className="text-sm text-zinc-500">Admin</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email</label>
            <p className="text-zinc-100">zain@blazeignite.com</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Role</label>
            <p className="text-zinc-100">Administrator</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Company</label>
            <p className="text-zinc-100">Blaze Ignite</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border">
          <button className="text-sm text-primary-400 hover:text-primary-300">
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
