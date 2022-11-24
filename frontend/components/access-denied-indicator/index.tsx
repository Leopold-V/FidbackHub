import Link from "next/link";
import { signIn } from "next-auth/react";

const AccessDeniedIndicator = ({
  message = "You need to Sign In to view this content!",
}) => {
  const iconNode = () => {
    return <div>Warning icon*</div>;
  };

  const signInButtonNode = () => {
    return (
      <Link href="/api/auth/signin">
        <button
          className="font-bold"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          {message}
        </button>
      </Link>
    );
  };

  return (
    <div className="flex justify-center">
      <div className="text-center">
        <div>{iconNode()}</div>
        <div>{signInButtonNode()}</div>
      </div>
    </div>
  );
};

export default AccessDeniedIndicator;
