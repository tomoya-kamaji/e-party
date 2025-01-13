/**
 * ローディング中のインジケーター
 */
export const LoadingIndicator = () => (
  <div
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    role="status"
  >
    Loading...
  </div>
);
