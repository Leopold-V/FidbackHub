export function PageHeader({ label }: { label: string }) {
  return (
    <div className="w-full bg-stone-900 border-b py-8 border-3Background">
      <div className="text-center sm:text-left sm:w-3/4 mx-auto">
        <h1 className="mt-2 text-3xl font-bold">{label}</h1>
      </div>
    </div>
  );
}
