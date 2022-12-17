export const Card = ({ children }) => {
    return (
      <>
        <div className=" bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">{children}</div>
        </div>
      </>
    )
}