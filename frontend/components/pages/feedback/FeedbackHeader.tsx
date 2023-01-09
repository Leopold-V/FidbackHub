import { ButtonBack } from 'components/common/Button';

export function FeedbackHeader({ label, projectId }: { label: string; projectId: number }) {
  return (
    <div className="w-full bg-stone-900 border-b py-8 border-3Background">
      <div className="text-center sm:text-left sm:w-3/4 mx-auto">
        <div className="relative flex justify-center items-center">
          <div className="absolute top-3 left-0">
            <ButtonBack link={`/project/${projectId}`} />
          </div>
          <h1 className="text-2xl font-bold py-3 text-center">{label}</h1>
        </div>
      </div>
    </div>
  );
}
