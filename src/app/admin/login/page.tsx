export default function AdminLoginPage() {
  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-5xl font-extrabold mb-10 text-center">Admin Login</h1>
      <form className="flex flex-col gap-4">
        <label htmlFor="adminUsername" className="font-medium">Username</label>
        <input id="adminUsername" name="adminUsername" type="text" className="border p-2 rounded" placeholder="Enter admin username" />
        <label htmlFor="adminPassword" className="font-medium">Password</label>
        <input id="adminPassword" name="adminPassword" type="password" className="border p-2 rounded" placeholder="Enter password" />
        <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </form>
    </div>
  );
}